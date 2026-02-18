import * as ts from "typescript"
import { collectTsFilePaths } from "./collectTsFilePaths"
import { isExportedInterface, isExportedStaticTypeAlias } from "./guards"
import { createSourceFileFromPath, getNodeText } from "./utils"

export const findTypeDeclarations = (dirsToScan: string, providedTypeDeclaration: string[]): string[] => {
  const importPaths = new Set<string>()
  const allFoundTypes: { name: string; path: string }[] = []
  // Array to specifically track static type declarations like 'export type X = string'
  const staticTypeDeclarations: { name: string; path: string; value: string }[] = []

  const filePaths = collectTsFilePaths(dirsToScan)
  console.warn("Scanning files:", filePaths.length)

  for (const filePath of filePaths) {
    const { sourceFile, sourceText } = createSourceFileFromPath(filePath)
    const relativePath = filePath.replace(/\.ts$/, "")

    ts.forEachChild(sourceFile, (node) => {
      // Check for exported static type aliases

      // Count nodes for debugging
      // console.assert(
      //   node.name?.escapedText.toString() !== "BypassModes",
      //   "Processing node -----> ",
      //   // node.name?.escapedText.toString(),
      // )

      if (isExportedStaticTypeAlias(node)) {
        const currentTypeName = node.name.escapedText.toString()

        console.log("currentTypeName --->", currentTypeName, node.kind)

        // Get the type's value/right-hand side text
        const typeValue = node.type ? getNodeText(sourceText)(node.type) : ""

        // Check if it's a simple static type (string, number, boolean, etc. or literal)
        if (
          // dive here :)
          // ts.isLiteralTypeNode(node.type) ||

          node.kind === ts.SyntaxKind.TypeAliasDeclaration

          // (node.type.kind >= ts.SyntaxKind.StringKeyword && node.type.kind <= ts.SyntaxKind.UndefinedKeyword) // Covers all keyword types
          // ts.isStringLiteral(node.type) ||
          // ts.isNumericLiteral(node.type)
        ) {
          staticTypeDeclarations.push({
            name: currentTypeName,
            path: relativePath,
            value: typeValue,
          })
          console.warn(`Found static type: ${currentTypeName} = ${typeValue}`)
          allFoundTypes.push({ name: currentTypeName, path: relativePath })
          importPaths.add(`import { ${currentTypeName} } from "${relativePath}"`)
        }

        // For debugging: name node details
        console.warn("node.name  ---> ", getNodeText(sourceText)(node.name))

        allFoundTypes.push({ name: currentTypeName, path: relativePath })

        if (providedTypeDeclaration.includes(currentTypeName)) {
          importPaths.add(`import { ${currentTypeName} } from "${relativePath}"`)
        }
      }
      // Check for exported interfaces
      // TODO: DEAD CODE
      else if (isExportedInterface(node)) {
        console.log("DEAD")

        const currentTypeName = node.name.escapedText.toString()
        allFoundTypes.push({ name: currentTypeName, path: relativePath })

        if (providedTypeDeclaration.includes(currentTypeName)) {
          importPaths.add(`import { ${currentTypeName} } from "${relativePath}"`)
        }
      }
    })
  }

  console.warn("---------------------------------------------")
  console.warn("\n", "ALL FOUND TYPES", "\n")
  console.warn("Found exported static types:", allFoundTypes.length)
  allFoundTypes.forEach((type) => console.warn(`${type.name} - ${type.path}`))
  console.warn("---------------------------------------------")

  // Log the static type declarations specifically
  console.warn("\n", "STATIC TYPE DECLARATIONS", "\n")
  console.warn("Found static type declarations:", staticTypeDeclarations.length)
  staticTypeDeclarations.forEach((type) => console.warn(`${type.name} = ${type.value} - ${type.path}`))
  console.warn("---------------------------------------------")

  return [...importPaths.values()]
}

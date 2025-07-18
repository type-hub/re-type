import * as ts from "typescript"
import { collectTsFilePaths } from "./collectTsFilePaths"
import { createSourceFileFromPath, getNodeText } from "./utils"

// Helper functions to identify static types
const isTypeAlias = (node: ts.Node): node is ts.TypeAliasDeclaration => ts.isTypeAliasDeclaration(node)
const isInterface = (node: ts.Node): node is ts.InterfaceDeclaration => ts.isInterfaceDeclaration(node)
const isExported = (node: ts.Node): boolean => {
  if (ts.canHaveModifiers(node) && node.modifiers) {
    return node.modifiers.some((mod) => mod.kind === ts.SyntaxKind.ExportKeyword)
  }
  return false
}

// Check if node is an exported static type (type alias without type parameters)
const isExportedStaticTypeAlias = (node: ts.Node): node is ts.TypeAliasDeclaration => {
  if (isTypeAlias(node) && isExported(node)) {
    // Static types have no type parameters or empty type parameters
    return !node.typeParameters || node.typeParameters.length === 0
  }
  return false
}

// Check if node is an exported interface
const isExportedInterface = (node: ts.Node): node is ts.InterfaceDeclaration => isInterface(node) && isExported(node)

export const findTypeDeclarations = (dirsToScan: string, providedTypeDeclaration: string[]): string[] => {
  const importPaths: string[] = []
  const allFoundTypes: { name: string; path: string }[] = []

  const filePaths = collectTsFilePaths(dirsToScan)
  console.warn("Scanning files:", filePaths.length)

  for (const filePath of filePaths) {
    const { sourceFile, sourceText } = createSourceFileFromPath(filePath)
    const relativePath = filePath.replace(/\.ts$/, "")

    ts.forEachChild(sourceFile, (node) => {
      // Check for exported static type aliases
      if (isExportedStaticTypeAlias(node)) {
        const currentTypeName = node.name.escapedText.toString()

        // if (node.name.parent.parent) {
        //   const x = node.name.parent.parent?.text
        // }

        console.log("node.name", getNodeText(sourceText)(node.name))

        // try {
        //   console.log("node.name", getNodeBody(sourceFile as unknown as any, node))
        // } catch (error) {}

        allFoundTypes.push({ name: currentTypeName, path: relativePath })

        if (providedTypeDeclaration.includes(currentTypeName)) {
          importPaths.push(`import { ${currentTypeName} } from "${relativePath}"`)
        }
      }
      // Check for exported interfaces
      else if (isExportedInterface(node)) {
        console.log("DEAD")

        const currentTypeName = node.name.escapedText.toString()
        allFoundTypes.push({ name: currentTypeName, path: relativePath })

        if (providedTypeDeclaration.includes(currentTypeName)) {
          importPaths.push(`import { ${currentTypeName} } from "${relativePath}"`)
        }
      }
    })
  }

  console.warn("Found exported static types:", allFoundTypes.length)
  allFoundTypes.forEach((type) => console.warn(`${type.name} - ${type.path}`))

  return importPaths
}

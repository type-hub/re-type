import * as ts from "typescript"
import { collectTsFilePaths } from "./collectTsFilePaths"
import { createSourceFileFromPath } from "./utils"

export const findTypeDeclarations = (rootDir: string, dirsToScan: string, myType: string): string[] => {
  const filePaths = collectTsFilePaths(dirsToScan)

  const defPaths: string[] = []

  for (const filePath of filePaths) {
    const { sourceFile } = createSourceFileFromPath(filePath)

    ts.forEachChild(sourceFile, (node) => {
      if (ts.isTypeAliasDeclaration(node) && node.modifiers?.some((mod) => mod.kind === ts.SyntaxKind.ExportKeyword)) {
        const typeName = node.name.escapedText
        console.log(
          typeName,
          rootDir,
          node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword),
        )

        // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
        if (typeName === myType) {
          defPaths.push(filePath)
        }
      }
    })
  }

  return defPaths
}

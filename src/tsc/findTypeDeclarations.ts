import { isExportedTypeFunction } from "scripts/generateTypeMirrorClass/typeProcessing/guards"
import * as ts from "typescript"
import { collectTsFilePaths } from "./collectTsFilePaths"
import { createSourceFileFromPath } from "./utils"

export const findTypeDeclarations = (dirsToScan: string, providedTypeDeclaration: string[]): string[] => {
  const importPaths: string[] = []

  const filePaths = collectTsFilePaths(dirsToScan)

  for (const filePath of filePaths) {
    const { sourceFile } = createSourceFileFromPath(filePath)

    ts.forEachChild(sourceFile, (node) => {
      if (isExportedTypeFunction(node)) {
        const currentTypeName = node.name.escapedText.toString()

        if (providedTypeDeclaration.includes(currentTypeName)) {
          importPaths.push(`import { ${currentTypeName} } from "${filePath}"`)
        }
      }
    })
  }

  return importPaths
}

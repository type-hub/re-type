import { createSourceFileFromPath } from "tsc/utils"
import { type PARSED_TYPE_DECLARATION, parseNode } from "utils/parseTypeDeclarations"
import { isExportedTypeFunction } from "./guards"

const processSingleFile = (filePath: string): PARSED_TYPE_DECLARATION[] => {
  const { sourceText, sourceFile } = createSourceFileFromPath(filePath)

  // TODO: convert to SET
  const parsed: PARSED_TYPE_DECLARATION[] = []

  sourceFile.forEachChild((node) => {
    if (isExportedTypeFunction(node)) {
      const result = parseNode(sourceText, node)

      parsed.push(result)
    }
  })

  // TODO: check lengths
  return parsed
}

export const processAllFiles = (filePaths: string[]): PARSED_TYPE_DECLARATION[] =>
  filePaths.reduce<PARSED_TYPE_DECLARATION[]>((acc, filePath) => {
    const parsed = processSingleFile(filePath)

    return [...acc, ...parsed]
  }, [])

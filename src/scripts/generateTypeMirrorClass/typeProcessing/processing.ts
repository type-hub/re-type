import { createSourceFileFromPath, getTypeNodeName } from "tsc/utils"
import { type PARSED_TYPE_DECLARATION, parseTypeDeclaration } from "../../../utils/parseTypeDeclarations"
import { isExportedType, isTypeAlias, isTypeFunction } from "./guards"

const processSingleFile = (filePath: string): PARSED_TYPE_DECLARATION[] => {
  const { sourceText, sourceFile } = createSourceFileFromPath(filePath)

  // TODO: convert to SET
  const parsed: PARSED_TYPE_DECLARATION[] = []

  sourceFile.forEachChild((node) => {
    if (isTypeAlias(node) && isTypeFunction(node) && isExportedType(node)) {
      // TODO: convert to pipe
      const nodeText = getTypeNodeName(sourceText)(node)
      const result = parseTypeDeclaration(nodeText)

      parsed.push(result)
    }
  })

  return parsed
}

export const processAllFiles = (filePaths: string[]): PARSED_TYPE_DECLARATION[] =>
  filePaths.reduce<PARSED_TYPE_DECLARATION[]>((acc, filePath) => {
    const parsed = processSingleFile(filePath)

    return [...acc, ...parsed]
  }, [])

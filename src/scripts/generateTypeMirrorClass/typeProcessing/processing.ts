import * as fs from "fs"
import { createSourceFile, getTypeNodeName } from "tsc/utils"
import { type PARSED_TYPE_DECLARATION, parseTypeDeclaration } from "../../../utils/parseTypeDeclarations"
import { isExportedType, isTypeAlias, isTypeFunction } from "./guards"

const CHARACTER_ENCODING = "utf-8"

export function TODO_parseSth_rename_it_later(sourceText: string): PARSED_TYPE_DECLARATION[] {
  const file = createSourceFile(sourceText)

  // TODO: convert to SET
  const parsed: PARSED_TYPE_DECLARATION[] = []

  file.forEachChild((node) => {
    if (isTypeAlias(node) && isTypeFunction(node) && isExportedType(node)) {
      // TODO: convert to pipe
      const nodeText = getTypeNodeName(sourceText)(node)
      const result = parseTypeDeclaration(nodeText)

      parsed.push(result)
    }
  })

  return parsed
}

export function processAllFiles(filePaths: string[]): PARSED_TYPE_DECLARATION[] {
  return filePaths.reduce<PARSED_TYPE_DECLARATION[]>((acc, filePath) => {
    const sourceText = fs.readFileSync(filePath, CHARACTER_ENCODING)
    const parsed = TODO_parseSth_rename_it_later(sourceText)

    return [...acc, ...parsed]
  }, [])
}

import * as fs from "fs"
import { getTypeNodeName } from "tsc/utils"
import * as ts from "typescript"
import { type PARSED_TYPE_DECLARATION, parseTypeDeclaration } from "../../../utils/parseTypeDeclarations"
import { isExportedType, isTypeAlias, isTypeFunction } from "./guards"

const CHARACTER_ENCODING = "utf-8"

export function visitSourceFile(filePath: string, scriptTarget: ts.ScriptTarget): PARSED_TYPE_DECLARATION[] {
  const sourceText = fs.readFileSync(filePath, CHARACTER_ENCODING)
  const file = ts.createSourceFile(filePath, sourceText, scriptTarget, true)

  const parsed: PARSED_TYPE_DECLARATION[] = []

  file.forEachChild((node) => {
    if (isTypeAlias(node) && isTypeFunction(node) && isExportedType(node)) {
      // Get type parameter information including defaults
      // const typeParams = getTypeParameterInfo(node, sourceText)
      // console.warn(`Type ${node.name.text} has parameters:`, typeParams)
      // console.warn(`Type ${node.name.text} has body:`, typeBody)

      // const result = processExportedTypeAlias(node, sourceText, filePath)

      // TODO: convert to pipe
      const nodeText = getTypeNodeName(sourceText)(node)
      const result = parseTypeDeclaration(nodeText)

      parsed.push(result)
    }
  })

  return parsed
}

export function processAllFiles(filePaths: string[], scriptTarget: ts.ScriptTarget): PARSED_TYPE_DECLARATION[] {
  return filePaths.reduce<PARSED_TYPE_DECLARATION[]>((acc, filePath) => {
    const parsed = visitSourceFile(filePath, scriptTarget)

    return [...acc, ...parsed]
  }, [])
}

import { regexes } from "regexes"
import ts from "typescript"
import type { GENERIC } from "utils/parseTypeDeclarations"

const sanitize = (nodeText: string): string =>
  nodeText
    //
    .replace(regexes.blockComment, "")
    .replace(regexes.lineComment, "")
    .trim()

export const getTypeNodeName =
  (sourceText: string) =>
  (node: ts.Node): string =>
    sanitize(sourceText.slice(node.pos, node.end))

export const getTypeNodeBody = (node: ts.TypeAliasDeclaration, sourceText: string): string =>
  getTypeNodeName(sourceText)(node.type)

export const createSourceFile = (sourceText: string, filePath: string = "any.ts"): ts.SourceFile =>
  // TODO: do we need true below?
  ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.ESNext, true)

export const getGenericsFromNode = (
  node: ts.InterfaceDeclaration | ts.TypeAliasDeclaration,
  sourceText: string,
): GENERIC[] => {
  if (!node.typeParameters || node.typeParameters.length === 0) {
    return []
  }

  return node.typeParameters.map((tp) => {
    // TODO: fix with functional patterns
    const result: GENERIC = {
      name: tp.name.text,
    }

    const _getNodeText = getTypeNodeName(sourceText)

    if (tp.constraint) {
      // console.log("constraint----------------", _getNodeText(tp.constraint))
      result.constraint = _getNodeText(tp.constraint)
    }

    if (tp.default) {
      result.defaultValue = _getNodeText(tp.default)
    }

    return result
  })
}

import { regexes } from "regexes"
import ts from "typescript"
import { maybe } from "utils/funcProg"
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

  return node.typeParameters.map((tp): GENERIC => {
    const maybeGetNodeText = maybe(getTypeNodeName(sourceText))

    return {
      name: tp.name.text,
      constraint: maybeGetNodeText(tp.constraint),
      defaultValue: maybeGetNodeText(tp.default),
    }
  })
}

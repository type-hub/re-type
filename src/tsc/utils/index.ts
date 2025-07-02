import { regexes } from "regexes"
import type ts from "typescript"

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

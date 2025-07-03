import * as ts from "typescript"

const isTypeAlias = (node: ts.Node): node is ts.TypeAliasDeclaration => ts.isTypeAliasDeclaration(node)

export const isTypeFunction = (node: ts.Node): node is ts.TypeAliasDeclaration => {
  if (isTypeAlias(node)) {
    return !!node.typeParameters && node.typeParameters.length > 0
  }

  return false
}

export const isExportedTypeFunction = (node: ts.Node): node is ts.TypeAliasDeclaration => {
  if (isTypeAlias(node) && isTypeFunction(node)) {
    return !!node.modifiers?.some((mod) => mod.kind === ts.SyntaxKind.ExportKeyword)
  }

  return false
}

import * as ts from "typescript"

export const isTypeAlias = (node: ts.Node): node is ts.TypeAliasDeclaration => ts.isTypeAliasDeclaration(node)

export const isExported = (node: ts.TypeAliasDeclaration): boolean =>
  node.modifiers?.some((mod) => mod.kind === ts.SyntaxKind.ExportKeyword) ?? false

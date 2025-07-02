import * as ts from "typescript"

export const isTypeFunction = (node: ts.InterfaceDeclaration | ts.TypeAliasDeclaration): boolean =>
  !!node.typeParameters && node.typeParameters.length > 0

export const isTypeAlias = (node: ts.Node): node is ts.TypeAliasDeclaration => ts.isTypeAliasDeclaration(node)

export const isExportedType = (node: ts.InterfaceDeclaration | ts.TypeAliasDeclaration): boolean =>
  !!node.modifiers?.some((mod) => mod.kind === ts.SyntaxKind.ExportKeyword)

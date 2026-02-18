import ts from "typescript"

export const isTypeAlias = (node: ts.Node): node is ts.TypeAliasDeclaration => ts.isTypeAliasDeclaration(node)
const isExportedType = (node: ts.Node): boolean => {
  if (ts.canHaveModifiers(node) && node.modifiers) {
    return node.modifiers.some((mod) => mod.kind === ts.SyntaxKind.ExportKeyword)
  }
  return false
}

// Check if node is an exported static type (type alias without type parameters)
export const isExportedStaticTypeAlias = (node: ts.Node): node is ts.TypeAliasDeclaration => {
  if (isTypeAlias(node) && isExportedType(node)) {
    // Static types have no type parameters or empty type parameters
    return !node.typeParameters || node.typeParameters.length === 0
  }
  return false
}

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

// Interfaces

const isInterface = (node: ts.Node): node is ts.InterfaceDeclaration => ts.isInterfaceDeclaration(node)

export const isExportedInterface = (node: ts.Node): node is ts.InterfaceDeclaration =>
  isInterface(node) && isExportedType(node)

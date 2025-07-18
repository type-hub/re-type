import { isTypeFunction } from "scripts/generateTypeMirrorClass/typeProcessing/guards"
import { createSourceFile, getGenericsFromNode, getNodeBody, getNodeText } from "tsc/utils"
import type ts from "typescript"

export type GENERIC = {
  name: string
  constraint?: string
  defaultValue?: string
}

export type PARSED_TYPE_DECLARATION = {
  typeName: string
  generics: GENERIC[]
  body: string
}

const _parseNode = (node: ts.TypeAliasDeclaration, typeFuncDef: string): PARSED_TYPE_DECLARATION => ({
  typeName: node.name.text,
  generics: getGenericsFromNode(node, typeFuncDef),
  body: getNodeBody(node, typeFuncDef),
})

export const parseTypeDeclaration = (typeFuncDef: string): PARSED_TYPE_DECLARATION => {
  // TODO: use SET instead of array
  const _parsed: PARSED_TYPE_DECLARATION[] = []

  createSourceFile(typeFuncDef)
    //
    .forEachChild((node) => {
      // TODO: isExportedTypeFunction instead?
      if (isTypeFunction(node)) {
        _parsed.push(_parseNode(node, typeFuncDef))
      }
    })

  const parsed = _parsed[0]

  if (!parsed) {
    throw new Error(`parseTypeDeclarations: Type function not found in type definition: ${typeFuncDef}`)
  }

  if (!parsed.typeName) {
    throw new Error(`parseTypeDeclarations: Type function NAME not found in type definition: ${typeFuncDef}`)
  }
  if (!parsed.generics) {
    throw new Error(`parseTypeDeclarations: Type function ARGS not found in type definition: ${typeFuncDef}`)
  }
  if (!parsed.body) {
    throw new Error(`parseTypeDeclarations: Type function BODY not found in type definition: ${typeFuncDef}`)
  }

  return parsed
}

// TODO: cumbersome logic: node -> text -> node -> _parseNode
export const parseNode = (sourceText: string, node: ts.Node): PARSED_TYPE_DECLARATION => {
  const typeFuncDef = getNodeText(sourceText)(node)

  return parseTypeDeclaration(typeFuncDef)
}

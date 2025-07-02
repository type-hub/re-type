import { isTypeAlias, isTypeFunction } from "scripts/generateTypeMirrorClass/typeProcessing/guards"
import { createSourceFile, getGenericsFromNode, getTypeNodeBody } from "tsc/utils"

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

export const parseTypeDeclaration = (typeFunc: string): PARSED_TYPE_DECLARATION => {
  // TODO: use SET instead of array
  const _parsed: PARSED_TYPE_DECLARATION[] = []

  createSourceFile(typeFunc)
    //
    .forEachChild((node) => {
      // console.log("typeParameters", node.kind) // , "typeParameters" in node && node.typeParameters?.length)

      if (isTypeAlias(node) && isTypeFunction(node)) {
        _parsed.push({
          // TODO: convert to parseNodeType()
          typeName: node.name.text,
          generics: getGenericsFromNode(node, typeFunc),
          body: getTypeNodeBody(node, typeFunc),
        })

        // console.warn(`Type ${node.name.text} has body:`, typeBody)
      }
    })

  const parsed = _parsed[0]

  if (!parsed) {
    throw new Error(`parseTypeDeclarations: Type function not found in type definition: ${typeFunc}`)
  }

  if (!parsed.typeName) {
    throw new Error(`parseTypeDeclarations: Type function NAME not found in type definition: ${typeFunc}`)
  }
  if (!parsed.generics) {
    throw new Error(`parseTypeDeclarations: Type function ARGS not found in type definition: ${typeFunc}`)
  }
  if (!parsed.body) {
    throw new Error(`parseTypeDeclarations: Type function BODY not found in type definition: ${typeFunc}`)
  }

  return parsed
}

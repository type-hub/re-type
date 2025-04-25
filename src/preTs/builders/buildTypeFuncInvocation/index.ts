import { parseTypeFunction } from "../../parsers"

// TODO: core
export const buildTypeFuncInvocation = (typeDef: string) => {
  const { typeFuncName, typeArgs } = parseTypeFunction(typeDef)

  return `${typeFuncName}<${typeArgs.join(", ")}>`
}

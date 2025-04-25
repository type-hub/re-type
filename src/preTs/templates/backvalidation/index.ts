import {
  buildConditionalTypeBody,
  buildTypeFuncInvocation,
} from "../../builders"
import { CONTEXT } from "../../consts"
import { parseTypeFunction } from "../../parsers"
import { createBackTypeFuncName } from "./utils"

export function backValidation(typeDef: string) {
  const { validations, typeArgs, typeFuncName } = parseTypeFunction(typeDef)

  const conditional = buildConditionalTypeBody(
    typeFuncName,
    validations,
    buildTypeFuncInvocation(typeDef)
  )

  // TODO: context is missing inside
  return `type ${createBackTypeFuncName(
    typeFuncName
  )}<${CONTEXT} extends string, ${typeArgs.toString()}> = ${conditional}`
}

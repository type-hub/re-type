import { ERROR } from "utils/consts"
import type { Brand } from "utilTypes"
import type { TYPE_INVOCATION } from "./typeDefinitions"

export type EITHER_BODY = Brand<string, "EITHER_BODY">

export const eitherBody = (typeInvocation: TYPE_INVOCATION): EITHER_BODY =>
  `[${ERROR}] extends [never]
? ${typeInvocation}
: ${ERROR}` as EITHER_BODY

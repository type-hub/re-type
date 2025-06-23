import { GENERIC } from "../parseTypeDeclarations"

// TODO: possibly ./class/consts
export const CONTEXT = "_Context" as const
export const CONTEXT_DECLARATION = `${CONTEXT} extends string` as const
export const CONTEXT_GENERIC = {
  name: CONTEXT,
  constraint: "string",
} as const satisfies GENERIC

const ERROR = "_Error" as const
// const ERROR_DECLARATION = `${ERROR} extends GENERIC_ERROR` as const
export const ERROR_GENERIC = {
  name: ERROR,
  constraint: "GENERIC_ERROR", // TODO: no connection to org type
  // defaultValue: "unknown",
} as const satisfies GENERIC

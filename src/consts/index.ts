import { Generic } from "../classses/types"

export const CONTEXT = "Context" as const
export const CONTEXT_DECLARATION = `${CONTEXT} extends string` as const
export const CONTEXT_GENERIC = {
  name: CONTEXT,
  constraint: "string",
} as const satisfies Generic

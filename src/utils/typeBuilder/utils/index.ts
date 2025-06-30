import { CONTEXT } from "utils/consts"
import type { GENERIC } from "utils/parseTypeDeclarations"
import type { CurrentTypeName } from "utils/reTypeError/trace"
import { trace } from "utils/reTypeError/trace"

export const supportContextTracing = (currentTypeName?: CurrentTypeName) => (generic: GENERIC) =>
  generic.name === CONTEXT && currentTypeName
    ? //
      trace(currentTypeName)
    : generic.name

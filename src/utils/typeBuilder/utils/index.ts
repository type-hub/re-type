import { CONTEXT } from "utils/consts"
import type { GENERIC } from "utils/parseTypeDeclarations"
import type { ParentName } from "utils/reTypeError/trace"
import { trace } from "utils/reTypeError/trace"

export const supportContextTracing = (parentName?: ParentName["parentName"]) => (generic: GENERIC) =>
  generic.name === CONTEXT && parentName
    ? //
      trace({ parentName })
    : generic.name

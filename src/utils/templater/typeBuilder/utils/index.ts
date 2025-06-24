import { CONTEXT } from "utils/consts"
import { GENERIC } from "utils/parseTypeDeclarations"
import { ParentName, trace } from "utils/reTypeError/trace"

export const supportContextTracing = (parentName?: ParentName["parentName"]) => (generic: GENERIC) =>
  generic.name === CONTEXT && parentName
    ? //
      trace({ parentName })
    : generic.name

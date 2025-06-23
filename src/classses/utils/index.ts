import { resolveLaxName } from "classses/Lax/utils"
import { resolveStrictName } from "classses/Strict/utils"
import { pipe } from "ramda"

export const resolveStrictLaxName = pipe(resolveStrictName, resolveLaxName)

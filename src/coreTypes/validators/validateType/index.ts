// DEAD CODE

import type { BYPASS_MODES } from ".."
import type { If$ } from "../../conditionals"
import type { ReTypeError } from "../../errors"
import { FilterError_DIST_US } from "../../errors/utils"
import { Trace } from "../../trace"

type _ValidateType<
  CX extends string,
  Mode extends BYPASS_MODES,
  T,
  Match
> = [T] extends [Match]
  ? If$<Mode, "either", T>
  : ReTypeError<
      "MismatchError",
      Trace<CX, "_ValidateType">,
      T
    >

type SafeChain<
  CX extends string,
  Mode extends BYPASS_MODES,
  E,
  T,
  Match
> = [E] extends [never]
  ? _ValidateType<CX, Mode, T, Match>
  : E

/**
 * @returns Error | never
 */
export type ValidateType$<
  CX extends string,
  T$,
  Match
> = SafeChain<
  CX,
  "bypass-off",
  FilterError_DIST_US<T$>,
  T$,
  Match
>

/**
 * @returns Error | T
 */
export type EitherValidate_Type$<T$, Match> =
  SafeChain<
    "CX",
    "bypass-on",
    FilterError_DIST_US<T$>,
    T$,
    Match
  >

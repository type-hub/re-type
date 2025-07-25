// DEAD CODE

import type {
  BYPASS_MODES,
  BypassModes,
} from ".."
import type { ReTypeError } from "../../errors"
import type { FilterError$ } from "../../errors/utils"
import type { Trace } from "../../trace"

type _ValidateType<
  CX extends string,
  Mode extends BYPASS_MODES,
  T,
  Match
> = [T] extends [Match]
  ? Mode extends BypassModes["on"]
    ? T
    : never
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
  BypassModes["off"],
  FilterError$<T$>,
  T$,
  Match
>

/**
 * @returns Error | T
 */
export type EitherValidate_Type$<T$, Match> =
  SafeChain<
    "CX",
    BypassModes["on"],
    FilterError$<T$>,
    T$,
    Match
  >

import type { BYPASS_MODES } from ".."
import type { If$ } from "../../conditionals"
import type { EmptyStringError } from "../../errors"
import { FilterError$ } from "../../errors/utils"

type _ValidateEmptyString<
  Mode extends BYPASS_MODES,
  T,
  CX extends string = "_ValidateEmptyString"
> = T extends ""
  ? EmptyStringError<CX, T> // TODO: TX
  : If$<Mode, "either", T>

type SafeChain<
  Mode extends BYPASS_MODES,
  E,
  Str
> = [E] extends [never]
  ? _ValidateEmptyString<Mode, Str>
  : E

/**
 * @returns Error | never
 */
export type ValidateEmptyString$<T> = SafeChain<
  "bypass-off",
  FilterError$<T>,
  T
>

/**
 * @returns Error | T
 */
export type EitherValidate_EmptyString$<T> =
  SafeChain<
    //
    "bypass-on",
    FilterError$<T>,
    T
  >

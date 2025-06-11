import type { VALIDATOR_MODES } from ".."
import type { If$ } from "../../conditionals"
import type { EmptyStringError } from "../../errors"
import { FilterError_DIST_US } from "../../errors/utils"

type _ValidateEmptyString<
  Mode extends VALIDATOR_MODES,
  T,
  CX extends string = "_ValidateEmptyString"
> = T extends ""
  ? EmptyStringError<CX, T> // TODO: TX
  : If$<Mode, "either", T>

type SafeChain<
  Mode extends VALIDATOR_MODES,
  E,
  Str
> = [E] extends [never]
  ? _ValidateEmptyString<Mode, Str>
  : E

/**
 * @returns Error | never
 */
export type ValidateEmptyString$<T> = SafeChain<
  "never",
  FilterError_DIST_US<T>,
  T
>

/**
 * @returns Error | T
 */
export type EitherValidate_EmptyString$<T> =
  SafeChain<
    //
    "either",
    FilterError_DIST_US<T>,
    T
  >

import type {
  BYPASS_MODES,
  BypassModes,
} from ".."
import type { EmptyStringError } from "../../errors"
import type { FilterError$ } from "../../errors/utils"

type _ValidateEmptyString<
  Bypass extends BYPASS_MODES,
  T,
  CX extends string = "_ValidateEmptyString"
> = T extends ""
  ? EmptyStringError<CX, T> // TODO: TX
  : Bypass extends BypassModes["on"]
  ? T
  : never

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
  BypassModes["off"],
  FilterError$<T>,
  T
>

/**
 * @returns Error | T
 */
export type EitherValidate_EmptyString$<T> =
  SafeChain<
    //
    BypassModes["on"],
    FilterError$<T>,
    T
  >

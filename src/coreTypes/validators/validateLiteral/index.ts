import type {
  BYPASS_MODES,
  BypassModes,
} from ".."
import type {
  MismatchError,
  NonLiteralError,
} from "../../errors"
import type { FilterError$ } from "../../errors/utils"

export type ValidateLiteral$<
  Mode extends BYPASS_MODES,
  T,
  Match
> = [T] extends [Match]
  ? [Match] extends [T]
    ? NonLiteralError<"ValidateLiteral$", T>
    : Mode extends BypassModes["on"]
    ? T
    : never
  : MismatchError<"_ValidateLiteral", T>

type SafeChain<
  Mode extends BYPASS_MODES,
  E,
  T,
  Match
> = [E] extends [never]
  ? ValidateLiteral$<Mode, T, Match>
  : E

type Configure<
  Mode extends BYPASS_MODES,
  T$,
  Match
> = SafeChain<
  //
  Mode,
  FilterError$<T$>,
  T$,
  Match
>

// -----------------------------------------------------

/**
 * @returns Error | never
 */
export type Validate_StringLiteral<T> = Configure<
  BypassModes["off"],
  T,
  string
>

/**
 * @returns Error | never
 */
export type Validate_NumberLiteral<T> = Configure<
  BypassModes["off"],
  T,
  number
>

/**
 * @returns Error | never
 */
export type Validate_BooleanLiteral<T> =
  Configure<BypassModes["off"], T, boolean>

/**
 * @returns Error | T
 */
export type EitherValidate_StringLiteral<T> =
  Configure<BypassModes["on"], T, string>

/**
 * @returns Error | T
 */
export type EitherValidate_NumberLiteral<T> =
  Configure<BypassModes["on"], T, number>

/**
 * @returns Error | T
 */
export type EitherValidate_BooleanLiteral<T> =
  Configure<BypassModes["on"], T, boolean>

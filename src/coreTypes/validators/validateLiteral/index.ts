import type { BYPASS_MODES } from ".."
import type { If$ } from "../../conditionals"
import type {
  MismatchError,
  NonLiteralError,
} from "../../errors"
import { FilterError$ } from "../../errors/utils"

export type ValidateLiteral$<
  Mode extends BYPASS_MODES,
  T,
  Match
> = [T] extends [Match]
  ? [Match] extends [T]
    ? NonLiteralError<"ValidateLiteral$", T>
    : If$<Mode, "either", T>
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
  "bypass-off",
  T,
  string
>

/**
 * @returns Error | never
 */
export type Validate_NumberLiteral<T> = Configure<
  "bypass-off",
  T,
  number
>

/**
 * @returns Error | never
 */
export type Validate_BooleanLiteral<T> =
  Configure<"bypass-off", T, boolean>

/**
 * @returns Error | T
 */
export type EitherValidate_StringLiteral<T> =
  Configure<"bypass-on", T, string>

/**
 * @returns Error | T
 */
export type EitherValidate_NumberLiteral<T> =
  Configure<"bypass-on", T, number>

/**
 * @returns Error | T
 */
export type EitherValidate_BooleanLiteral<T> =
  Configure<"bypass-on", T, boolean>

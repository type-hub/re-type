/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  AnyError,
  NeverError,
  UnknownError,
} from "../../errors"
import { AnyMatchError_DIST_US } from "../../errors/utils"
import { Trace } from "../../trace"
import { VALIDATOR_MODES } from "../consts"

type ValidateArr<
  Data extends unknown[],
  Acc,
  CX extends string,
  Index extends any[] = []
> = [Data] extends [[infer First, ...infer Rest]]
  ? ValidateArr<
      Rest,
      | Acc
      | CoreValidate$<
          First,
          "never",
          Trace<CX, `[${Index["length"]}]`>
        >,
      CX,
      [...Index, any]
    >
  : Acc

type Test = Validate$<
  [1, "a", any, true, never, false],
  "Test"
>

type Name = "CoreValidate$"

type CoreValidate$<
  T,
  EitherMode extends VALIDATOR_MODES,
  CX extends string
> =
  // never
  [T] extends [never]
    ? NeverError<Trace<CX, Name>, T>
    : // any
    0 extends 1 & T
    ? AnyError<Trace<CX, Name>, T>
    : // unknown
    [unknown] extends [T]
    ? //prettier-ignore
      UnknownError<Trace<CX, Name>, T>
    : // array mode
    [T] extends [any[]]
    ? ValidateArr<
        T,
        never,
        Trace<CX, Name, "ValidateArr">
      >
    : AnyMatchError_DIST_US<T> extends true
    ? T // error bypass
    : EitherMode extends "either"
    ? T
    : never

// -----------------------------------------------------

/**
 * @returns Error | never
 */
export type Validate$<
  T,
  CX extends string = ""
> = CoreValidate$<
  //
  T,
  "never",
  Trace<CX, "Validate$">
>

/**
 * @returns Error | T
 */
export type EitherValidate<
  T,
  CX extends string = ""
> = CoreValidate$<
  T,
  "either",
  Trace<CX, "EitherValidate">
>
// TODO: fix context for validation (func index, just - to curry context)

// -----------------------------------------------------

type A = ValidateArr<[1, never], never, "Test">
//   ^?

type B = ValidateArr<[1, any], never, "Test">
//   ^?

type C = ValidateArr<[1, unknown], never, "Test">
//   ^?

type E = ValidateArr<[1, never], never, "Test">
//   ^?

// -----------------------------------------------------

// type FF = ValidateAll$<[any]>
//   ^?

// type Z = IsError_<F>
//   ^?

// TODO: add branding
// declare const __brand: unique symbol

import type { ValueOf } from "../../utilTypes"
import type { Trace } from "../trace"

export const ERROR_TYPE = {
  // input --------------------------------
  OpenTypeError: "OpenTypeError",
  NeverError: "NeverError",
  AnyError: "AnyError",
  UnknownError: "UnknownError",
  MismatchError: "MismatchError",
  NonLiteralError: "NonLiteralError",
  EmptyStringError: "EmptyStringError",
  // output --------------------------------
  OutputError: "OutputError",
} as const

export type ErrorType = ValueOf<typeof ERROR_TYPE>

// TODO: do we need js here?
export const ERRORS_LOOKUP = {
  // input --------------------------------
  OpenTypeError: {
    msg: "input: is open types (any, unknown, never)",
    url: "www.wp.pl/a",
  },
  NeverError: {
    msg: "input: is open type (any, unknown, never)",
    url: "www.wp.pl/b",
  },
  AnyError: {
    msg: "input: do not pass any as input",
    url: "www.wp.pl/c",
  },
  UnknownError: {
    msg: "input: do not pass unknown as input",
    url: "www.wp.pl/d",
  },
  MismatchError: {
    msg: "input: type mismatch",
    url: "www.wp.pl/e",
  },
  NonLiteralError: {
    msg: "input: provided type is not literal",
    url: "www.wp.pl/f",
  },
  EmptyStringError: {
    msg: "input: empty string",
    url: "www.wp.pl/g",
  },
  // output --------------------------------
  OutputError: {
    msg: "output: open type",
    url: "www.wp.pl/h",
  },
} as const satisfies Record<
  ErrorType,
  { msg: string; url: string }
>

export type ErrorsLookup = typeof ERRORS_LOOKUP

// TODO: js docs
export type ReTypeError<
  _ErrorType extends keyof ErrorsLookup,
  Context extends string,
  Value,
  _Constraint = unknown
> = {
  __type: _ErrorType
  __message: ErrorsLookup[_ErrorType]["msg"]
  __context: Context
  __value: Value & {} // TODO: pretty
  __constraint?: _Constraint & {} // TODO: pretty
  __url: ErrorsLookup[_ErrorType]["url"]
}

// -----------------------

// prettier-ignore
export type NeverError      <CX extends string, T, _Constraint = unknown> = ReTypeError<"NeverError",       Trace<CX, "NeverError">, T, _Constraint>
// prettier-ignore
export type AnyError        <CX extends string, T, _Constraint = unknown> = ReTypeError<"AnyError",         Trace<CX, "AnyError">, T, _Constraint>
// prettier-ignore
export type UnknownError    <CX extends string, T, _Constraint = unknown> = ReTypeError<"UnknownError",     Trace<CX, "UnknownError">, T, _Constraint>
// prettier-ignore
export type MismatchError   <CX extends string, T, _Constraint = unknown> = ReTypeError<"MismatchError",    Trace<CX, "MismatchError">, T, _Constraint>
// prettier-ignore
export type NonLiteralError <CX extends string, T, _Constraint = unknown> = ReTypeError<"NonLiteralError",  Trace<CX, "NonLiteralError">, T, _Constraint>
// prettier-ignore
export type EmptyStringError<CX extends string, T, _Constraint = unknown> = ReTypeError<"EmptyStringError", Trace<CX, "EmptyStringError">, T, _Constraint>
// prettier-ignore
export type OpenTypeError   <CX extends string, T, _Constraint = unknown> = ReTypeError<"OpenTypeError",    Trace<CX, "OpenTypeError">, T, _Constraint>

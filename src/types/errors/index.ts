import { Trace } from "../trace"

// TODO: add branding
// declare const __brand: unique symbol

const ERRORS_LOOKUP = {
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
} as const

type ErrorsLookup = typeof ERRORS_LOOKUP
export type ErrorType = keyof ErrorsLookup

// TODO: js docs
export type TypeError<
  _ErrorType extends keyof ErrorsLookup,
  Context extends string,
  Value
> = {
  __type: _ErrorType
  __message: ErrorsLookup[_ErrorType]["msg"]
  __context: Context
  __value: Value & {} // TODO: pretty
  __url: ErrorsLookup[_ErrorType]["url"]
}

export type GENERIC_ERROR = {
  __type: keyof ErrorsLookup
  __message?: ErrorsLookup[keyof ErrorsLookup]["msg"]
  __url?: string
  __context?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  __value?: any
}
export type NonErrorObj = object & {
  __message: never
  __url: never
} // type: GenericError

// -----------------------

// prettier-ignore
export type NeverError      <CX extends string, T> = TypeError<"NeverError",       Trace<CX, "NeverError">, T>
// prettier-ignore
export type AnyError        <CX extends string, T> = TypeError<"AnyError",         Trace<CX, "AnyError">, T>
// prettier-ignore
export type UnknownError    <CX extends string, T> = TypeError<"UnknownError",     Trace<CX, "UnknownError">, T>
// prettier-ignore
export type MismatchError   <CX extends string, T> = TypeError<"MismatchError",    Trace<CX, "MismatchError">, T>
// prettier-ignore
export type NonLiteralError <CX extends string, T> = TypeError<"NonLiteralError",  Trace<CX, "NonLiteralError">, T>
// prettier-ignore
export type EmptyStringError<CX extends string, T> = TypeError<"EmptyStringError", Trace<CX, "EmptyStringError">, T>
// prettier-ignore
export type OpenTypeError   <CX extends string, T> = TypeError<"OpenTypeError",    Trace<CX, "OpenTypeError">, T>

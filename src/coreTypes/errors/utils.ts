import type {
  ERRORS_LOOKUP,
  NeverError,
} from "./errors"

export type GENERIC_ERROR = {
  readonly __type: keyof ERRORS_LOOKUP
  readonly __message: ERRORS_LOOKUP[keyof ERRORS_LOOKUP]["msg"]
  readonly __url: ERRORS_LOOKUP[keyof ERRORS_LOOKUP]["url"]
  readonly __context: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly __value: any
}

// -----------------------------------------------------------------

/*
do we need it in isError?
T extends {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
*/
export type AnyMatchError$<T> =
  T extends GENERIC_ERROR ? true : never

export type FilterError$<T> =
  T extends GENERIC_ERROR ? T : never

// TESTS -----------------------------------------------------------------

type TestError = NeverError<
  "context->context",
  "some value"
>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type A = AnyMatchError$<TestError | "">
//   ^?

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type X = FilterError$<TestError | "">
//   ^?

// type Z = ValidateAny$<TestError | "">
//   ^?

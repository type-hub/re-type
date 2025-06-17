/* eslint-disable @typescript-eslint/no-explicit-any */

import { Trace } from "../../trace"
import { _FlatValidate$ } from "../flatValidate"

// prettier-ignore
type _EitherValidate$<
  _Error,
  Args extends unknown[],
  Context extends string,
  Index extends any[] = []
> = [_Error] extends [never]
  ? ValidateArr$<
      Args,
      Context,
      [...Index, any]
    >
  : _Error

//  -p-rettier-ignore
/**
 * ## INFO: function will stop on first error
 * @returns Error | never
 */
// export type ValidateArr$<
//   Args extends unknown[],
//   Context extends string,
//   Index extends any[] = []
// > = [Args] extends [[infer FirstArg, ...infer RestArgs]]
//   // upstream computation
//   ? _EitherValidate$<
//       _FlatValidate$<
//         FirstArg,
//         Trace<Context, `[${Index["length"]}]`>
//       >,
//       RestArgs,
//       Context,
//       [...Index, any]
//     >
//   // no errors
//   : never

// prettier-ignore
export type ValidateArr$<
  Args extends unknown[],
  Context extends string,
  Index extends any[] = []
> = [Args] extends [
  [infer FirstArg, ...infer RestArgs] // TODO: add rest check for empty arr
]
  ? [FirstArg] extends [[infer U]]
  // ? [FirstArg] extends [any[]]
    // upstream computation
    ? ValidateArr$<[U], Trace<Context, 'loopback'>, Index>
    // upstream computation
    : _EitherValidate$<
        _FlatValidate$<
          FirstArg,
          Trace<Context, `[${Index["length"]}]`>
        >,
        RestArgs,
        Context,
        [...Index, any]
      >
   // no errors
   : 'never' // to fix

// TESTS -----------------------------------------------

// prettier-ignore
type A = ValidateArr$<[],"Test">
//   ^?

type B = ValidateArr$<[1], "Test">
//   ^?

// prettier-ignore
type C = ValidateArr$<[1, any, unknown, never], "Test">
//   ^?

type D = ValidateArr$<[C], "Test">
//   ^?

// prettier-ignore
type E = ValidateArr$<[[any]],"Test">
//   ^?

// prettier-ignore
type F = ValidateArr$<[1, [any]], "Test">
//   ^?

/* eslint-disable @typescript-eslint/no-explicit-any */

import { DEAD_BRANCH } from "utilTypes"
import { Trace } from "../../trace"
import { _FlatValidate$ } from "../flatValidate"

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
type _EitherValidate$<
  _Error,
  Args extends unknown[],
  Context extends string,
  Index extends any[] = []
> = [_Error] extends [never]
  ? ValidateFlatTuple$<
      Args,
      Context,
      [...Index, any]
    >
  : _Error

// prettier-ignore
export type ValidateFlatTuple$<
  Args extends unknown[],
  Context extends string,
  Index extends any[] = []
> = [Args] extends [
  [infer FirstArg, ...infer RestArgs] // TODO: add rest check for empty arr
]
  // ? FirstArg extends any[]
    // upstream computation
    // ? ValidateArr$<FirstArg, Context, Index>
    // upstream computation
  ? _EitherValidate$<
        _FlatValidate$<
          FirstArg,
          Trace<Context, `[${Index["length"]}]`>
        >,
        RestArgs,
        Context,
        [...Index, any]
      >
   : DEAD_BRANCH

// TESTS -----------------------------------------------

// prettier-ignore
type A = ValidateFlatTuple$<[],"Test">
//   ^?

type B = ValidateFlatTuple$<[1], "Test">
//   ^?

// prettier-ignore
type C = ValidateFlatTuple$<[1, any, unknown, never],"Test">
//   ^?

// prettier-ignore
type C1 = ValidateFlatTuple$<[any],"Test">
//   ^?

// prettier-ignore
type D = ValidateFlatTuple$<[[any]],"Test">
//   ^?

// prettier-ignore
type E = ValidateFlatTuple$<[1, [any]],"Test">
//   ^?

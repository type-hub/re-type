/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AnyError,
  AnyMatchError$,
  FilterError$,
  NeverError,
  UnknownError,
} from "../../errors"
import { Trace } from "../../trace"
import {
  BYPASS_MODES,
  BypassModes,
} from "../consts"

type Name = "FlatValidate$"

// prettier-ignore
export type _FlatValidate$<
  T,
  CX extends string,
  BypassMode extends BYPASS_MODES = BypassModes["off"]
  // TODO: fix union issue
  // BypassMode extends 'bypass-on' = never
> =
  // never
  [T] extends [never]
    ? NeverError<Trace<CX, Name>, T>
    : // any
    0 extends 1 & T
    ? AnyError<Trace<CX, Name>, T>
    : // unknown
    [unknown] extends [T]
    ? UnknownError<Trace<CX, Name>, T>
    : // errors, why brackets?
    [AnyMatchError$<T>] extends [never]
    ? BypassMode extends BypassModes["off"]
      ? never // good
        // possible arr, obj check for errors required
        // ? T extends any[]
        //   ? SingleMemberValidate$<T,CX,BypassMode>
        //   : T // return value in bypass mode
      : T // return value in bypass mode
    : FilterError$<T> // error bypass

// TESTS -----------------------------------------
// add: [], {},

// prettier-ignore
type A = _FlatValidate$<never, "Test">
//   ^?

// prettier-ignore
type B = _FlatValidate$<any, "Test">
//   ^?

// prettier-ignore
type C = _FlatValidate$<unknown, "Test">
//   ^?

// prettier-ignore
type D = _FlatValidate$<C, "Test">
//   ^?

// prettier-ignore
type E = _FlatValidate$<[], "Test">
//   ^?

// prettier-ignore
type Z = _FlatValidate$<string | number | boolean, "Test">
//   ^?

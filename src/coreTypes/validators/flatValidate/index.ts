/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  AnyError,
  AnyMatchError$,
  FilterError$,
  NeverError,
  UnknownError,
} from "../../errors"
import type { Trace } from "../../trace"
import type {
  BYPASS_MODES,
  BypassModes,
} from "../consts"

type CurrentTypeName = "FlatValidate$"

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
    ? NeverError<Trace<CX, CurrentTypeName>, T>
    : // any
    0 extends T & 1
    ? AnyError<Trace<CX, CurrentTypeName>, T>
    : // unknown
    [unknown] extends [T]
    ? UnknownError<Trace<CX, CurrentTypeName>, T>
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
type Z = _FlatValidate$<boolean | number | string, "Test">
//   ^?

import {
  AnyError,
  AnyMatchError_DIST_US,
  FilterError_DIST_US,
  NeverError,
  UnknownError,
} from "../../errors"
import { Trace } from "../../trace"
import { BYPASS_MODES } from "../consts"

type Name = "SingleMemberValidate$"

// TODO: rethink, is it really single?
export type SingleMemberValidate$<
  T,
  CX extends string,
  BypassMode extends BYPASS_MODES = "bypass-off"
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
    : // errors
    AnyMatchError_DIST_US<T> extends never
    ? BypassMode extends "bypass-off"
      ? never
      : T // return value in bypass mode
    : FilterError_DIST_US<T> // error bypass

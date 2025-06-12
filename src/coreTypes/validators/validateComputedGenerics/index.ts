/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  DEAD_BRANCH,
  UnionToArray,
} from "../../../typeUtils"
import { Trace } from "../../trace"
import { SingleMemberValidate$ } from "../singleMemberValidate"

type Either_ValidateObjWithStop<
  _Error,
  Context extends string,
  ArgsLookup extends Record<string, any>,
  Keys extends any[]
> = [_Error] extends [never]
  ? ValidateObjWithStop<Context, ArgsLookup, Keys>
  : _Error

// prettier-ignore
type ValidateObjWithStop<
Context extends string,
  ArgsLookup extends Record<string, any>,
  Keys extends any[],
> = [Keys] extends [[infer FirstKey, ...infer RestKeys]]
  ? FirstKey extends keyof ArgsLookup & string
  // upstream computation
  ? Either_ValidateObjWithStop<
    SingleMemberValidate$<
          ArgsLookup[FirstKey],
          Trace<Context, FirstKey>
        >,
      Context,
      ArgsLookup,
      RestKeys
    >
  : never // no errors
  : DEAD_BRANCH

export type ValidateComputedGenerics<
  Context extends string,
  ComputedArgsObj extends Record<string, any>
> = ValidateObjWithStop<
  Context,
  ComputedArgsObj,
  UnionToArray<keyof ComputedArgsObj>
>

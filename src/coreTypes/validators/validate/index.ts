/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Trace } from "../../trace"
import { _FlatValidate$ } from "../flatValidate"
import { ValidateComputedGenerics } from "../validateComputedGenerics"

type ValidateArr_ORG<
  Data extends unknown[],
  Acc,
  CX extends string,
  Index extends any[] = []
> = [Data] extends [[infer First, ...infer Rest]]
  ? ValidateArr<
      Rest,
      | Acc
      | _FlatValidate$<
          First,
          Trace<CX, `[${Index["length"]}]`>
        >,
      CX,
      [...Index, any]
    >
  : Acc

type Test_ValidateArr_ORG = ValidateArr_ORG<
  [1, "a", any, true, never, false],
  never,
  "Test"
>

// -----------------------------------------------------

type TestForErrorsObj<
  Context extends string,
  A,
  B,
  C,
  D
> = ValidateComputedGenerics<
  Context,
  // TODO: should be generated
  { A: A; B: B; C: C; D: D }
>

// TESTS --------------------------------------------------

// TODO: shouldn't context be last (placeholder value support?
type SwapObj = TestForErrorsObj<
  "Test",
  1,
  any,
  unknown,
  never
>

type SwapObjFinal = SwapObj
//   ^?

// -----------------------------------------------------

type ValidateArr<
  Data extends unknown[],
  Acc,
  Context extends string,
  Index extends any[] = []
> = [Data] extends [[infer First, ...infer Rest]]
  ? ValidateArr<
      Rest,
      | Acc
      | _FlatValidate$<
          First,
          Trace<Context, `[${Index["length"]}]`>
        >,
      Context,
      [...Index, any]
    >
  : Acc

// -----------------------------------------------------

/**
 * @returns Error | never
 */
export type Validate$<
  T,
  CX extends string = ""
> = _FlatValidate$<T, Trace<CX, "Validate$">>

type Test = Validate$<
  [1, "a", any, true, never, false],
  "Test"
>

// -----------------------------------------------------

/**
 * @returns Error | T
 */
export type EitherValidate<
  T,
  CX extends string = ""
> = _FlatValidate$<
  T,
  Trace<CX, "EitherValidate">,
  "bypass-on"
>

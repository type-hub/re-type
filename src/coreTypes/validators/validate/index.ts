/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Trace } from "../../trace"
import { SingleMemberValidate$ } from "../singleMemberValidate"
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
      | SingleMemberValidate$<
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

// -------------------------
// Working
// - single error return
// -------------------------

type EitherContinueValidation<
  _Error,
  Args extends unknown[],
  Context extends string,
  Index extends any[] = []
> = [_Error] extends [never]
  ? ValidateArrWthStop_Index<
      Args,
      Context,
      [...Index, any]
    >
  : _Error

// prettier-ignore
type ValidateArrWthStop_Index<
  Args extends unknown[],
  Context extends string,
  Index extends any[] = []
> = [Args] extends [[infer FirstArg, ...infer RestArgs]]
  // upstream computation
  ? EitherContinueValidation<
      SingleMemberValidate$<
        FirstArg,
        Trace<Context, `[${Index["length"]}]`>
      >,
      RestArgs,
      Context,
      [...Index, any]
    >
  // no errors
  : never

type TestForErrors = ValidateArrWthStop_Index<
  [1, any, unknown, never],
  "Test"
>
type Swap = TestForErrors
//   ^?

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
      | SingleMemberValidate$<
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
> = SingleMemberValidate$<
  T,
  Trace<CX, "Validate$">
>

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
> = SingleMemberValidate$<
  T,
  Trace<CX, "EitherValidate">,
  "bypass-on"
>

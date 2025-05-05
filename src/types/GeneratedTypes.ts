export class TypeUtils {
  SafeValue() {
    // type SafeValue<E, T> = [E] extends [never]
    //   ? T
    //   : E
  }

  IfElse$() {
    // type IfElse$<A, B, C, D> = A extends B
    //   ? C
    //   : D
  }

  If$() {
    // type If$<A, B, C> = IfElse$<A, B, C, never>
  }

  FilterType$() {
    // type FilterType$<
    //   All,
    //   Sub extends All,
    // > = All extends Sub ? All : never
  }

  RejectType$() {
    // type RejectType$<
    //   All,
    //   Sub extends All,
    // > = All extends Sub ? never : All
  }

  NewError() {
    // type NewError<
    //   ErrorType extends keyof ErrorsLookup,
    //   Context extends string,
    //   Value
    // > = {
    //   __type: ErrorType
    //   __message: ErrorsLookup[ErrorType]["msg"]
    //   __url: ErrorsLookup[ErrorType]["url"]
    //   __context: Context
    //   __value: Value & {}
    // }
  }

  GENERIC_ERROR() {
    // type GENERIC_ERROR = {
    //   __type: keyof ErrorsLookup
    //   __message?: ErrorsLookup[keyof ErrorsLookup]["msg"]
    //   __url?: string
    //   __context?: string
    //
    //   __value?: any
    // }
  }

  NonErrorObj() {
    // type NonErrorObj = object & {
    //   __message: never
    //   __url: never
    // }
  }

  NeverError() {
    // type NeverError      <CX extends string, T> = NewError<"NeverError",       Trace<CX, "NeverError">, T>
  }

  AnyError() {
    // type AnyError        <CX extends string, T> = NewError<"AnyError",         Trace<CX, "AnyError">, T>
  }

  UnknownError() {
    // type UnknownError    <CX extends string, T> = NewError<"UnknownError",     Trace<CX, "UnknownError">, T>
  }

  MismatchError() {
    // type MismatchError   <CX extends string, T> = NewError<"MismatchError",    Trace<CX, "MismatchError">, T>
  }

  NonLiteralError() {
    // type NonLiteralError <CX extends string, T> = NewError<"NonLiteralError",  Trace<CX, "NonLiteralError">, T>
  }

  EmptyStringError() {
    // type EmptyStringError<CX extends string, T> = NewError<"EmptyStringError", Trace<CX, "EmptyStringError">, T>
  }

  OpenTypeError() {
    // type OpenTypeError   <CX extends string, T> = NewError<"OpenTypeError",    Trace<CX, "OpenTypeError">, T>
  }

  FilterError$() {
    // type FilterError$<T> =
    //   IsError_<T> extends true ? T : never
  }

  IsNever() {
    // type IsNever<T> = [T] extends [never] ? true : false
  }

  IsAny() {
    // type IsAny<T> = [IsNever<T>] extends [true]
    //   ? false
    //   : 0 extends 1 & T
    //   ? true
    //   : false
  }

  IsUnknown() {
    // type IsUnknown<T> = [IsNever<T>] extends [true]
    //   ? false
    //   : 0 extends 1 & T
    //   ? false
    //   : [unknown] extends [T]
    //   ? true
    //   : false
  }

  IsOpenType() {
    // type IsOpenType<T> = [T] extends [never]
    //   ? true
    //   : 0 extends 1 & T
    //   ? true
    //   : [unknown] extends [T]
    //   ? true
    //   : false
  }

  IsNil() {
    // type IsNil<T> = [IsOpenType<T>] extends [true]
    //   ? false
    //   : [T] extends [NIL]
    //   ? true
    //   : false
  }

  IsError_() {
    // type IsError_<T> = T extends {
    //
    //   [key: string]: any
    // }
    //   ?
    //     T extends GENERIC_ERROR
    //     ? true
    //     : false
    //   : false
  }

  Trace() {
    // type Trace<
    //   Context extends string,
    //   Name extends string,
    //   Next extends string = ""
    // > = Next extends ""
    //   ? _Trace<Context, Name>
    //   :
    //     _Trace<Context, _Trace<Name, Next>>
  }

  VALIDATOR_MODES() {
    // type VALIDATOR_MODES = "never" | "either"
  }

  Validate$() {
    // type Validate$<
    //   T,
    //   CX extends string = "",
    // > = CoreValidate$<
    //
    //   T,
    //   "never",
    //   Trace<CX, "Validate$">
    // >
  }

  EitherValidate() {
    // type EitherValidate<
    //   T,
    //   CX extends string = "",
    // > = CoreValidate$<
    //   T,
    //   "either",
    //   Trace<CX, "EitherValidate">
    // >
  }

  ValidateEmptyString$() {
    // type ValidateEmptyString$<T> = SafeChain<
    //   "never",
    //   FilterError$<T>,
    //   T
    // >
  }

  EitherValidate_EmptyString$() {
    // type EitherValidate_EmptyString$<T> =
    //   SafeChain<
    //
    //     "either",
    //     FilterError$<T>,
    //     T
    //   >
  }

  ValidateLiteral$() {
    // type ValidateLiteral$<
    //   Mode extends VALIDATOR_MODES,
    //   T,
    //   Match
    // > = [T] extends [Match]
    //   ? [Match] extends [T]
    //     ? NonLiteralError<"ValidateLiteral$", T>
    //     : If$<Mode, "either", T>
    //   : MismatchError<"_ValidateLiteral", T>
  }

  Validate_StringLiteral() {
    // type Validate_StringLiteral<T> = Configure<
    //   "never",
    //   T,
    //   string
    // >
  }

  Validate_NumberLiteral() {
    // type Validate_NumberLiteral<T> = Configure<
    //   "never",
    //   T,
    //   number
    // >
  }

  Validate_BooleanLiteral() {
    // type Validate_BooleanLiteral<T> =
    //   Configure<"never", T, boolean>
  }

  EitherValidate_StringLiteral() {
    // type EitherValidate_StringLiteral<T> =
    //   Configure<"either", T, string>
  }

  EitherValidate_NumberLiteral() {
    // type EitherValidate_NumberLiteral<T> =
    //   Configure<"either", T, number>
  }

  EitherValidate_BooleanLiteral() {
    // type EitherValidate_BooleanLiteral<T> =
    //   Configure<"either", T, boolean>
  }

  ValidateNever$() {
    // type ValidateNever$<T> = [T] extends [
    //   never
    // ]
    //   ? NeverError<"ValidateNever$", T>
    //   : never
  }

  ValidateAny$() {
    // type ValidateAny$<T> = [
    //   IsError_<T>
    // ] extends [true]
    //   ? T
    //   : 0 extends 1 & T
    //   ? AnyError<"ValidateAny$", T>
    //   : never
  }

  ValidateUnknown() {
    // export type ValidateUnknown<T> = [
    //   IsError_<T>
    // ] extends [true]
    //   ? T
    //   : [unknown] extends [T]
    //   ? NewError<
    //       "UnknownError",
    //       "InValidateUnknown",
    //       T
    //     >
    //   : never
  }

  ValidateType$() {
    // type ValidateType$<
    //   CX extends string,
    //   T$,
    //   Match
    // > = SafeChain<
    //   CX,
    //   "never",
    //   FilterError$<T$>,
    //   T$,
    //   Match
    // >
  }

  EitherValidate_Type$() {
    // type EitherValidate_Type$<T$, Match> =
    //   SafeChain<
    //     "CX",
    //     "either",
    //     FilterError$<T$>,
    //     T$,
    //     Match
    //   >
  }

  ValidateUsableSting$() {
    // type ValidateUsableSting$<T> =
    //   FilterError$<Check<T>>
  }

  CH_ValidateUsableSting$() {
    // type CH_ValidateUsableSting$<T> =
    //   FilterError$<Check<T>>
  }
}

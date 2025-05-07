
export class TypeUtils {
  SafeValue<E, T>(): string {
  const typeDef =`type SafeValue<E, T> = [E] extends [never]
  ? T
  : E` 
  return typeDef
  }

  IfElse$<A, B, C, D>(): string {
  const typeDef =`type IfElse$<A, B, C, D> = A extends B
  ? C
  : D` 
  return typeDef
  }

  If$<A, B, C>(): string {
  const typeDef =`type If$<A, B, C> = IfElse$<A, B, C, never>` 
  return typeDef
  }

  FilterType$<All, Sub extends All, >(): string {
  const typeDef =`type FilterType$<
  All,
  Sub extends All,
> = All extends Sub ? All : never` 
  return typeDef
  }

  RejectType$<All, Sub extends All, >(): string {
  const typeDef =`type RejectType$<
  All,
  Sub extends All,
> = All extends Sub ? never : All` 
  return typeDef
  }

  TypeError<_ErrorType extends keyof ErrorsLookup, Context extends string, Value>(): string {
  const typeDef =`type TypeError<
  _ErrorType extends keyof ErrorsLookup,
  Context extends string,
  Value
> = {
  __type: _ErrorType
  __message: ErrorsLookup[_ErrorType]["msg"]
  __context: Context
  __value: Value & {} 
  __url: ErrorsLookup[_ErrorType]["url"]
}` 
  return typeDef
  }

  EmptyStringError<CX extends string, T>(): string {
  const typeDef =`type EmptyStringError<CX extends string, T> = TypeError<"EmptyStringError", Trace<CX, "EmptyStringError">, T>` 
  return typeDef
  }

  FilterError$<T>(): string {
  const typeDef =`type FilterError$<T> =
  IsError_<T> extends true ? T : never` 
  return typeDef
  }

  IsNever<T>(): string {
  const typeDef =`type IsNever<T> = [T] extends [never] ? true : false` 
  return typeDef
  }

  IsAny<T>(): string {
  const typeDef =`type IsAny<T> = [IsNever<T>] extends [true]
  ? false
  : 0 extends 1 & T
  ? true
  : false` 
  return typeDef
  }

  IsUnknown<T>(): string {
  const typeDef =`type IsUnknown<T> = [IsNever<T>] extends [true]
  ? false
  : 0 extends 1 & T
  ? false
  : [unknown] extends [T]
  ? true
  : false` 
  return typeDef
  }

  IsOpenType<T>(): string {
  const typeDef =`type IsOpenType<T> = [T] extends [never] 
  ? true
  : 0 extends 1 & T 
  ? true
  : [unknown] extends [T] 
  ? true
  : false` 
  return typeDef
  }

  IsNil<T>(): string {
  const typeDef =`type IsNil<T> = [IsOpenType<T>] extends [true]
  ? false
  : [T] extends [NIL]
  ? true
  : false` 
  return typeDef
  }

  IsError_<T>(): string {
  const typeDef =`type IsError_<T> = T extends {
  
  [key: string]: any
}
  ? 
    T extends GENERIC_ERROR
    ? true
    : false
  : false` 
  return typeDef
  }

  Trace<Context extends string, Name extends string, Next extends string = "">(): string {
  const typeDef =`type Trace<
  Context extends string,
  Name extends string,
  Next extends string = ""
> = Next extends ""
  ? _Trace<Context, Name>
  : 
    _Trace<Context, _Trace<Name, Next>>` 
  return typeDef
  }

  Validate$<T, CX extends string = "", >(): string {
  const typeDef =`type Validate$<
  T,
  CX extends string = "",
> = CoreValidate$<
  
  T,
  "never",
  Trace<CX, "Validate$">
>` 
  return typeDef
  }

  EitherValidate<T, CX extends string = "", >(): string {
  const typeDef =`type EitherValidate<
  T,
  CX extends string = "",
> = CoreValidate$<
  T,
  "either",
  Trace<CX, "EitherValidate">
>` 
  return typeDef
  }

  ValidateEmptyString$<T>(): string {
  const typeDef =`type ValidateEmptyString$<T> = SafeChain<
  "never",
  FilterError$<T>,
  T
>` 
  return typeDef
  }

  EitherValidate_EmptyString$<T>(): string {
  const typeDef =`type EitherValidate_EmptyString$<T> =
  SafeChain<
    
    "either",
    FilterError$<T>,
    T
  >` 
  return typeDef
  }

  ValidateLiteral$<Mode extends VALIDATOR_MODES, T, Match>(): string {
  const typeDef =`type ValidateLiteral$<
  Mode extends VALIDATOR_MODES,
  T,
  Match
> = [T] extends [Match]
  ? [Match] extends [T]
    ? NonLiteralError<"ValidateLiteral$", T>
    : If$<Mode, "either", T>
  : MismatchError<"_ValidateLiteral", T>` 
  return typeDef
  }

  Validate_StringLiteral<T>(): string {
  const typeDef =`type Validate_StringLiteral<T> = Configure<
  "never",
  T,
  string
>` 
  return typeDef
  }

  Validate_NumberLiteral<T>(): string {
  const typeDef =`type Validate_NumberLiteral<T> = Configure<
  "never",
  T,
  number
>` 
  return typeDef
  }

  Validate_BooleanLiteral<T>(): string {
  const typeDef =`type Validate_BooleanLiteral<T> =
  Configure<"never", T, boolean>` 
  return typeDef
  }

  EitherValidate_StringLiteral<T>(): string {
  const typeDef =`type EitherValidate_StringLiteral<T> =
  Configure<"either", T, string>` 
  return typeDef
  }

  EitherValidate_NumberLiteral<T>(): string {
  const typeDef =`type EitherValidate_NumberLiteral<T> =
  Configure<"either", T, number>` 
  return typeDef
  }

  EitherValidate_BooleanLiteral<T>(): string {
  const typeDef =`type EitherValidate_BooleanLiteral<T> =
  Configure<"either", T, boolean>` 
  return typeDef
  }

  ValidateNever$<T>(): string {
  const typeDef =`type ValidateNever$<T> = [T] extends [
  never
]
  ? NeverError<"ValidateNever$", T>
  : never` 
  return typeDef
  }

  ValidateAny$<T>(): string {
  const typeDef =`type ValidateAny$<T> = [
  IsError_<T>
] extends [true]
  ? T
  : 0 extends 1 & T
  ? AnyError<"ValidateAny$", T>
  : never` 
  return typeDef
  }

  ValidateUnknown<T>(): string {
  const typeDef =`export type ValidateUnknown<T> = [
  IsError_<T>
] extends [true] 
  ? T
  : [unknown] extends [T]
  ? TypeError<
      "UnknownError",
      "InValidateUnknown",
      T
    >
  : never` 
  return typeDef
  }

  ValidateType$<CX extends string, T$, Match>(): string {
  const typeDef =`type ValidateType$<
  CX extends string,
  T$,
  Match
> = SafeChain<
  CX,
  "never",
  FilterError$<T$>,
  T$,
  Match
>` 
  return typeDef
  }

  EitherValidate_Type$<T$, Match>(): string {
  const typeDef =`type EitherValidate_Type$<T$, Match> =
  SafeChain<
    "CX",
    "either",
    FilterError$<T$>,
    T$,
    Match
  >` 
  return typeDef
  }

  ValidateUsableSting$<T>(): string {
  const typeDef =`type ValidateUsableSting$<T> =
  FilterError$<Check<T>>` 
  return typeDef
  }

  CH_ValidateUsableSting$<T>(): string {
  const typeDef =`type CH_ValidateUsableSting$<T> =
  FilterError$<Check<T>>` 
  return typeDef
  }
}

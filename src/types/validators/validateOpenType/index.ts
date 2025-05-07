import type {
  AnyError,
  NeverError,
  TypeError,
} from "../../errors"
import { IsError_ } from "../../predicates"

export type ValidateNever$<T> = [T] extends [
  never
]
  ? NeverError<"ValidateNever$", T>
  : never

export type ValidateAny$<T> = [
  IsError_<T>
] extends [true]
  ? T
  : 0 extends 1 & T
  ? AnyError<"ValidateAny$", T>
  : never

// export type InValidateUnknown<T> = [T] extends [GenericError] // overlap: any to Error

export type ValidateUnknown<T> = [
  IsError_<T>
] extends [true] // this is better, no overlap
  ? T
  : [unknown] extends [T]
  ? TypeError<
      "UnknownError",
      "InValidateUnknown",
      T
    >
  : never

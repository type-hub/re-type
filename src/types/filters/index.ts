import { IsError_ } from "../predicates"

export type FilterError$<T> =
  IsError_<T> extends true ? T : never

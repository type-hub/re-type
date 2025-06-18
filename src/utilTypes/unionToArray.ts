/* eslint-disable @typescript-eslint/no-explicit-any */
// https://catchts.com/union-array
// credits goes to https://stackoverflow.com/a/50375286

// prettier-ignore
type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never

// Converts union to overloaded function
// prettier-ignore
type UnionToOvlds<U> = UnionToIntersection<
  U extends any ? (f: U) => void : never
>

// prettier-ignore
type PopUnion<U> = UnionToOvlds<U> extends (
  a: infer A
) => void
  ? A
  : never

// prettier-ignore
type IsUnion<T> = [T] extends [
  UnionToIntersection<T>
]
  ? false
  : true

// prettier-ignore
export type UnionToArray<
  T,
  A extends unknown[] = []
> = IsUnion<T> extends true
  ? UnionToArray<
      Exclude<T, PopUnion<T>>,
      [PopUnion<T>, ...A]
    >
  : [T, ...A]

/**
 * ALGO
 *
 * @returns boolean
 */
export type IsNever<T> = [T] extends [never]
  ? true
  : false

/**
 * ALGO
 *
 * @returns boolean
 */
export type IsAny<T> = [IsNever<T>] extends [true]
  ? false
  : 0 extends 1 & T
  ? true
  : false

/**
 * ALGO
 *
 * @returns boolean
 */
export type IsUnknown<T> = [IsNever<T>] extends [
  true
]
  ? false
  : 0 extends 1 & T
  ? false
  : [unknown] extends [T]
  ? true
  : false

/**
 * ALGO
 *
 * @returns boolean
 */
export type IsOpenType<T> = [T] extends [never] // isNever
  ? true
  : 0 extends 1 & T // isAny
  ? true
  : [unknown] extends [T] // isUnknown
  ? true
  : false

type NIL = null | undefined

/**
 * ALGO
 *
 * @returns boolean
 */
export type IsNil<T> = [IsOpenType<T>] extends [
  true
]
  ? false
  : [T] extends [NIL]
  ? true
  : false

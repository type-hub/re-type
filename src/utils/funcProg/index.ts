/* eslint-disable @typescript-eslint/no-explicit-any */
import { readFileSync as _readFileSync } from "fs"

type PartialTuple<T extends any[]> = T extends [infer Head, ...infer Tail]
  ? //
    [Head?, ...PartialTuple<Tail>]
  : []

function maybe<Func extends (...args: any[]) => any>(func: Func) {
  return <MaybeArgs extends PartialTuple<Parameters<Func>>>(
    ...args: MaybeArgs
  ): MaybeArgs extends Parameters<Func>
    ? ReturnType<Func>
    : MaybeArgs["length"] extends Parameters<Func>["length"]
    ? ReturnType<Func> | undefined
    : undefined => {
    if (args.some((arg) => arg === undefined)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return undefined as any // X<Func>
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return func(...args)
  }
}

//

// GOOD
const id = <T extends string, U extends number>(_a: T, _b: U): T => _a
// BAD
// const id = (_a: string = '01', _b: number = 10) => _a;

// ---------------------------------------------

const test = maybe(id)

// 1. no args
const a = test()
//    ^?

// 2. no enough args
const b = test("1")
//    ^?

// 3. correct args
const c = test("1", 1)
//    ^?

// 4. optional args
const d = test(Math.random() > 0.5 ? "" : undefined, Math.random() > 0.5 ? 1 : undefined)
const _d = d
//    ^?

// 5. to many args
const e = test("1", 1, "")
//    ^?

//

export const readFileSync = (filePath: string): string => _readFileSync(filePath, "utf-8")

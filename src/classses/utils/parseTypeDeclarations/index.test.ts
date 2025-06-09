import { describe, expect, it } from "vitest"
import { parseTypeDeclaration } from "."

describe("TypeParser", () => {
  it("should create relaxed variant", () => {
    const relaxed = parseTypeDeclaration("type Pick<A extends string, B extends number, C = 1> = A | B | C")

    // console.log("relaxed", relaxed)

    const match =
      //
      `type Pick_Lax<CONTEXT extends string, A , B , C = 1> = A extends string
  ? B extends number
  ? Pick<A, B, C>
  : MismatchError<Trace<CONTEXT, "Pick_Lax-B">, B>
  : MismatchError<Trace<CONTEXT, "Pick_Lax-A">, A>`

    expect(relaxed).toBe(match)
  })

  it("should create either type", () => {
    const either = parseTypeDeclaration("type Pick<A extends string, B extends number, C = 1> = A | B | C")

    console.log("either ->", either)

    const match =
      //
      ``

    expect(either).toBe(match)
  })
})

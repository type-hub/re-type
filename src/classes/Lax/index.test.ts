import { describe, expect, it } from "vitest"
import { Lax } from "."

describe("TypeParser", () => {
  it("should create relaxed variant", () => {
    const lax = new Lax("type Pick<A extends string, B extends number, C = 1> = A | B | C")

    // console.log(lax.typeDeclaration({ withContext: true }), "\n")
    // console.log(lax.eitherTypeDeclaration({ withContext: true }), "\n")

    const match =
      //
      `type Pick_Lax<CONTEXT extends string, A , B , C = 1> = A extends string
  ? B extends number
  ? Pick<A, B, C>
  : MismatchError<Trace<CONTEXT, "Pick_Lax-B">, B>
  : MismatchError<Trace<CONTEXT, "Pick_Lax-A">, A>`

    expect(false).toBe(true)
  })
})

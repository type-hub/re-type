import { ImportRegistry } from "services/ImportRegistry"
import { beforeEach, describe, expect, it } from "vitest"
import { Strict } from "."

beforeEach(() => {
  // called once before each test run
  ImportRegistry.clearImports()

  // clean up function, called once after each test run
  return () => {
    ImportRegistry.clearImports()
  }
})

describe("TypeParser", () => {
  it("should create relaxed variant", () => {
    const lax = new Strict(
      //
      "type Pick<A extends string, B extends number, C = 1> = A | B | C",
      true,
    )

    console.log(lax.laxTypeDeclaration(), "\n")
    // console.log(lax.eitherTypeDeclaration(), "\n")
    // console.log(lax.inline())

    console.log("imports", ImportRegistry.getImports())

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

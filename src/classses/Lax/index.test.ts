import { describe, expect, it } from "vitest"
import { Lax } from "."
import { ReTypeErrorTemplate } from "../ReTypeError"
import { Templater } from "../Templater"
import { Either } from "../Templater/either"
import { TypeBuilder } from "../TypeBuilder"

describe("TypeParser", () => {
  it("should create relaxed variant", () => {
    const lax = new Lax(
      "type Pick<A extends string, B extends number, C = 1> = A | B | C",
      new Templater(
        //
        new TypeBuilder(new ReTypeErrorTemplate()),
        new Either(new TypeBuilder(new ReTypeErrorTemplate())),
      ),
      new TypeBuilder(new ReTypeErrorTemplate()),
      true,
    )

    console.log(lax.typeDeclaration(), "\n")
    console.log(lax.eitherTypeDeclaration(), "\n")
    // console.log(lax.inline())

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

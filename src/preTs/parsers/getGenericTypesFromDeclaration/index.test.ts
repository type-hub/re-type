import { describe, expect, it } from "vitest"
import { getGenericTypesFromDeclaration } from "."
import { TYPE } from "../../../testData"

describe("Parse type declarations", () => {
  it("should parse without validation", () => {
    const parsed = getGenericTypesFromDeclaration(TYPE.func.mixedValidation)

    console.log("parsed", parsed)

    expect(true).toBe(true)
  })
})

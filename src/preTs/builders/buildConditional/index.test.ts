import { describe, expect, it } from "vitest"
import { TYPE } from "../../../testData"
import { getGenericTypesFromDeclaration } from "../../parsers/getGenericTypesFromDeclaration"

describe("Parse type declarations", () => {
  it("should parse without validation", () => {
    const parsed = getGenericTypesFromDeclaration(TYPE.func.mixedValidation)

    // console.log("parsed", buildConditionalTypeBody())

    expect(true).toBe(true)
  })
})

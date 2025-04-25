import { describe, expect, it } from "vitest"
import { parseTypeFunction } from "."
import { TYPE } from "../../../testData"

describe("Parse type declarations", () => {
  it("should parse without validation", () => {
    const parsed = parseTypeFunction(TYPE.func.mixedValidation)

    console.log("parsed", parsed)

    expect(parsed.typeFuncName).toBe("MixedValidation")
  })

  it("should parse with validation", () => {
    const parsed = parseTypeFunction(TYPE.func.withValidation)

    expect(parsed.typeFuncName).toBe("WithValidation")
  })
})

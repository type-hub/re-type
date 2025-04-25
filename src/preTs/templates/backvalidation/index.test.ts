import { describe, expect, it } from "vitest"
import { backValidation } from "."
import { TYPE } from "../../../testData"

describe("Parse type declarations", () => {
  it("should parse without validation", () => {
    const parsed = backValidation(TYPE.func.mixedValidation)

    console.log("to to", parsed)

    expect(true).toBe(true)
  })
})

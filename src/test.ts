import { Lax } from "classses/Lax"
import { Strict } from "classses/Strict"
import fs from "node:fs"
import { toPairs } from "ramda"
import { ImportRegistry } from "services/ImportRegistry"

const input = "type Check<A extends string, B extends number, C = 1> = A | B | C"
const tests = {
  //
  never: `Check_Strict_Lax<"Check_Strict", never, 1, 10>`,
  any: `Check_Strict_Lax<"Check_Strict", any, 1, 10>`,
  unknown: `Check_Strict_Lax<"Check_Strict", unknown, 1, 10>`,
  //
  number: `Check_Strict_Lax<"Check_Strict", number, 1, 10>`,
  string_number: `Check_Strict_Lax<"Check_Strict", string | number, 1, 10>`,
}

const lax = new Lax(input, true)
const strict = new Strict(input, true)

// TODO: how to convert it into process/ pipe?
const laxTypeDeclaration = lax.typeDeclaration()
const laxEitherTypeDeclaration = lax.eitherTypeDeclaration()
const strictTypeDeclaration = strict.laxTypeDeclaration()

// console.log(lax.inline())
// console.log(strict.eitherTypeDeclaration(), "\n")
// console.log(strict.inline())

const content = `import {${ImportRegistry.getImports().join(", ")}} from "../src/coreTypes"

${input}

${laxTypeDeclaration}

${laxEitherTypeDeclaration}

${strictTypeDeclaration}

// TESTS -----------------------------
${toPairs(tests)
  .map(
    ([testName, testType]) => `
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Test_${testName} = ${testType}
//   ^?`,
  )
  .join("\n")}`

fs.writeFile("./dist/generated.ts", content, (err) => {
  if (err) {
    console.error(err)
  } else {
    // file written successfully
  }
})

ImportRegistry.clearImports()

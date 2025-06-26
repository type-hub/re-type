import * as ts from "typescript"
import * as fs from "fs"
import * as path from "path"
import { collectTypeFiles } from "./utils/file"
import { processAllFiles } from "./typeProcessing/processing"
import { generateOutput } from "./codegen"

const SCRIPT_TARGET = ts.ScriptTarget.ES2020

const typesDir = path.resolve(process.cwd(), "src/coreTypes")
const outputFilePath = path.resolve(process.cwd(), "src/classses/generated/TypeMirror/index.ts") // TODO: Remove typo 'classSes' when will be fixed in the codebase

const main = (): void => {
  const allFiles = collectTypeFiles(typesDir)
  const { parsed, failed } = processAllFiles(allFiles, SCRIPT_TARGET)
  const output = generateOutput(parsed)

  fs.writeFileSync(outputFilePath, output)

  console.log("Broken types:", failed.length)
  console.log("Broken types names:", failed.map((type) => type.name).join("\n"))
}

main()

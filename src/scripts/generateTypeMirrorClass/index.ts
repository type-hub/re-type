import * as fs from "fs"
import * as path from "path"
import * as ts from "typescript"

import { collectTsFilePaths } from "tsc/collectTsFilePaths"
import { generateOutput } from "./codegen"
import { processAllFiles } from "./typeProcessing/processing"

const SCRIPT_TARGET = ts.ScriptTarget.ES2020

const main = (dirToScan: string, outputFilePath: string): void => {
  const filePaths = collectTsFilePaths(dirToScan)

  const parsed = processAllFiles(filePaths, SCRIPT_TARGET)

  console.log(parsed)
  const output = generateOutput(parsed)

  fs.writeFileSync(outputFilePath, output)
}

main(
  // TODO: Remove typo 'classSes' when will be fixed in the codebase
  path.resolve(process.cwd(), "src/coreTypes"),
  // path.resolve(process.cwd(), "src/classses/generated/TypeMirror/index.ts"),
  path.resolve(process.cwd(), "dist/TypeMirror.ts"),
)

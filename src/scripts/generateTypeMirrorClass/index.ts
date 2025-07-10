import * as fs from "fs"
import * as path from "path"

import { pipe } from "ramda"
import { collectTsFilePaths } from "tsc/collectTsFilePaths"
import { generateOutput } from "./codegen"
import { processAllFiles } from "./typeProcessing/processing"

const main = (dirToScan: string, outputFilePath: string): void => {
  pipe(
    //
    collectTsFilePaths,
    processAllFiles,
    generateOutput,
    (code: string) => fs.writeFileSync(outputFilePath, code),
  )(dirToScan)
}

main(
  //
  path.resolve(process.cwd(), "src/coreTypes"),
  path.resolve(process.cwd(), "dist/TypeMirror.ts"),
)

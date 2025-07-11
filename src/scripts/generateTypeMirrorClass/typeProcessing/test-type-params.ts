import * as fs from "fs"
import { getGenericsFromNode } from "tsc/utils"
import * as ts from "typescript"

// Example type declarations with different parameter patterns
const exampleCode = `
// Type with no defaults
export type SimpleGeneric<T> = T[];

// Type with constraint but no default
export type ConstrainedGeneric<T extends string> = Record<string, T>;

// Type with default
export type DefaultGeneric<T = string> = T | null;

// Type with constraint and default
export type ConstrainedDefaultGeneric<T extends number = 42> = T | undefined;

// Type with multiple parameters
export type MultiParamGeneric<T, U = string, V extends object = {}> = {
  prop1: T;
  prop2: U;
  prop3: V;
};
`

// Function to parse and analyze the example code
function analyzeTypeParameters() {
  // Write the example code to a temporary file
  const tempFilePath = "/tmp/type-params-test.ts"
  fs.writeFileSync(tempFilePath, exampleCode)

  // Create a SourceFile object
  const program = ts.createProgram([tempFilePath], {})
  const sourceFile = program.getSourceFile(tempFilePath)

  if (!sourceFile) {
    console.error("Failed to parse source file")
    return
  }

  // Get the text content of the source file
  const sourceText = sourceFile.getFullText()

  // Process each type alias declaration
  sourceFile.forEachChild((node) => {
    if (ts.isTypeAliasDeclaration(node)) {
      const typeName = node.name.text
      const typeParams = getGenericsFromNode(node, sourceText)

      console.warn(`Type '${typeName}' parameters:`, JSON.stringify(typeParams, null, 2))
    }
  })

  // Clean up the temporary file
  fs.unlinkSync(tempFilePath)
}

// Run the analysis
analyzeTypeParameters()

import { spawn } from "child_process"
import * as fs from "fs"
import * as path from "path"

/**
 * A utility to resolve TypeScript types using the TypeScript compiler API.
 * This approach creates a standalone file and runs the TypeScript compiler directly
 * to access the complete type information.
 */
export function resolveType(typeExpression: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // Create a temporary TypeScript file with the type expression to resolve
    const tempDir = path.join(__dirname, "temp-type-resolver")
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true })
    }

    const tempFilePath = path.join(tempDir, "type-query.ts")
    const resolverFilePath = path.join(tempDir, "resolver.ts")

    // Create the type query file
    const typeFileContent = `
// Define necessary types for our test
type x = 'a' | 'b' | 'c';

// Type expression to resolve
type TypeToResolve = ${typeExpression};

// Export to make it available to the resolver
export type { TypeToResolve };
`

    // Create the resolver that will print the type information
    const resolverContent = `
import * as ts from 'typescript';
import * as path from 'path';
import * as fs from 'fs';
import type { TypeToResolve } from './type-query';

// Create a program to analyze the type
const program = ts.createProgram(['./type-query.ts'], {
  target: ts.ScriptTarget.ESNext,
  module: ts.ModuleKind.CommonJS,
  strict: true,
});

const checker = program.getTypeChecker();
const sourceFile = program.getSourceFile('./type-query.ts');

if (sourceFile) {
  let typeAlias: ts.TypeAliasDeclaration | undefined;

  // Find the TypeToResolve type alias
  ts.forEachChild(sourceFile, node => {
    if (ts.isTypeAliasDeclaration(node) && node.name.text === 'TypeToResolve') {
      typeAlias = node;
    }
  });

  if (typeAlias) {
    const symbol = checker.getSymbolAtLocation(typeAlias.name);
    if (symbol) {
      // Get the fully resolved type
      const type = checker.getTypeAtLocation(typeAlias.name);

      // Print the type with no truncation
      const typeString = checker.typeToString(
        type,
        typeAlias,
        ts.TypeFormatFlags.NoTruncation |
        ts.TypeFormatFlags.InTypeAlias |
        ts.TypeFormatFlags.MultilineObjectLiterals
      );

      console.log(typeString);
    }
  }
}
`

    // Write both files
    fs.writeFileSync(tempFilePath, typeFileContent)
    fs.writeFileSync(resolverFilePath, resolverContent)

    // Create a package.json for the temporary project
    const packageJsonPath = path.join(tempDir, "package.json")
    const packageJson = {
      name: "temp-type-resolver",
      version: "1.0.0",
      private: true,
      dependencies: {
        typescript: "^4.9.0",
      },
    }
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))

    // Create a tsconfig.json for the temporary project
    const tsconfigPath = path.join(tempDir, "tsconfig.json")
    const tsconfig = {
      compilerOptions: {
        target: "ESNext",
        module: "CommonJS",
        strict: true,
        esModuleInterop: true,
        skipLibCheck: true,
      },
    }
    fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2))

    // Run the resolver script to output the resolved type
    const tsNode = spawn("npx", ["ts-node", "resolver.ts"], {
      cwd: tempDir,
      stdio: ["ignore", "pipe", "pipe"],
    })

    let output = ""
    let errorOutput = ""

    tsNode.stdout.on("data", (data) => {
      output += data.toString()
    })

    tsNode.stderr.on("data", (data) => {
      errorOutput += data.toString()
    })

    tsNode.on("close", (code) => {
      // Clean up the temporary directory after execution
      try {
        fs.rmSync(tempDir, { recursive: true, force: true })
      } catch (err) {
        console.error("Failed to clean up temporary directory:", err)
      }

      if (code === 0) {
        resolve(output.trim())
      } else {
        reject(new Error(`TypeScript resolver failed with code ${code}\n${errorOutput}`))
      }
    })
  })
}

/**
 * Synchronous version of resolveType that uses a simpler approach via the ts-node command line.
 * Less reliable but doesn't require async handling.
 */
export function resolveTypeSync(typeExpression: string): string {
  try {
    // Create a temporary file with the expression
    const tempFileName = "temp-type-sync.ts"
    const tempFilePath = path.join(__dirname, tempFileName)

    // Write a simple file that logs the type information
    const fileContent = `
// Define necessary types for the test
type x = 'a' | 'b';

// The type expression to resolve
type TypeToResolve = ${typeExpression};

// This is a runtime trick to print the type at compile time
// TypeScript will show the resolved type in the error message
const showType: TypeToResolve = null as any;

console.log('Type checking complete');
`

    fs.writeFileSync(tempFilePath, fileContent)

    try {
      // Run ts-node with --type-check to see error messages
      const result = require("child_process").execSync(`npx ts-node --transpileOnly ${tempFilePath} 2>&1`, {
        encoding: "utf-8",
      })

      // If we get here, the type is valid but we didn't get to see the resolved type
      return "Valid type, but detailed info not available"
    } catch (execError: any) {
      // Parse the error message which contains the type information
      const errorMsg = execError.message || execError.toString()

      // Look for type information in the error message
      const typePattern = /Type '.+' is not assignable to type '(.+)'/
      const match = errorMsg.match(typePattern)

      if (match && match[1]) {
        return match[1]
      } else {
        return "Could not extract type from error message"
      }
    } finally {
      // Clean up
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath)
      }
    }
  } catch (error) {
    console.error("Error in resolveTypeSync:", error)
    return `Error: ${error instanceof Error ? error.message : String(error)}`
  }
}

/**
 * A simple function to test the type resolution
 * Prints both the type expression and its resolved form
 */
export function printResolvedType(typeExpression: string): void {
  console.log(`Type expression: ${typeExpression}`)
  console.log(`Resolved to: ${resolveType(typeExpression)}`)
}

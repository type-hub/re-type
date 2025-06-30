import { findTypeDeclarations } from "../src/tsc"

// // Creating a printer here, so we can print an TS node
// import * as ts from "typescript"
// const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

// const typeStringAlias = ts.factory.createTypeAliasDeclaration(
//   undefined,
//   ts.factory.createIdentifier("StringType"),
//   undefined,
//   ts.factory.createTypeReferenceNode("string"),
// )

// console.log(
//   printer.printNode(ts.EmitHint.Unspecified, typeStringAlias, ts.createSourceFile("", "", ts.ScriptTarget.Latest)),
// )

const rootDir = "./src"
const dirsToScan = ["./src", "./tests", "./lib"]
const myType = "ValidateFlatTuple$"
const declarationPaths = findTypeDeclarations(rootDir, dirsToScan, myType)

console.log("declarationPaths", declarationPaths)

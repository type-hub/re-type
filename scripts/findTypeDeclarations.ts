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

const dirsToScan = "./src"
const typesToFind = ["ValidateFlatTuple$", "ReTypeError"]
const declarationPaths = findTypeDeclarations(dirsToScan, typesToFind)

console.log("declarationPaths", declarationPaths)

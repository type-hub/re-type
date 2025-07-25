import * as fs from "fs"
import * as ts from "typescript"
import { collectTsFilePaths } from "./collectTsFilePaths"

export const findTypeDeclarations = (rootDir: string, dirsToScan: string[], myType: string): string[] => {
  const filePaths = collectTsFilePaths(dirsToScan)

  // console.log(`Total TypeScript files found: ${filePaths.length}`)
  // filePaths.forEach((file) => console.log(`  ${file}`))

  const defPaths: string[] = []

  for (const filePath of filePaths) {
    const sourceFile = ts.createSourceFile(filePath, fs.readFileSync(filePath, "utf8"), ts.ScriptTarget.Latest)

    // print source file
    // console.log(
    //   printer.printNode(ts.EmitHint.Unspecified, sourceFile, ts.createSourceFile("", "", ts.ScriptTarget.Latest)),
    // )

    ts.forEachChild(sourceFile, (node) => {
      if (ts.isTypeAliasDeclaration(node) && node.modifiers?.some((mod) => mod.kind === ts.SyntaxKind.ExportKeyword)) {
        const typeName = node.name.escapedText
        console.log(
          typeName,
          rootDir,
          node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword),
        )

        // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
        if (typeName === myType) {
          // defPaths.push(filePath.replace(rootDir, ".").replace(rootDir.replace("./", ""), "."))
          defPaths.push(filePath) ///.replace(rootDir, ".").replace(rootDir.replace("./", ""), "."))
        }
      }
    })
  }

  return defPaths
}

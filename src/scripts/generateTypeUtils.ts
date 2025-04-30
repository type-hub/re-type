import * as ts from "typescript"
import * as fs from "fs"
import * as path from "path"

const typesDir = path.resolve(__dirname, "../types/")
const outputFilePath = path.resolve(__dirname, "../types/GeneratedTypes.ts")

const allMethodNames: string[] = []

const visitSourceFile = (filePath: string) => {
  const file = ts.createSourceFile(
    filePath,
    fs.readFileSync(filePath, "utf-8"),
    ts.ScriptTarget.ES2020,
    true
  )

  file.forEachChild((node) => {
    if (
      ts.isTypeAliasDeclaration(node) &&
      node.modifiers?.some((mod) => mod.kind === ts.SyntaxKind.ExportKeyword)
    ) {
      const name = node.name.text
      allMethodNames.push(name)
    }
  })
}

const getAllTypeFiles = (dir: string): string[] => {
  const tsFiles: string[] = []

  const collectTypeFiles = (currentPath: string) => {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name)

      if (entry.isDirectory()) {
        collectTypeFiles(fullPath)
      } else if (
        entry.isFile() &&
        entry.name.endsWith(".ts") &&
        !entry.name.endsWith(".d.ts")
      ) {
        tsFiles.push(fullPath)
      }
    }
  }

  collectTypeFiles(dir)

  return tsFiles
}

getAllTypeFiles(typesDir).forEach(visitSourceFile)

const classBody = allMethodNames
  .map((name) => `  ${name}(...args: any[]): any {\n  }`)
  .join("\n\n")

const output = `
export class TypeUtils {
${classBody}
}
`

fs.writeFileSync(outputFilePath, output)

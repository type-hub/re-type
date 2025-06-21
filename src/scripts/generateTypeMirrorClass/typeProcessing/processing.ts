import * as ts from "typescript"
import * as fs from "fs"
import { parseTypeDeclaration } from "../../../utils/parseTypeDeclarations"
import { cleanTypeDef } from "./clean"
import { isTypeAlias, isExported } from "./guards"
import type { METHOD, BROKEN_TYPE, PARSE_RESULT } from "./types"

const CHARACTER_ENCODING = "utf-8"

export function processExportedTypeAlias(
  node: ts.TypeAliasDeclaration,
  sourceText: string,
): { parsed?: METHOD; failed?: BROKEN_TYPE } {
  const name = node.name.text

  const rawText = sourceText.slice(node.pos, node.end).trim()
  const cleaned = cleanTypeDef(rawText)

  try {
    const { name, generics } = parseTypeDeclaration(cleaned)
    return { parsed: { name, generics } }
  } catch {
    return { failed: { name } }
  }
}

export function visitSourceFile(filePath: string, scriptTarget: ts.ScriptTarget): PARSE_RESULT {
  const sourceText = fs.readFileSync(filePath, CHARACTER_ENCODING)

  const file = ts.createSourceFile(filePath, sourceText, scriptTarget, true)

  const parsedTypes: METHOD[] = []
  const failedTypes: BROKEN_TYPE[] = []

  file.forEachChild((node) => {
    if (isTypeAlias(node) && isExported(node)) {
      const result = processExportedTypeAlias(node, sourceText)

      if (result.parsed) {
        parsedTypes.push(result.parsed)
      }

      if (result.failed) {
        failedTypes.push(result.failed)
      }
    }
  })

  return { parsedTypes, failedTypes }
}

export function processAllFiles(filePaths: string[], scriptTarget: ts.ScriptTarget): PARSE_RESULT {
  return filePaths.reduce<PARSE_RESULT>(
    (acc, filePath) => {
      const { parsedTypes, failedTypes } = visitSourceFile(filePath, scriptTarget)

      acc.parsedTypes.push(...parsedTypes)
      acc.failedTypes.push(...failedTypes)

      return acc
    },
    { parsedTypes: [], failedTypes: [] },
  )
}

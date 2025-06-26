import * as ts from "typescript"
import * as fs from "fs"
import { parseTypeDeclaration } from "../../../utils/parseTypeDeclarations"
import { sanitize } from "./sanitize"
import { isExported, isTypeAlias } from "./guards"
import type { BROKEN_TYPE, METHOD, PARSE_RESULT, SINGLE_PARSE_RESULT } from "./types"

const CHARACTER_ENCODING = "utf-8"

export function processExportedTypeAlias(
  node: ts.TypeAliasDeclaration,
  sourceText: string,
): Partial<SINGLE_PARSE_RESULT> {
  const name = node.name.text

  const rawText = sourceText.slice(node.pos, node.end).trim()
  const sanitizedTypeDef = sanitize(rawText)

  try {
    return { parsed: parseTypeDeclaration(sanitizedTypeDef) }
  } catch {
    return { failed: { name } }
  }
}

export function visitSourceFile(filePath: string, scriptTarget: ts.ScriptTarget): PARSE_RESULT {
  const sourceText = fs.readFileSync(filePath, CHARACTER_ENCODING)

  const file = ts.createSourceFile(filePath, sourceText, scriptTarget, true)

  const parsed: METHOD[] = []
  const failed: BROKEN_TYPE[] = []

  file.forEachChild((node) => {
    if (isTypeAlias(node) && isExported(node)) {
      const result = processExportedTypeAlias(node, sourceText)

      if (result.parsed) {
        parsed.push(result.parsed)
      }

      if (result.failed) {
        failed.push(result.failed)
      }
    }
  })

  return { parsed, failed }
}

export function processAllFiles(filePaths: string[], scriptTarget: ts.ScriptTarget): PARSE_RESULT {
  return filePaths.reduce<PARSE_RESULT>(
    (acc, filePath) => {
      const { parsed, failed } = visitSourceFile(filePath, scriptTarget)

      acc.parsed.push(...parsed)
      acc.failed.push(...failed)

      return acc
    },
    { parsed: [], failed: [] },
  )
}

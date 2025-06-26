import * as fs from "fs"
import * as path from "path"

export const isTypeScriptFile = (fileName: string): boolean => fileName.endsWith(".ts") && !fileName.endsWith(".d.ts")

export const collectTypeFiles = (dir: string): string[] => {
  const files: string[] = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      files.push(...collectTypeFiles(fullPath))
    } else if (entry.isFile() && isTypeScriptFile(entry.name)) {
      files.push(fullPath)
    }
  }

  return files
}

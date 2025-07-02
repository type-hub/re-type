import * as fs from "fs"
import * as path from "path"

const isTypeScriptFile = (fileName: string): boolean => fileName.endsWith(".ts") && !fileName.endsWith(".d.ts")

export const collectTsFilePaths = (dirPath: string): string[] => {
  const filePaths: string[] = []
  const entries = fs.readdirSync(dirPath, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name)

    if (entry.isDirectory()) {
      filePaths.push(...collectTsFilePaths(fullPath))
    } else if (entry.isFile() && isTypeScriptFile(entry.name)) {
      filePaths.push(fullPath)
    }
  }

  return filePaths
}

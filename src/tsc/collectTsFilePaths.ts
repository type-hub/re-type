import * as fs from "fs"
import * as path from "path"

export const collectTsFilePaths = (dirsToScan: string[]): string[] => {
  const tsFileAbsolutePaths: string[] = []

  function addFilesFromDirectory(_path: string): void {
    try {
      const entries = fs.readdirSync(_path, { withFileTypes: true })

      for (const entry of entries) {
        const srcPath = path.join(_path, entry.name)

        console.log("src", _path)

        if (entry.isDirectory() && !["node_modules", ".git"].includes(entry.name)) {
          addFilesFromDirectory(srcPath)
        } else if (entry.isFile() && /\.tsx?$/.test(entry.name)) {
          tsFileAbsolutePaths.push(path.resolve(srcPath))
        }
      }
    } catch (error) {
      console.error(`Cannot scan directory ${_path}:`, error)
    }
  }

  dirsToScan
    //
    .filter(fs.existsSync)
    .forEach(addFilesFromDirectory)

  return tsFileAbsolutePaths
}

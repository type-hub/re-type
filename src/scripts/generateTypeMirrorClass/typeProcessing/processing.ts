import { isExportedStaticTypeAlias, isExportedTypeFunction } from "tsc/guards"
import { createSourceFileFromPath } from "tsc/utils"
import { type PARSED_TYPE_DECLARATION, parseNode } from "utils/parseTypeDeclarations"

const processSingleFile = (filePath: string): PARSED_TYPE_DECLARATION[] => {
  const { sourceText, sourceFile } = createSourceFileFromPath(filePath)

  // TODO: convert to SET
  const parsed: PARSED_TYPE_DECLARATION[] = []

  sourceFile.forEachChild((node) => {
    // console.log("sourceFile --- node.name --->", node.name?.escapedText.toString())
    // if (isExportedStaticTypeAlias(node)) {
    if (isExportedTypeFunction(node)) {
      const result = parseNode(sourceText, node)

      parsed.push(result)
    } else if (isExportedStaticTypeAlias(node)) {
      // console.log("TOJA NODE --->", getNodeText(sourceText)(node), node.name.text)
      // const result = parseNode(sourceText, node)
      parsed.push({
        typeName: node.name.text,
        generics: [],
        body: "",
      })
    }
    // }
  })

  // TODO: check lengths
  return parsed
}

export const processAllFiles = (filePaths: string[]): PARSED_TYPE_DECLARATION[] =>
  filePaths.reduce<PARSED_TYPE_DECLARATION[]>((acc, filePath) => {
    const parsed = processSingleFile(filePath)

    return [...acc, ...parsed]
  }, [])

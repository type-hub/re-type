import { regexes } from "../../../regexes"

export const cleanTypeDef = (raw: string): string =>
  raw.replace(regexes.exportType, "type").replace(regexes.blockComment, "").replace(regexes.lineComment, "")

import { regexes } from "../../../regexes"

export const sanitize = (raw: string): string => raw.replace(regexes.blockComment, "").replace(regexes.lineComment, "")

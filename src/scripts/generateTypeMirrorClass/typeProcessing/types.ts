import { GENERIC } from "../../../utils/parseTypeDeclarations"

type METHOD = {
  name: string
  generics: GENERIC[]
}

type BROKEN_TYPE = {
  name: string
}

type PARSE_RESULT = {
  parsedTypes: METHOD[]
  failedTypes: BROKEN_TYPE[]
}

export type { GENERIC, METHOD, BROKEN_TYPE, PARSE_RESULT }

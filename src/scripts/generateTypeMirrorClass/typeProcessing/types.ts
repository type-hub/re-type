import type { GENERIC } from "../../../utils/parseTypeDeclarations"

export type METHOD = {
  name: string
  generics: GENERIC[]
}

export type BROKEN_TYPE = {
  name: string
}

export type SINGLE_PARSE_RESULT = {
  parsed: METHOD
  failed: BROKEN_TYPE
}

type ConvertValuesToArray<T> = {
  [K in keyof T]: T[K][]
}

export type PARSE_RESULT = ConvertValuesToArray<SINGLE_PARSE_RESULT>

export type { GENERIC }

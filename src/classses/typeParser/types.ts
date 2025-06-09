export type GENERIC = {
  name: string
  constraint?: string
  defaultValue?: string
}

export type PARSED_TYPE_DECLARATION = {
  name: string
  generics: GENERIC[]
  body: string
}

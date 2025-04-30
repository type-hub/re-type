export type SingleGenericArg = {
  name: string
  constraint?: string
  defaultValue?: string
}

export type ParsedTypeDeclaration = {
  name: {
    original: string
    safe: string
    lax: string
  }
  args: SingleGenericArg[]
  body: string
}

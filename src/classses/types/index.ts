export type SafeOmit<T, K extends keyof T> = Omit<T, K>
export type SafePick<T, K extends keyof T> = Pick<T, K>

//

export type Generic = {
  name: string
  constraint?: string
  defaultValue?: string
}

export type ParsedTypeDeclaration = {
  name: string
  generics: Generic[]
  body: string
}

export type WithContext = { withContext: boolean }

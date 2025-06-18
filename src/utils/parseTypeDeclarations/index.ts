import { regexes } from "regexes"

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

export const parseTypeDeclaration = (_typeFunc: string): PARSED_TYPE_DECLARATION => {
  const typeFunc = _typeFunc.trim()
  const match = typeFunc.match(regexes.extractTypesAndValidations)

  if (!match) {
    throw new Error(`parseTypeDeclarations: Type function not found in type definition: ${typeFunc}`)
  }

  const name = match[1]
  const rawArgs = match[2].split(",")
  const body = match[3]

  if (!name) {
    throw new Error(`parseTypeDeclarations: Type function name not found in type definition: ${typeFunc}`)
  }
  if (!rawArgs) {
    throw new Error(`parseTypeDeclarations: Type function args not found in type definition: ${typeFunc}`)
  }
  if (!body) {
    throw new Error(`parseTypeDeclarations: Type function body not found in type definition: ${typeFunc}`)
  }

  const generics: GENERIC[] = []

  for (let i = 0; i < rawArgs.length; i++) {
    const arg = rawArgs[i]

    generics.push({
      name: arg.split("extends")[0].split("=")[0].trim(),
      constraint: arg.split("extends")[1]?.split("=")[0].trim(),
      defaultValue: arg.split("=")[1]?.trim(),
    })
  }

  return {
    name,
    generics,
    body,
  }
}

import { regexes } from "../../../../regexes"

export const extractTypeDeclarations = (typeFunc: string) => {
  const match = typeFunc.match(regexes.extractTypesAndValidations)

  if (!match) {
    throw new Error(
      `parseTypeFunction: Type function not found in type definition: ${typeFunc}`
    )
  }

  const typeFuncName = match[1]
  const typeFuncArgs = match[2]

  if (!typeFuncName) {
    throw new Error(
      `parseTypeFunction: Type function name not found in type definition: ${typeFunc}`
    )
  }
  if (!typeFuncArgs) {
    throw new Error(
      `parseTypeFunction: Type function args not found in type definition: ${typeFunc}`
    )
  }

  return {
    typeFuncName,
    typeFuncArgs,
  }
}

export const extractValidationsStatements = (generics: string) => {
  const genericsWithValidation = generics
    //
    .split(",")
    .map((arg) => arg.split("=")[0].trim())
    .filter((arg) => arg.includes("extends"))

  console.log("genericsWithValidation", genericsWithValidation)

  return genericsWithValidation
}

export const extractTypeArgsFromGenericDeclarations = (generics: string) => {
  const genericsWithoutValidation = generics
    .split(",")
    .map((arg) => arg.split("extends")[0].trim())
    .map((arg) => arg.split("=")[0].trim())

  console.log("genericsWithoutValidation", genericsWithoutValidation)

  return genericsWithoutValidation
}

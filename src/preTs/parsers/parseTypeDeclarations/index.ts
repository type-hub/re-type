import {
  extractTypeArgsFromGenericDeclarations,
  extractTypeDeclarations,
  extractValidationsStatements,
} from "./utils"

export const parseTypeFunction = (typeDef: string) => {
  const { typeFuncName, typeFuncArgs } = extractTypeDeclarations(typeDef)

  const typeArgs = extractTypeArgsFromGenericDeclarations(typeFuncArgs)
  const validations = extractValidationsStatements(typeFuncArgs)

  console.log("typeArgs", typeArgs)

  // const types = getAllTypesFromValidation(validations);
  // console.log("types", types);
  // console.log("typeArgs", typeArgs);
  // const typesList = typeArgs.join(", ")

  return {
    typeFuncName,
    typeArgs,
    validations,
    // typesList,
  }
}

// import { ReverseString as Algo } from '@algo'

import { parseTypeFunction } from "./parsers"
import { Either } from "./templates"

const importedTypeDef = `export type Algo<T extends any, U extends string = "", V extends number> = "algo logic here..."`
const exportedTypeDef = "export type ReverseString<T, U, V> = Algo<T, U, V>"
const yourValidationDef = "type ValidateArgs<T, U, V> = T"

// const exportedTypeDef = "export type ReverseString<T, U, V> = YourValidation<T,U,V>"

// const parseTypeDeclarations = (typeDef: string) => {
//   const regexExtractTypeAndValidations = /type ([\w$]*)<([^<>]*)>/ /// <([^<>]*)>/;
//   const match = typeDef.match(regexExtractTypeAndValidations)
//   const typeName = match?.[1] as unknown as string
//   const args = match?.[2] as unknown as string

//   const validations = getValidationsStatements(args)
//   const types = getAllTypesFromValidation(validations)
//   const typesList = types.join(", ")

//   return {
//     typeName,
//     validations,
//     types,
//     typesList,
//   }
// }

// UTILS ----------------------------------------------------------------

// const getValidationsStatements = (args: string) =>
//   args.split(",").map((arg) => arg.split("=")[0].trim())
// // .filter((arg) => arg.includes("extends"));

// TODO: this should become branded type
// const getTypeFromValidation = (arg: string) => {
//   return arg.split("extends")[0].trim()
// }

// const getAllTypesFromValidation = (arg: string[]) => {
//   return arg.map(getTypeFromValidation).filter(Boolean)
// }

//

// const buildTypeFuncInvocation = (typeDef: string) => {
//   const { typeName, validations } = parseTypeDeclarations(typeDef)

//   console.log(parseTypeDeclarations(typeDef))

//   return `${typeName}<${getAllTypesFromValidation(validations).join(", ")}>`
// }

// const buildPartialCondition = (
//   templateName: string,
//   validation: string,
//   code: string,
// ) =>
//   `${validation}
//   ? ${code}
//   : MismatchError<TX<C, "${templateName}-${getTypeFromValidation(
//     validation,
//   )}">, ${getTypeFromValidation(validation)}>`

// const buildConditional = (
//   typeInvocation: string,
//   templateName: string,
//   validations: string[],
// ) =>
//   validations.reduce(
//     (acc, v) => buildPartialCondition(templateName, v, acc),
//     typeInvocation,
//   )

// TEMPLATES ---------------------------------------------------------------

// function BackValidation(typeDef: string) {
//   const { validations, types } = parseTypeDeclarations(typeDef)

//   const conditional = buildConditional(
//     buildTypeFuncInvocation(typeDef),
//     BackValidation.name,
//     validations,
//   )

//   return `type ${BackValidation.name}<C extends string, ${types}> = ${conditional}`
// }

// BENEFIT: keep type argument names throught all funcs -> easy to track
// TODO: maybe replace TX with strait code?

// function Either(typeDef: string) {
//   const { typesList } = parseTypeDeclarations(typeDef)

//   return `type ${Either.name}<E, C extends string, ${typesList}> = [E] extends [never]
//   ? ${BackValidation.name}<${typesList}, TX<C, "${Either.name}">>
//   : E
// `
// }

const assertDeclarationsMatch = (
  a: string,
  b: string,
  validationTypeDef: string
) => {
  const removeTypeNamesFromValidations = (arr: string[]) =>
    arr.map((v) => v.replace(/\w+/, ""))

  const primary = parseTypeFunction(a)
  const secondary = parseTypeFunction(b)
  const validation = parseTypeFunction(validationTypeDef)

  const equalTypesAmount = [
    primary.types.length,
    secondary.types.length,
    validation.types.length,
  ].every((v, i, c) => v === c[0])
  const equalValidations =
    removeTypeNamesFromValidations(primary.validations) ===
    removeTypeNamesFromValidations(secondary.validations)

  const areTypeListExact = [
    primary.typesList,
    secondary.typesList,
    validation.typesList,
  ].every((v, i, c) => v === c[0])

  if (!equalTypesAmount) {
    throw new Error("mismatch: wrong amount of type arguments")
  }

  if (!areTypeListExact) {
    console.log(
      [primary, secondary, validation]
        .map((v) => `${v.typeName}<${v.typesList}>`)
        .join("\n")
    )
    throw new Error("docError: type arguments names does not match")
  }
}

// TODO: add validation -> alog input === validation input, throw Errors
function makeMainFunc(
  primaryTypeDef: string,
  secondaryTypeDef: string,
  validationTypeDef: string
) {
  const primary = parseTypeFunction(primaryTypeDef)
  const secondary = parseTypeFunction(secondaryTypeDef)

  return `type ${primary.typeName}<${primary.typesList}, C extends string = ""> = ${Either.name}<
  YourValidation<${primary.typesList}>,
  TX<C, "${primary.typeName}">,
  ${primary.typesList}>
>`
}

// BUILD --------------------------------------------------------------------

assertDeclarationsMatch(exportedTypeDef, importedTypeDef, yourValidationDef)

console.log(importedTypeDef)
console.log("\n")
console.log(b(importedTypeDef))
console.log("\n")
console.log(Either(importedTypeDef))
console.log("\n")
console.log(makeMainFunc(exportedTypeDef, importedTypeDef, yourValidationDef))

// const { typeName } = parseTypeDef(exportedTypeDef)
// console.log()

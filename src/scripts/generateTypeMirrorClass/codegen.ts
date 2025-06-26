import type { GENERIC, METHOD } from "./typeProcessing/types"
import { maybeRegisterConstraintImport } from "./utils/import"

export const generateParamsDeclaration = (generics: GENERIC[]): string =>
  generics
    .map(
      ({ name, constraint, defaultValue }) =>
        `${name}${constraint ? `: ${constraint}` : ""}${defaultValue ? ` = ${defaultValue}` : ""}`,
    )
    .join(", ")

export const generateParamsInterpolation = (generics: Pick<GENERIC, "name">[]): string =>
  generics.map((g) => `\${${g.name}}`).join(", ")

export const generateMethod = ({ name, generics }: METHOD): string => {
  const paramsDecl = generateParamsDeclaration(generics)
  const paramsInterp = generateParamsInterpolation(generics)

  generics.forEach(({ constraint }) => {
    maybeRegisterConstraintImport(constraint)
  })

  return `
  ${name}(${paramsDecl}): string { 
    return \`${name}<${paramsInterp}>\`
  }`
}

export const generateClassBody = (methods: METHOD[]): string => methods.map(generateMethod).join("\n")

export const generateOutput = (methods: METHOD[]): string =>
  `
  import type { ErrorsLookup } from "coreTypes/errors" // TODO: Hardcoded path, should be replaced with a dynamic import
  import type { BYPASS_MODES } from "coreTypes/validators" 
  

export class TypeUtils {
    ${generateClassBody(methods)}
  
}
  `

import type { METHOD } from "./typeProcessing/types"

export const generateParamsDeclaration = (
  generics: { name: string; constraint?: string; defaultValue?: string }[],
): string =>
  generics
    .map(
      ({ name, constraint, defaultValue }) =>
        `${name}${constraint ? `: ${constraint}` : ""}${defaultValue ? ` = ${defaultValue}` : ""}`,
    )
    .join(", ")

export const generateParamsInterpolation = (generics: { name: string }[]): string =>
  generics.map((g) => `\${${g.name}}`).join(", ")

export const generateMethod = ({ name, generics }: METHOD): string => {
  const paramsDecl = generateParamsDeclaration(generics)
  const paramsInterp = generateParamsInterpolation(generics)
  return `
  ${name}(${paramsDecl}): string { 
    return \`${name}<${paramsInterp}>\`
  }`
}

export const generateClassBody = (methods: METHOD[]): string => methods.map(generateMethod).join("\n")

export const generateOutput = (methods: METHOD[]): string =>
  `export class TypeUtils {
    ${generateClassBody(methods)}
  
  }
  `

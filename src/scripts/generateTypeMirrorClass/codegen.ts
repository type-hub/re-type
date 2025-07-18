import { ImportRegistry } from "services/ImportRegistry"
import { findTypeDeclarations } from "tsc"
import type { GENERIC, PARSED_TYPE_DECLARATION } from "utils/parseTypeDeclarations"
import { deconstructConstraint, isPrimitiveConstraint } from "./utils/import"

// import type { ErrorsLookup } from "coreTypes/errors" // TODO: Hardcoded path, should be replaced with a dynamic import
// import type { BYPASS_MODES } from "coreTypes/validators"

export const generateParamsDeclaration = (generics: GENERIC[]): string =>
  generics
    .map((g) => `${g.name}${g.constraint ? `: ${g.constraint}` : ""}${g.defaultValue ? ` = ${g.defaultValue}` : ""}`)
    // .map((g) => `${g.name}`) // ${g.constraint}`)
    .join(", ")

export const generateParamsInterpolation = (generics: GENERIC[]): string =>
  generics.map((g) => `\${${g.name}}`).join(", ")

export const generateMethod = ({ typeName, generics }: PARSED_TYPE_DECLARATION): string => {
  const paramsDecl = generateParamsDeclaration(generics)
  const paramsInterp = generateParamsInterpolation(generics)

  generics.forEach(({ constraint: _constraint }) => {
    if (_constraint) {
      const constraint = deconstructConstraint(_constraint)

      if (!isPrimitiveConstraint(constraint)) {
        ImportRegistry.addImport(constraint)
      }
    }
  })

  return `
  ${typeName}(${paramsDecl}): string {
    return \`${typeName}<${paramsInterp}>\`
  }`
}

export const generateClassBody = (methods: PARSED_TYPE_DECLARATION[]): string => methods.map(generateMethod).join("\n")

export const generateOutput = (methods: PARSED_TYPE_DECLARATION[]): string => {
  const utilClass = `export class TypeUtils {
    ${generateClassBody(methods)}
}`

  const imports = ImportRegistry.getImports()
  console.log("imports --->", imports)

  const declarations = findTypeDeclarations("./src", imports)

  console.log("declarations --->", declarations)

  return `
  ${declarations.join("\n")}
  ${utilClass}
  `
}

import type { SafeOmit } from "utilTypes"
import type { PARSED_TYPE_DECLARATION } from "../parseTypeDeclarations"

export const createJsDocs = ({ typeName: name, generics }: SafeOmit<PARSED_TYPE_DECLARATION, "body">): string => {
  const params = generics
    .map((generic) => {
      const defaultValue = generic.defaultValue ? `any, fallbacks to ${generic.defaultValue}` : "any"

      return `@template ${generic.name} - ${generic.constraint || defaultValue}`
    })
    .join("\n")

  // TODO: add name, description, example and link

  return `/**
# ${name}
${params}
*/`
}

import type { SafeOmit } from "utilTypes"
import type { PARSED_TYPE_DECLARATION } from "../parseTypeDeclarations"

export const createJsDocs = ({ name, generics }: SafeOmit<PARSED_TYPE_DECLARATION, "body">): string => {
  const params = generics
    .map((generic) => {
      const x = generic.defaultValue ? `any, fallbacks to ${generic.defaultValue}` : "any"

      return `@template ${generic.name} - ${generic.constraint ? `${generic.constraint}` : x}`
    })
    .join("\n")

  // TODO: add name, description, example and link

  return `/**
# ${name}
${params}
*/`
}

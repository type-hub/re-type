import type { Brand, SafeOmit } from "utilTypes"
import type { PARSED_TYPE_DECLARATION } from "../parseTypeDeclarations"

export type JS_DOCS = Brand<string, "JsDocs">

export const createJsDocs = ({ typeName: name, generics }: SafeOmit<PARSED_TYPE_DECLARATION, "body">): JS_DOCS => {
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
*/` as JS_DOCS
}

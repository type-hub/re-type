import { ParsedTypeDeclaration, SafeOmit } from "../types"

export class JSDocGenerator {
  public document({ name, generics }: SafeOmit<ParsedTypeDeclaration, "body">) {
    const params = generics.map((generic) => {
      return `@template ${generic.name} - ${generic.constraint ? `${generic.constraint}` : "any"}`
    })

    return `/**
# ${name}
// TODO: add name, description, example and link
${params.join("\n")}
*/`
  }
}

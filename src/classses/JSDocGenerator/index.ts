import { SafeOmit } from "../../typeUtils"
import { PARSED_TYPE_DECLARATION } from "../utils/parseTypeDeclarations"

export class JSDocGenerator {
  public document({ name, generics }: SafeOmit<PARSED_TYPE_DECLARATION, "body">) {
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

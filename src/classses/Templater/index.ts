import { SafeOmit } from "../../typeUtils"
import { WITH_CONTEXT } from "../types"
import { createJsDocs } from "../utils/createJsDocs"
import { resolveGenerics } from "../utils/generics"
import { PARSED_TYPE_DECLARATION } from "../utils/parseTypeDeclarations"
import { either } from "./either"
import { template } from "./templates"

type InlineTemplateData = {
  name: string
  body: string
}

export { template } from "./templates"

export class Templater {
  constructor() {}

  // declaration yes, invocation no, still missing

  public strictTypeDeclaration({
    name,
    generics: _generics,
    body,
    withContext,
  }: WITH_CONTEXT & PARSED_TYPE_DECLARATION): string {
    const generics = resolveGenerics({ withContext, generics: _generics })

    return template.typeDeclaration({
      docs: createJsDocs({ name, generics }),
      name,
      genericsDeclarations: template.genericArgsDeclaration({ generics }),
      body,
    })
  }

  public laxTypeDeclaration({
    name,
    generics: _generics,
    body,
    withContext,
  }: WITH_CONTEXT & PARSED_TYPE_DECLARATION): string {
    const generics = resolveGenerics({ withContext, generics: _generics })

    return template.typeDeclaration({
      docs: createJsDocs({ name, generics }),
      name,
      genericsDeclarations: template.genericArgsDeclaration({ lax: true, generics }),
      body,
    })
  }

  // class?

  public eitherTypeDeclaration({ name, generics }: SafeOmit<PARSED_TYPE_DECLARATION, "body">) {
    return either.typeDeclaration({ name, generics })
  }

  public eitherTypeInvocation({ name, generics }: SafeOmit<PARSED_TYPE_DECLARATION, "body">) {
    return either.typeInvocation({ name, generics })
  }

  // TODO: do we need this one?

  public renderInline({ name, body }: InlineTemplateData) {
    return (
      // prettier-ignore
      `
  // --- ${name} START ---
    ${body}
  // --- ${name} END ---`
    )
  }
}

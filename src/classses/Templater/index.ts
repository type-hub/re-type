import { SafeOmit } from "../../typeUtils"
import { TypeBuilder } from "../TypeBuilder"
import { WITH_CONTEXT } from "../types"
import { createJsDocs } from "../utils/createJsDocs"
import { resolveGenerics } from "../utils/generics"
import { PARSED_TYPE_DECLARATION } from "../utils/parseTypeDeclarations"
import { Either } from "./either"

type InlineTemplateData = {
  name: string
  body: string
}

export class Templater {
  constructor(private typeBuilder: TypeBuilder, private either: Either) {}

  // declaration yes, invocation no, still missing

  public strictTypeDeclaration({
    name,
    generics: _generics,
    body,
    withContext,
  }: WITH_CONTEXT & PARSED_TYPE_DECLARATION): string {
    const generics = resolveGenerics({ withContext, generics: _generics })

    return this.typeBuilder.createTypeDeclaration({
      docs: createJsDocs({ name, generics }),
      name,
      genericsDeclarations: this.typeBuilder.createGenericArgsDeclaration({ generics }),
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

    return this.typeBuilder.createTypeDeclaration({
      docs: createJsDocs({ name, generics }),
      name,
      genericsDeclarations: this.typeBuilder.createGenericArgsDeclaration({ lax: true, generics }),
      body,
    })
  }

  // class?

  public eitherTypeDeclaration({ name, generics: _generics }: SafeOmit<PARSED_TYPE_DECLARATION, "body">) {
    return this.either.eitherTypeDeclaration({ name, generics: _generics })
  }

  public eitherTypeInvocation({ name, generics: _generics }: SafeOmit<PARSED_TYPE_DECLARATION, "body">) {
    return this.either.eitherTypeInvocation({ name, generics: _generics })
  }

  // do we need this one?

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

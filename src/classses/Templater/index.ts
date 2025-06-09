import { SafeOmit } from "../../typeUtils"
import { JSDocGenerator } from "../JSDocGenerator"
import { TypeBuilder } from "../TypeBuilder"
import { PARSED_TYPE_DECLARATION } from "../typeParser"
import { WITH_CONTEXT } from "../types"
import { resolveGenerics } from "../utils"

type InlineTemplateData = {
  name: string
  body: string
}

export class Templater {
  constructor(private jsDoc: JSDocGenerator, private typeBuilder: TypeBuilder) {}

  public laxTypeDeclaration({
    name,
    generics: _generics,
    body,
    withContext,
  }: WITH_CONTEXT & PARSED_TYPE_DECLARATION): string {
    const generics = resolveGenerics({ withContext, generics: _generics })

    return this.typeBuilder.createTypeDeclaration({
      docs: this.jsDoc.document({ name, generics }),
      name,
      genericsDeclarations: this.typeBuilder.createGenericArgsDeclaration({ lax: true, generics }),
      body,
    })
  }

  public eitherTypeDeclaration({ name, generics: _generics }: SafeOmit<PARSED_TYPE_DECLARATION, "body">) {
    const genericsWithoutError = resolveGenerics({ withContext: true, generics: _generics })
    const typeInvocation = this.typeBuilder.createTypeInvocation({ name, generics: genericsWithoutError })

    const typeName = `Either_${name}`

    const typeDef = `[_Error] extends [never]
  ? ${typeInvocation}
  : _Error`

    const generics = resolveGenerics({ withContext: true, withError: true, generics: _generics })
    const docs = this.jsDoc.document({ name: typeName, generics })

    return this.typeBuilder.createTypeDeclaration({
      docs,
      name: typeName,
      genericsDeclarations: this.typeBuilder.createGenericArgsDeclaration({ generics, lax: true }), // remove lax, error and context should have validation
      body: typeDef,
    })
  }

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

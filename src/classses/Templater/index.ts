import { SafeOmit } from "../../typeUtils"
import { TypeBuilder } from "../TypeBuilder"
import { WITH_CONTEXT } from "../types"
import { createJsDocs } from "../utils/createJsDocs"
import { resolveGenerics } from "../utils/generics"
import { PARSED_TYPE_DECLARATION } from "../utils/parseTypeDeclarations"

type InlineTemplateData = {
  name: string
  body: string
}

export class Templater {
  constructor(private typeBuilder: TypeBuilder) {}

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
    const genericsWithoutError = resolveGenerics({ withContext: true, generics: _generics })
    const typeInvocation = this.typeBuilder.createTypeInvocation({ name, generics: genericsWithoutError })

    const typeName = `Either_${name}`

    const typeDef = `[_Error] extends [never]
  ? ${typeInvocation}
  : _Error`

    const generics = resolveGenerics({ withContext: true, withError: true, generics: _generics })
    const docs = createJsDocs({ name: typeName, generics })

    return this.typeBuilder.createTypeDeclaration({
      docs,
      name: typeName,
      genericsDeclarations: this.typeBuilder.createGenericArgsDeclaration({ generics, lax: true }), // remove lax, error and context should have validation
      body: typeDef,
    })
  }

  public eitherTypeInvocation({ name, generics: _generics }: SafeOmit<PARSED_TYPE_DECLARATION, "body">) {
    const generics = resolveGenerics({ withContext: true, generics: _generics })
    const typeName = `Either_${name}_Lax`

    const genericsInvocation = this.typeBuilder.createGenericArgsInvocation(generics)

    // todo: resolve either name
    const typeDef = `${typeName}<
  Validate$<[${genericsInvocation}]>,
  ${genericsInvocation},
>`

    return typeDef

    // return this.typeBuilder.createTypeInvocation({
    //   name: typeName,
    //   generics,
    // })
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

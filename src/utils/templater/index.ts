import { createJsDocs } from "utils/createJsDocs"
import { PARSED_TYPE_DECLARATION } from "utils/parseTypeDeclarations"
import { resolveGenerics, WITH_CONTEXT } from "utils/resolveGenerics"
import { either } from "./either"
import { typeBuilder } from "./typeBuilder"

type InlineTemplateData = {
  name: string
  body: string
}

export { typeBuilder as template } from "./typeBuilder"

export const templater = {
  either,
  strict: {
    // declaration yes, invocation no, still missing

    typeDeclaration: ({
      name,
      generics: _generics,
      body,
      withContext,
    }: WITH_CONTEXT & PARSED_TYPE_DECLARATION): string => {
      const generics = resolveGenerics({ withContext, generics: _generics })

      return typeBuilder.typeDeclaration({
        docs: createJsDocs({ name, generics }),
        name,
        genericsDeclarations: typeBuilder.genericArgsDeclaration({ generics }),
        body,
      })
    },
  },
  lax: {
    typeDeclaration: ({
      name,
      generics: _generics,
      body,
      withContext,
    }: WITH_CONTEXT & PARSED_TYPE_DECLARATION): string => {
      const generics = resolveGenerics({ withContext, generics: _generics })

      return typeBuilder.typeDeclaration({
        docs: createJsDocs({ name, generics }),
        name,
        genericsDeclarations: typeBuilder.genericArgsDeclaration({ lax: true, generics }),
        body,
      })
    },
  },

  // TODO: do we need this one?

  renderInline: ({ name, body }: InlineTemplateData) => {
    return (
      // prettier-ignore
      `
  // --- ${name} START ---
    ${body}
  // --- ${name} END ---`
    )
  },
}

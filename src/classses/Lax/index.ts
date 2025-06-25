import { resolveEitherName, resolveLaxName } from "classses/utils"
import { prop } from "ramda"
import { createJsDocs } from "utils/createJsDocs"
import type { PARSED_TYPE_DECLARATION } from "utils/parseTypeDeclarations"
import { parseTypeDeclaration } from "utils/parseTypeDeclarations"
import type { WITH_CONTEXT } from "utils/resolveGenerics"
import { resolveGenerics } from "utils/resolveGenerics"
import { typeBuilder } from "utils/typeBuilder"
import type { WITH_COMMENTS } from "../types"

export class Lax {
  protected parsedType: PARSED_TYPE_DECLARATION

  constructor(typeDef: string) {
    this.parsedType = parseTypeDeclaration(typeDef)
  }

  public typeDeclaration({ withContext }: WITH_CONTEXT): string {
    const generics = resolveGenerics({ withContext, generics: this.parsedType.generics })
    const name = resolveLaxName(this.parsedType.name)
    const docs = createJsDocs({ name, generics })
    const genericsDeclarations = typeBuilder.genericArgsDeclaration({ lax: true, generics })
    const body = this.makeLaxBody({ withContext: false, withComments: false }) //fix optional params

    return typeBuilder.typeDeclaration({
      docs,
      name,
      genericsDeclarations,
      body,
    })
  }

  public eitherTypeDeclaration({ withContext }: WITH_CONTEXT): string {
    const targetTypeName = resolveLaxName(this.parsedType.name)
    const typeName = resolveEitherName(targetTypeName)
    const genericsWithError = resolveGenerics({
      withContext,
      withError: true,
      generics: this.parsedType.generics,
    })
    const genericsWithoutError = resolveGenerics({ withContext, generics: this.parsedType.generics })
    const docs = createJsDocs({ name: typeName, generics: genericsWithError })
    const genericsDeclarations = typeBuilder.genericArgsDeclaration({ generics: genericsWithError, lax: true }) // remove lax, error and context should have validation

    const typeInvocation = typeBuilder.typeInvocation({
      name: targetTypeName,
      generics: genericsWithoutError,
      parentName: typeName,
    })

    const body = `[_Error] extends [never]
  ? ${typeInvocation}
  : _Error`

    return typeBuilder.typeDeclaration({
      docs,
      name: typeName,
      genericsDeclarations,
      body,
    })
  }

  // --- PROTECTED ----------------------------------------------------------------------

  protected makeLaxBody({ withContext, withComments }: WITH_COMMENTS & WITH_CONTEXT): string {
    // TODO: mismatch error could be more detailed and reuse validation (what it should be)
    // TODO: inside validation missing (before return)

    const { generics, name } = this.parsedType
    const laxName = resolveLaxName(name)

    // TODO: move to utils to templater?
    const conditionalTypeBody = generics
      //
      .filter(prop("constraint"))
      .reverse()
      .reduce(
        //
        typeBuilder.relaxConstraints(laxName),
        typeBuilder.typeInvocation({
          name,
          generics: resolveGenerics({ withContext, generics }),
          // parentName: "laxName",
        }),
      )

    if (withComments) {
      return (
        // prettier-ignore
        `
    // --- ${laxName} START ---
      ${conditionalTypeBody}
    // --- ${laxName} END ---`
      )
    }

    return conditionalTypeBody
  }
}

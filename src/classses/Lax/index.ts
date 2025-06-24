import { resolveEitherName, resolveLaxName } from "classses/utils"
import { prop } from "ramda"
import { createJsDocs } from "utils/createJsDocs"
import { PARSED_TYPE_DECLARATION, parseTypeDeclaration } from "utils/parseTypeDeclarations"
import { resolveGenerics, WITH_CONTEXT } from "utils/resolveGenerics"
import { typeBuilder } from "utils/typeBuilder"
import { WITH_COMMENTS } from "../types"

export class Lax {
  protected parsedType: PARSED_TYPE_DECLARATION

  constructor(typeDef: string) {
    this.parsedType = parseTypeDeclaration(typeDef)
  }

  public typeDeclaration({ withContext }: WITH_CONTEXT) {
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

  public eitherTypeDeclaration({ withContext }: WITH_CONTEXT) {
    // const x = templater.either.typeDeclaration({
    //   name: resolveLaxName(name),
    //   generics,
    // })

    const targetTypeName = resolveLaxName(this.parsedType.name)
    const typeName = resolveEitherName(targetTypeName)
    const genericsWithError = resolveGenerics({
      withContext: true,
      withError: true,
      generics: this.parsedType.generics,
    })
    const genericsWithoutError = resolveGenerics({ withContext: true, generics: this.parsedType.generics })
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

  // TODO: dead code?
  public inlineInvocation({ withContext }: WITH_CONTEXT) {
    return this.makeLaxBody({ withContext, withComments: true })
  }

  // --- PROTECTED ----------------------------------------------------------------------

  protected makeLaxBody({ withContext, withComments }: WITH_CONTEXT & WITH_COMMENTS) {
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

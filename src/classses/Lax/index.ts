import { prop } from "ramda"
import { PARSED_TYPE_DECLARATION, parseTypeDeclaration } from "utils/parseTypeDeclarations"
import { resolveGenerics, WITH_CONTEXT } from "utils/resolveGenerics"
import { templater } from "utils/templater"
import { typeBuilder } from "utils/templater/typeBuilder"
import { AbstractTypeBuilder } from "../Abstract"
import { WITH_COMMENTS } from "../types"
import { resolveLaxName } from "./utils"

export * from "./utils"

export class Lax extends AbstractTypeBuilder {
  protected withContext: boolean

  protected parsedType: PARSED_TYPE_DECLARATION

  constructor(
    //
    typeDef: string,
    withContext?: boolean,
  ) {
    super()

    this.withContext = !!withContext
    this.parsedType = parseTypeDeclaration(typeDef)
  }

  public typeDeclaration() {
    return templater.lax.typeDeclaration({
      name: resolveLaxName(this.parsedType.name),
      generics: this.parsedType.generics,
      body: this.makeLaxBody({ withContext: false, withComments: false }),
      withContext: this.withContext,
    })
  }

  public inlineInvocation() {
    return this.makeLaxBody({ withContext: false, withComments: true })
  }

  public eitherTypeDeclaration() {
    const {
      parsedType: { generics, name },
    } = this

    return templater.either.typeDeclaration({
      name: resolveLaxName(name),
      generics,
    })
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
          parentName: laxName,
          generics: resolveGenerics({ withContext, generics }),
        }),
      )

    if (withComments) {
      return templater.renderInline({
        name: laxName,
        body: conditionalTypeBody,
      })
    }

    return conditionalTypeBody
  }
}

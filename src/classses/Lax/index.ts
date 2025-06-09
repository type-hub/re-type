import { prop } from "ramda"
import { AbstractTypeBuilder } from "../abstract"
import { Templater } from "../Templater"
import { TypeBuilder } from "../TypeBuilder"
import { WITH_COMMENTS, WITH_CONTEXT } from "../types"
import { resolveGenerics } from "../utils/generics"
import { PARSED_TYPE_DECLARATION, parseTypeDeclaration } from "../utils/parseTypeDeclarations"

export class Lax extends AbstractTypeBuilder {
  protected withContext: boolean

  protected get laxName() {
    return `${this.parser.name}_Lax`
  }

  protected parser: PARSED_TYPE_DECLARATION

  constructor(
    //
    typeDef: string,
    private templater: Templater,
    private typeBuilder: TypeBuilder,
    withContext?: boolean,
  ) {
    super()

    this.withContext = !!withContext
    this.parser = parseTypeDeclaration(typeDef)
  }

  public typeDeclaration() {
    return this.templater.laxTypeDeclaration({
      name: this.laxName,
      generics: this.parser.generics,
      body: this.makeLaxBody({ withContext: false, withComments: false }),
      withContext: this.withContext,
    })
  }

  public inlineInvocation() {
    return this.makeLaxBody({ withContext: false, withComments: true })
  }

  public eitherTypeDeclaration() {
    const {
      laxName: name,
      parser: { generics },
    } = this

    return this.templater.eitherTypeDeclaration({
      name,
      generics,
    })
  }

  // --- PROTECTED ----------------------------------------------------------------------

  protected makeLaxBody({ withContext, withComments }: WITH_CONTEXT & WITH_COMMENTS) {
    // TODO: mismatch error could be more detailed and reuse validation (what it should be)
    // TODO: inside validation missing (before return)

    const { generics, name } = this.parser

    // TODO: move to utils to templater?
    const conditionalTypeBody = generics
      //
      .filter(prop("constraint"))
      .reverse()
      .reduce(
        //
        this.typeBuilder.convertGenericToConditional(this.laxName),
        this.typeBuilder.createTypeInvocation({
          name,
          generics: resolveGenerics({ withContext, generics }),
        }),
      )

    if (withComments) {
      return this.templater.renderInline({
        name: this.laxName,
        body: conditionalTypeBody,
      })
    }

    return conditionalTypeBody
  }
}

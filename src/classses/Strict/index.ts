import { resolveLaxName } from "classses/Lax"
import { resolveStrictLaxName } from "classses/utils"
import { PARSED_TYPE_DECLARATION, parseTypeDeclaration } from "utils/parseTypeDeclarations"
import { WITH_CONTEXT } from "utils/resolveGenerics"
import { templater } from "utils/templater"
import { WITH_COMMENTS } from "../types"
import { resolveStrictName } from "./utils"

export class Strict {
  protected withContext: boolean
  protected parsedType: PARSED_TYPE_DECLARATION

  constructor(
    //
    typeDef: string,
    withContext?: boolean,
  ) {
    this.withContext = !!withContext
    this.parsedType = parseTypeDeclaration(typeDef)
  }

  public laxTypeDeclaration() {
    // TODO: lax or strict - which one is correct?
    // return templater.strict.typeDeclaration({
    return templater.lax.typeDeclaration({
      name: resolveStrictLaxName(this.parsedType.name),
      generics: this.parsedType.generics,
      body: this.makeStrictBody({ withContext: false, withComments: false }),
      withContext: this.withContext,
    })
  }

  public inlineInvocation() {
    return this.makeStrictBody({ withContext: false, withComments: true })
  }

  public eitherTypeDeclaration() {
    const {
      parsedType: { generics, name },
    } = this

    return templater.either.typeDeclaration({
      name: resolveStrictName(name),
      generics,
    })
  }

  protected makeStrictBody({ withContext, withComments }: WITH_CONTEXT & WITH_COMMENTS) {
    // TODO: mismatch error could be more detailed and reuse validation (what it should be)
    // TODO: inside validation missing (before return)
    const { generics } = this.parsedType

    // todo: resolve either name
    // const typeDef = `Either_${this.parsedType.name}<

    return templater.either.typeInvocation({ name: resolveLaxName(this.parsedType.name), generics })
  }
}

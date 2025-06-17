import { Templater } from "../Templater"
import { WITH_COMMENTS, WITH_CONTEXT } from "../types"
import { PARSED_TYPE_DECLARATION, parseTypeDeclaration } from "../utils/parseTypeDeclarations"

export class Strict {
  protected withContext: boolean

  protected get strictName() {
    return `${this.parsedType.name}_Strict`
  }

  protected parsedType: PARSED_TYPE_DECLARATION

  constructor(
    //
    typeDef: string,
    private templater: Templater,
    withContext?: boolean,
  ) {
    this.withContext = !!withContext
    this.parsedType = parseTypeDeclaration(typeDef)
  }

  public typeDeclaration() {
    return this.templater.strictTypeDeclaration({
      name: this.strictName,
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
      strictName: name,
      parsedType: { generics },
    } = this

    return this.templater.eitherTypeDeclaration({
      name,
      generics,
    })
  }

  protected makeStrictBody({ withContext, withComments }: WITH_CONTEXT & WITH_COMMENTS) {
    // TODO: mismatch error could be more detailed and reuse validation (what it should be)
    // TODO: inside validation missing (before return)
    const { generics } = this.parsedType

    // todo: resolve either name
    // const typeDef = `Either_${this.parsedType.name}<

    return this.templater.eitherTypeInvocation({ name: this.parsedType.name, generics })
  }
}

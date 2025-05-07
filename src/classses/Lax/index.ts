import { prop } from "ramda"
import { AbstractTypeBuilder } from "../abstract"
import { Templater } from "../Templater"
import { TypeParser } from "../typeParser"
import { resolveGenerics } from "../utils"

export class Lax extends AbstractTypeBuilder {
  protected withContext: boolean

  constructor(private parser: TypeParser, private templater: Templater, withContext?: boolean) {
    super()

    this.withContext = !!withContext
  }

  // --- PUBLIC ---

  public define() {
    return this.templater.define({
      name: this.name,
      generics: this.parser.generics,
      body: this.makeBody({ withContext: false, withComments: false }),
      withContext: this.withContext,
    })
  }

  public inline() {
    return this.makeBody({ withContext: false, withComments: true })
  }

  // --- PROTECTED ---

  protected get name() {
    return `${this.parser.name}_Lax`
  }

  protected makeBody({ withContext, withComments }: { withContext: boolean; withComments: boolean }) {
    // TODO: mismatch error could be more detailed and reuse validation (what it should be)
    // TODO: inside validation missing (before return)

    const generics = this.parser.generics

    const invocationConfig = {
      name: this.parser.name,
      generics: resolveGenerics({ withContext, generics }),
    }

    // TODO: move to utils to templater?
    const conditionalTypeBody = generics
      //
      .filter(prop("constraint"))
      .reverse()
      .reduce(
        //
        this.templater.renderConditionalBody(this.name),
        this.templater.renderTypeInvocation(invocationConfig),
      )

    if (withComments) {
      return this.templater.renderInline({
        name: this.name,
        body: conditionalTypeBody,
      })
    }

    return conditionalTypeBody
  }
}

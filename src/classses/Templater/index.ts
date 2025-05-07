import { prop } from "ramda"
import { JSDocGenerator } from "../JSDocGenerator"
import { TypeErrorTemplate } from "../TypeError"
import { Generic, ParsedTypeDeclaration, SafeOmit, SafePick, WithContext } from "../types"
import { resolveGenerics } from "../utils"

type InlineTemplateData = {
  name: string
  body: string
}

export class Templater {
  constructor(private jsDoc: JSDocGenerator, private typeError: TypeErrorTemplate) {}

  // public trace(withID: boolean, currentContext: string, genericName: string) {
  //   const context = `${"${" + CONTEXT + "}"}`

  //   return `\`${context}->${currentContext}->${genericName}${withID ? `::${uuid()}` : ""}\``
  // }

  // TODO: move to separate error class (invoke, inline)
  public mismatchError(withID: boolean, currentFunc: string, currentArg: string) {
    // TODO: use trace inside error, Error<Context, Func, Arg, Id>
    // return `MismatchError<${this.trace(withID, a, b)}, ${b}>`
    // g.name, g.constrain, g.currentValue
    // return `TypeError<${CONTEXT}, '${currentFunc}', '${currentArg}', ${currentArg}${withID ? `, '${uuid()}'` : ""} >`
    return this.typeError.newMismatchError({ withID, currentFunc, currentArg })
  }

  public define({ name, generics, body, withContext }: WithContext & ParsedTypeDeclaration) {
    const _generics = resolveGenerics({ withContext, generics })

    return `
${this.jsDoc.document({ name, generics: _generics })}
type ${name}<${this.renderGenericArgsDefinition({ generics: _generics })}> = ${body}`
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

  public renderTypeInvocation({ name, generics }: SafeOmit<ParsedTypeDeclaration, "body">) {
    return `${name}<${this.renderGenericArgsDefinition({ generics })}>`
  }

  public renderGenericArgsDefinition({ generics }: SafePick<ParsedTypeDeclaration, "generics">) {
    return generics.map(prop("name")).join(", ")
  }

  //: MismatchError<Trace<${CONTEXT}, "${baseTypeName}-${generic.name}-${uuid()}">, ${generic.name}>
  //   : MismatchError<${this.trace(true, baseTypeName, generic.name)}, ${generic.name}>

  public renderConditionalBody = (baseTypeName: string) => (generatedCode: string, generic: Generic) =>
    // prettier-ignore
    `${generic.name} extends ${generic.constraint}
  ? ${generatedCode}
  : ${this.typeError.newMismatchError({ withID: true, currentFunc: baseTypeName, currentArg: generic.name})}  `

  // TODO: context
  // public renderEitherType() {
  //   return (
  //     // prettier-ignore
  //     // ? ${this.buildConditionalTypeBody()}
  //     // this.buildLaxTypeInvocation()

  //     `type Either${name.lax}<_Error, ${CONTEXT_DECLARATION},  ${this.buildGenericTypesInvocation()}> = [_Error] extends [never]
  //   ? ${this.buildLaxTypeInvocationWithContext()}
  //   : _Error`
  //   )
  // }
}

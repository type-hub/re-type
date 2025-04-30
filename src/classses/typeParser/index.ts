import { prop } from "ramda"
import { ParsedTypeDeclaration, SingleGenericArg } from "./types"
import { parseTypeDeclarations } from "./utils"

export class TypeParser {
  private readonly CONTEXT: "CONTEXT"
  private typeDeclaration: string
  private parsedTypeDeclaration: ParsedTypeDeclaration

  constructor(typeDeclaration: string) {
    this.CONTEXT = "CONTEXT"
    this.typeDeclaration = typeDeclaration.trim()
    this.parsedTypeDeclaration = parseTypeDeclarations(this.typeDeclaration)
  }

  // --- PUBLIC ----------------------------------------------------

  public getTypeDeclaration(): typeof this.typeDeclaration {
    return this.typeDeclaration
  }

  public getParsedTypeDeclaration() {
    return this.parsedTypeDeclaration
  }

  public getRelaxedVariant() {
    const { name, args } = this.parsedTypeDeclaration

    const resolveDefaultValue = (defaultValue?: string) => `${defaultValue ? `= ${defaultValue}` : ""}`

    const genericTypesDeclarations = args
      .map(({ name, defaultValue }) => `${name} ${resolveDefaultValue(defaultValue)}`)
      .join(", ")

    // prettier-ignore
    return `type ${name.lax}<${this.CONTEXT} extends string, ${genericTypesDeclarations}> = ${this.buildConditionalTypeBody()}`
  }

  // --- PRIVATE ---------------------------------------------------

  private buildConditionalTypeBody() {
    // TODO: mismatch error could more detailed and reuse validation (what it should be)
    // TODO: inside validation missing (before return)

    const { args, name } = this.parsedTypeDeclaration

    const buildPartialCondition = (
      generatedCode: string,
      arg: SingleGenericArg,
    ) => `${arg.name} extends ${arg.constraint}
  ? ${generatedCode}
  : MismatchError<Trace<${this.CONTEXT}, "${name.lax}-${arg.name}">, ${arg.name}>`

    const typeInvocation = `${name.original}<${args.map(prop("name")).join(", ")}>`

    return (
      args
        //
        .filter(prop("constraint"))
        .reverse()
        .reduce(buildPartialCondition, typeInvocation)
    )
  }
}

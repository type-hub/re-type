import { ReTypeErrorTemplate } from "../ReTypeError"
import { GENERIC } from "../utils/parseTypeDeclarations"

// TODO: convert to func
export class TypeBuilder {
  constructor(private reTypeError: ReTypeErrorTemplate) {}

  public convertGenericToConditional = (baseTypeName: string) => (injectedCode: string, generic: GENERIC) =>
    // prettier-ignore
    `${generic.name} extends ${generic.constraint}
  ? ${injectedCode}
  : ${this.reTypeError.MismatchError({
    withID: true,
    currentFunc: baseTypeName,
    generic,
  })}`
}

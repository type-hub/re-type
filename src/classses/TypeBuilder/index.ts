import { ReTypeErrorTemplate } from "../ReTypeError"
import { GENERIC } from "../utils/parseTypeDeclarations"
import {
  createGenericArgsDeclaration,
  createGenericArgsInvocation,
  createTypeDeclaration,
  createTypeInvocation,
} from "./utils"

export class TypeBuilder {
  constructor(private reTypeError: ReTypeErrorTemplate) {}

  public createGenericArgsDeclaration(props: Parameters<typeof createGenericArgsDeclaration>[0]) {
    return createGenericArgsDeclaration(props)
  }

  public createGenericArgsInvocation(props: Parameters<typeof createGenericArgsInvocation>[0]) {
    return createGenericArgsInvocation(props)
  }

  public createTypeDeclaration(props: Parameters<typeof createTypeDeclaration>[0]) {
    return createTypeDeclaration(props)
  }

  public createTypeInvocation(props: Parameters<typeof createTypeInvocation>[0]) {
    return createTypeInvocation(props)
  }

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

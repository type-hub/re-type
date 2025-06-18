import { GENERIC } from "utils/parseTypeDeclarations"
import { reTypeError } from "utils/reTypeError"

export const relaxConstraints = (baseTypeName: string) => (injectedCode: string, generic: GENERIC) =>
  // prettier-ignore
  `${generic.name} extends ${generic.constraint}
    ? ${injectedCode}
    : ${reTypeError.MismatchError({
      withID: true,
      currentFunc: baseTypeName,
      generic,
    })}`

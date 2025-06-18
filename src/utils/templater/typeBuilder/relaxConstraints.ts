import { ImportRegistry } from "services/ImportRegistry"
import { GENERIC } from "utils/parseTypeDeclarations"
import { reTypeError } from "utils/reTypeError"

export const relaxConstraints = (baseTypeName: string) => (injectedCode: string, generic: GENERIC) => {
  const MismatchError = "MismatchError"
  ImportRegistry.addImport(MismatchError)

  // prettier-ignore
  return `${generic.name} extends ${generic.constraint}
    ? ${injectedCode}
    : ${reTypeError[MismatchError]({
      withID: true,
      currentFunc: baseTypeName,
      generic,
    })}`
}

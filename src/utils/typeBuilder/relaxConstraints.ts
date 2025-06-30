import { ImportRegistry } from "services/ImportRegistry"
import type { GENERIC } from "utils/parseTypeDeclarations"
import { reTypeError } from "utils/reTypeError"
import type { CurrentTypeName } from "utils/reTypeError/trace"

export const relaxConstraints = (currentTypeName: CurrentTypeName) => (injectedCode: string, generic: GENERIC) => {
  const MismatchError = "MismatchError"
  ImportRegistry.addImport(MismatchError)

  // prettier-ignore
  return `${generic.name} extends ${generic.constraint}
    ? ${injectedCode}
    : ${reTypeError[MismatchError]({
      withID: true,
      currentTypeName,
      generic,
    })}`
}

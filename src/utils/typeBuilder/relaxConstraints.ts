import { ImportRegistry } from "services/ImportRegistry"
import { GENERIC } from "utils/parseTypeDeclarations"
import { reTypeError } from "utils/reTypeError"
import { ParentName } from "utils/reTypeError/trace"

export const relaxConstraints = (parentName: ParentName["parentName"]) => (injectedCode: string, generic: GENERIC) => {
  const MismatchError = "MismatchError"
  ImportRegistry.addImport(MismatchError)

  // prettier-ignore
  return `${generic.name} extends ${generic.constraint}
    ? ${injectedCode}
    : ${reTypeError[MismatchError]({
      withID: true,
      parentName,
      generic,
    })}`
}

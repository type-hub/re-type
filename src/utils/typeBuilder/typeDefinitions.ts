import type { SafeOmit } from "utilTypes"
import type { PARSED_TYPE_DECLARATION } from "utils/parseTypeDeclarations"
import type { CurrentTypeName } from "utils/reTypeError/trace"
import { genericArgsInvocation } from "./genericArgs"

export const typeDeclaration = ({
  docs,
  typeName,
  genericsDeclarations,
  body,
}: {
  docs: string
  typeName: string
  genericsDeclarations: string
  body: string
}): string => `${docs}
type ${typeName}<${genericsDeclarations}> = ${body}`

type Props = SafeOmit<PARSED_TYPE_DECLARATION, "body"> & { currentTypeName?: CurrentTypeName }

export const typeInvocation = ({ typeName, generics, currentTypeName }: Props): string =>
  `${typeName}<${genericArgsInvocation(generics, currentTypeName)}>`

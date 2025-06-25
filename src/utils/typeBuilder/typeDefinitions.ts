import type { SafeOmit } from "utilTypes"
import type { PARSED_TYPE_DECLARATION } from "utils/parseTypeDeclarations"
import type { ParentName } from "utils/reTypeError/trace"
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

type Props = Partial<ParentName> & SafeOmit<PARSED_TYPE_DECLARATION, "body">

export const typeInvocation = ({ typeName, generics, parentName }: Props): string =>
  `${typeName}<${genericArgsInvocation(generics, parentName)}>`

import type { SafeOmit } from "utilTypes"
import type { PARSED_TYPE_DECLARATION } from "utils/parseTypeDeclarations"
import type { ParentName } from "utils/reTypeError/trace"
import { genericArgsInvocation } from "./genericArgs"

export const typeDeclaration = ({
  docs,
  name,
  genericsDeclarations,
  body,
}: {
  docs: string
  name: string
  genericsDeclarations: string
  body: string
}): string => `${docs}
type ${name}<${genericsDeclarations}> = ${body}`

type Props = Partial<ParentName> & SafeOmit<PARSED_TYPE_DECLARATION, "body">

export const typeInvocation = ({ name, generics, parentName }: Props): string =>
  `${name}<${genericArgsInvocation(generics, parentName)}>`

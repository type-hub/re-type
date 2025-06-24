import { SafeOmit } from "utilTypes"
import { PARSED_TYPE_DECLARATION } from "utils/parseTypeDeclarations"
import { ParentName } from "utils/reTypeError/trace"
import { genericArgsInvocation } from "./generics"

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

type Props = SafeOmit<PARSED_TYPE_DECLARATION, "body"> & Partial<ParentName>

export const typeInvocation = ({ name, generics, parentName }: Props) =>
  `${name}<${genericArgsInvocation(generics, parentName)}>`

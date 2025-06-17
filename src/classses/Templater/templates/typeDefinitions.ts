import { SafeOmit } from "../../../typeUtils"
import { PARSED_TYPE_DECLARATION } from "../../utils/parseTypeDeclarations"
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

export const typeInvocation = ({ name, generics }: SafeOmit<PARSED_TYPE_DECLARATION, "body">) =>
  `${name}<${genericArgsInvocation(generics)}>`

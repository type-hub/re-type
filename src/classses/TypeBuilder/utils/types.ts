import { SafeOmit } from "../../../typeUtils"
import { PARSED_TYPE_DECLARATION } from "../../utils/parseTypeDeclarations"
import { createGenericArgsInvocation } from "./generics"

export const createTypeDeclaration = ({
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

export const createTypeInvocation = ({ name, generics }: SafeOmit<PARSED_TYPE_DECLARATION, "body">) =>
  `${name}<${createGenericArgsInvocation(generics)}>`

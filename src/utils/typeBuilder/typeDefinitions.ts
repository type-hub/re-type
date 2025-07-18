import type { LAX_BODY } from "classes/Lax"
import type { STRICT_LAX_BODY } from "classes/Strict"
import type { Brand, SafeOmit } from "utilTypes"
import type { JS_DOCS } from "utils/createJsDocs"
import type { PARSED_TYPE_DECLARATION } from "utils/parseTypeDeclarations"
import type { CurrentTypeName } from "utils/reTypeError/trace"
import type { EITHER_BODY } from "./eitherBody"
import { type GENERIC_ARGS_DECLARATION, genericArgsInvocation } from "./genericArgs"

export const typeDeclaration = ({
  docs,
  typeName,
  genericsDeclarations,
  body,
}: {
  docs: JS_DOCS
  typeName: string
  genericsDeclarations: GENERIC_ARGS_DECLARATION
  body: EITHER_BODY | LAX_BODY | STRICT_LAX_BODY
}): string => `${docs}
type ${typeName}<${genericsDeclarations}> = ${body}`

type Props = SafeOmit<PARSED_TYPE_DECLARATION, "body"> & { currentTypeName?: CurrentTypeName }

export type TYPE_INVOCATION = Brand<string, "TYPE_INVOCATION">

export const typeInvocation = ({ typeName, generics, currentTypeName }: Props): TYPE_INVOCATION =>
  `${typeName}<${genericArgsInvocation(generics, currentTypeName)}>` as TYPE_INVOCATION

import { genericArgsDeclaration, genericArgsInvocation } from "./generics"
import { relaxConstraints } from "./relaxConstraints"
import { typeDeclaration, typeInvocation } from "./typeDefinitions"

export const typeBuilder = {
  typeDeclaration,
  typeInvocation,
  genericArgsDeclaration,
  genericArgsInvocation,
  relaxConstraints,
}

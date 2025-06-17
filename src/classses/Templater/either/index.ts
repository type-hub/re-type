import { SafeOmit } from "../../../typeUtils"
import { createJsDocs } from "../../utils/createJsDocs"
import { resolveGenerics } from "../../utils/generics"
import { PARSED_TYPE_DECLARATION } from "../../utils/parseTypeDeclarations"
import { template } from "../templates"

const resolveEitherName = (name: string) => `Either_${name}`

const typeDeclaration = ({ name: _name, generics: _generics }: SafeOmit<PARSED_TYPE_DECLARATION, "body">) => {
  const genericsWithoutError = resolveGenerics({ withContext: true, generics: _generics })
  const typeInvocation = template.typeInvocation({ name: _name, generics: genericsWithoutError })

  const name = resolveEitherName(_name)
  const body = `[_Error] extends [never]
  ? ${typeInvocation}
  : _Error`

  const generics = resolveGenerics({ withContext: true, withError: true, generics: _generics })

  return template.typeDeclaration({
    docs: createJsDocs({ name: name, generics }),
    name: name,
    genericsDeclarations: template.genericArgsDeclaration({ generics, lax: true }), // remove lax, error and context should have validation
    body,
  })
}

const typeInvocation = ({ name, generics: _generics }: SafeOmit<PARSED_TYPE_DECLARATION, "body">) => {
  const generics = resolveGenerics({ withContext: true, generics: _generics })
  const typeName = resolveEitherName(name)

  const genericsInvocation = template.genericArgsInvocation(generics)

  const typeDef = `${typeName}<
  Validate$<[${genericsInvocation}]>,
  ${genericsInvocation},
>`

  return typeDef
}

export const either = {
  typeDeclaration,
  typeInvocation,
}

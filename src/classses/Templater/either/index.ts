import { SafeOmit } from "../../../typeUtils"
import { TypeBuilder } from "../../TypeBuilder"
import { createJsDocs } from "../../utils/createJsDocs"
import { resolveGenerics } from "../../utils/generics"
import { PARSED_TYPE_DECLARATION } from "../../utils/parseTypeDeclarations"

const resolveEitherName = (name: string) => `Either_${name}`

export class Either {
  constructor(private typeBuilder: TypeBuilder) {}

  public eitherTypeDeclaration({ name: _name, generics: _generics }: SafeOmit<PARSED_TYPE_DECLARATION, "body">) {
    const genericsWithoutError = resolveGenerics({ withContext: true, generics: _generics })
    const typeInvocation = this.typeBuilder.createTypeInvocation({ name: _name, generics: genericsWithoutError })

    const name = resolveEitherName(_name)
    const body = `[_Error] extends [never]
  ? ${typeInvocation}
  : _Error`

    const generics = resolveGenerics({ withContext: true, withError: true, generics: _generics })

    return this.typeBuilder.createTypeDeclaration({
      docs: createJsDocs({ name: name, generics }),
      name: name,
      genericsDeclarations: this.typeBuilder.createGenericArgsDeclaration({ generics, lax: true }), // remove lax, error and context should have validation
      body,
    })
  }

  public eitherTypeInvocation({ name, generics: _generics }: SafeOmit<PARSED_TYPE_DECLARATION, "body">) {
    const generics = resolveGenerics({ withContext: true, generics: _generics })
    const typeName = resolveEitherName(name)

    const genericsInvocation = this.typeBuilder.createGenericArgsInvocation(generics)

    const typeDef = `${typeName}<
  Validate$<[${genericsInvocation}]>,
  ${genericsInvocation},
>`

    return typeDef
  }
}

import { ImportRegistry } from "services/ImportRegistry"
import { CONTEXT } from "utils/consts"
import { createJsDocs } from "utils/createJsDocs"
import { PARSED_TYPE_DECLARATION } from "utils/parseTypeDeclarations"
import { resolveGenerics } from "utils/resolveGenerics"
import { trace } from "utils/reTypeError/trace"
import { SafeOmit } from "../../../utilTypes"
import { typeBuilder } from "../typeBuilder"

const resolveEitherName = (name: string) => `Either_${name}`

export const either = {
  typeDeclaration: ({ name: _name, generics: _generics }: SafeOmit<PARSED_TYPE_DECLARATION, "body">) => {
    const genericsWithoutError = resolveGenerics({ withContext: true, generics: _generics })
    const typeInvocation = typeBuilder.typeInvocation({ name: _name, generics: genericsWithoutError })

    const name = resolveEitherName(_name)
    const body = `[_Error] extends [never]
    ? ${typeInvocation}
    : _Error`

    const generics = resolveGenerics({ withContext: true, withError: true, generics: _generics })

    return typeBuilder.typeDeclaration({
      docs: createJsDocs({ name: name, generics }),
      name: name,
      genericsDeclarations: typeBuilder.genericArgsDeclaration({ generics, lax: true }), // remove lax, error and context should have validation
      body,
    })
  },

  // TODO: import validation modules keys

  typeInvocation: ({ name, generics: _generics }: SafeOmit<PARSED_TYPE_DECLARATION, "body">) => {
    const Validate = "ValidateFlatTuple$"
    ImportRegistry.addImport(Validate)

    const generics = resolveGenerics({ withContext: true, generics: _generics })
    const genericsInvocationWithContext = typeBuilder.genericArgsInvocation(generics)
    const genericsInvocationWithoutContext = typeBuilder.genericArgsInvocation(
      generics.filter(({ name }) => name !== CONTEXT),
    )

    const typeName = resolveEitherName(name)

    const typeDef = `${typeName}<
    ${CONTEXT},
    ${Validate}<[${genericsInvocationWithContext}], ${trace({ withID: false, currentFunc: Validate })}>,
    ${genericsInvocationWithoutContext}
  >`

    return typeDef
  },
}

import { rejectContext, resolveEitherLaxName, resolveStrictLaxName } from "classses/utils"
import { ImportRegistry } from "services/ImportRegistry"
import { createJsDocs } from "utils/createJsDocs"
import { PARSED_TYPE_DECLARATION, parseTypeDeclaration } from "utils/parseTypeDeclarations"
import { resolveGenerics, WITH_CONTEXT } from "utils/resolveGenerics"
import { ParentName, trace } from "utils/reTypeError/trace"
import { typeBuilder } from "utils/typeBuilder"

export class Strict {
  protected parsedType: PARSED_TYPE_DECLARATION

  constructor(typeDef: string) {
    this.parsedType = parseTypeDeclaration(typeDef)
  }

  public strictLaxTypeDeclaration({ withContext }: WITH_CONTEXT) {
    const generics = resolveGenerics({ withContext, generics: this.parsedType.generics })
    const name = resolveStrictLaxName(this.parsedType.name)
    const docs = createJsDocs({ name, generics })
    const genericsDeclarations = typeBuilder.genericArgsDeclaration({ lax: true, generics })
    const body = this.makeStrictLaxBody({
      parentName: name,
    })

    return typeBuilder.typeDeclaration({
      docs,
      name,
      genericsDeclarations,
      body,
    })
  }

  // TODO: import validation modules keys
  protected makeStrictLaxBody({ parentName }: ParentName) {
    // TODO: mismatch error could be more detailed and reuse validation (what it should be)
    // TODO: Kamils class
    const ValidationType = "ValidateFlatTuple$"
    ImportRegistry.addImport(ValidationType)

    const generics = resolveGenerics({ withContext: true, generics: this.parsedType.generics })
    const genericsInvocationWithContext = typeBuilder.genericArgsInvocation(generics)
    const genericsInvocationWithoutContext = typeBuilder.genericArgsInvocation(rejectContext(generics))

    // TODO: fix utils func
    const typeName = resolveEitherLaxName(this.parsedType.name)
    const contextString = trace({ parentName })

    const typeDef = `${typeName}<
  // Trace
  ${contextString},
  // Validate
  ${ValidationType}<
    [${genericsInvocationWithContext}],
    ${contextString}
  >,
  // Pass original generics
  ${genericsInvocationWithoutContext}
>`

    return typeDef
  }

  // -------------------------------------------------------

  public inlineInvocation() {
    return this.makeStrictLaxBody({
      parentName: resolveStrictLaxName(this.parsedType.name),
    })
  }
}

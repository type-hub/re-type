import { rejectContext, resolveEitherLaxName, resolveStrictLaxName } from "classses/utils"
import { ImportRegistry } from "services/ImportRegistry"
import { createJsDocs } from "utils/createJsDocs"
import type { PARSED_TYPE_DECLARATION } from "utils/parseTypeDeclarations"
import { parseTypeDeclaration } from "utils/parseTypeDeclarations"
import type { WITH_CONTEXT } from "utils/resolveGenerics"
import { resolveGenerics } from "utils/resolveGenerics"
import type { ParentName } from "utils/reTypeError/trace"
import { trace } from "utils/reTypeError/trace"
import { typeBuilder } from "utils/typeBuilder"

export class Strict {
  protected parsedType: PARSED_TYPE_DECLARATION

  constructor(typeDef: string) {
    this.parsedType = parseTypeDeclaration(typeDef)
  }

  public strictLaxTypeDeclaration({ withContext }: WITH_CONTEXT): string {
    const generics = resolveGenerics({ withContext, generics: this.parsedType.generics })
    const typeName = resolveStrictLaxName(this.parsedType.typeName)
    const docs = createJsDocs({ typeName, generics })
    const genericsDeclarations = typeBuilder.genericArgsDeclaration({ lax: true, generics })
    const body = this.makeStrictLaxBody({
      parentName: typeName,
    })

    return typeBuilder.typeDeclaration({
      docs,
      typeName,
      genericsDeclarations,
      body,
    })
  }

  // TODO: import validation modules keys
  protected makeStrictLaxBody({ parentName }: ParentName): string {
    // TODO: mismatch error could be more detailed and reuse validation (what it should be)
    // TODO: Kamils class
    const ValidationType = "ValidateFlatTuple$"
    ImportRegistry.addImport(ValidationType)

    const generics = resolveGenerics({ withContext: true, generics: this.parsedType.generics })
    const genericsInvocationWithContext = typeBuilder.genericArgsInvocation(generics)
    const genericsInvocationWithoutContext = typeBuilder.genericArgsInvocation(rejectContext(generics))

    const typeName = resolveEitherLaxName(this.parsedType.typeName)
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
}

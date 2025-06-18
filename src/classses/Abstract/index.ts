import { WITH_CONTEXT } from "utils/resolveGenerics"
import { WITH_COMMENTS } from "../types"

export abstract class AbstractTypeBuilder {
  protected withContext: boolean

  constructor(withContext?: boolean) {
    this.withContext = !!withContext
  }

  abstract typeDeclaration(): string
  abstract inlineInvocation(): string
  // abstract invoke(): string;
  // protected abstract name(): string

  protected abstract makeLaxBody({ withContext, withComments }: WITH_CONTEXT & WITH_COMMENTS): string
  protected abstract get laxName(): string
}

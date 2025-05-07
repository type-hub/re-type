export abstract class AbstractTypeBuilder {
  protected withContext: boolean

  constructor(withContext?: boolean) {
    this.withContext = !!withContext
  }

  abstract define(): string
  abstract inline(): string
  // abstract invoke(): string;
  // protected abstract name(): string

  protected abstract makeBody({ withContext, withComments }: { withContext: boolean; withComments: boolean }): string
  protected abstract get name(): string
}

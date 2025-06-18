class _ImportRegistry {
  private static instance: _ImportRegistry
  private imports: Set<string>

  private constructor() {
    this.imports = new Set<string>()
  }

  static getInstance(): _ImportRegistry {
    if (!_ImportRegistry.instance) {
      _ImportRegistry.instance = new _ImportRegistry()
    }

    return _ImportRegistry.instance
  }

  clearImports(): void {
    this.imports.clear()
  }

  // TODO: replace string with CoreTypes
  addImport(importStatement: string): void {
    this.imports.add(importStatement)
  }

  addImports(importStatements: string[]): void {
    importStatements.forEach((imp) => this.addImport(imp))
  }

  getImports(): string[] {
    return Array.from(this.imports)
  }

  reset(): void {
    this.imports.clear()
  }
}

export const ImportRegistry = _ImportRegistry.getInstance()

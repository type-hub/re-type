import { ImportRegistry } from "../../../services/ImportRegistry"

export function getPrimitiveConstraints(): string[] {
  return ["string", "number", "boolean", "null", "undefined", "symbol", "void", "never", "any", "unknown"]
}

export function isPrimitiveArray(constraint: string): boolean {
  return constraint.endsWith("[]") && getPrimitiveConstraints().includes(constraint.replace(/\[\]$/, "").trim())
}

export function isPrimitiveConstraint(constraint?: string): boolean {
  if (!constraint) return true
  if (getPrimitiveConstraints().includes(constraint.trim())) return true
  if (isPrimitiveArray(constraint)) return true
  return false
}

export function stripKeyof(constraint?: string): string | undefined {
  if (!constraint) return constraint
  return constraint.replace(/^keyof\s+/, "").trim()
}

export function maybeRegisterConstraintImport(constraint?: string): void {
  const sanitized = stripKeyof(constraint)
  if (sanitized && !isPrimitiveConstraint(sanitized)) {
    ImportRegistry.addImport(sanitized)
  }
}

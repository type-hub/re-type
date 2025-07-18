import { flip, includes, pipe, trim } from "ramda"

const primitiveConstraints: string[] = [
  "string",
  "number",
  "boolean",
  "null",
  "undefined",
  "symbol",
  "void",
  "never",
  "any",
  "unknown",
]

const stripKeyof = (constraint: string): string => constraint.replace(/^keyof\s+/, "")
const stripArray = (constraint: string): string => constraint.replace(/\[\]$/, "")

export const deconstructConstraint: (constraint: string) => string = pipe(
  //
  stripKeyof,
  stripArray,
  trim,
)

export const isPrimitiveConstraint: (constraint: string) => boolean = pipe(
  deconstructConstraint,
  flip(includes)(primitiveConstraints),
)

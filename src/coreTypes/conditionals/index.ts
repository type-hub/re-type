export type IfElse$<A, B, C, D> = A extends B
  ? C
  : D

// TODO: box mode
export type If$<A, B, C> = IfElse$<A, B, C, never>

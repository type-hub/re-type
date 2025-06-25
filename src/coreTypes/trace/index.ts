export type Trace<
  Context extends string,
  CurrentTypeName extends string
> = `${Context}->${CurrentTypeName}`

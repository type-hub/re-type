export type Trace<
  Context extends string,
  ParentName extends string
> = `${Context}->${ParentName}`

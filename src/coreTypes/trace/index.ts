type _Trace<A extends string, B extends string> = `${A}->${B}`

export type Trace<
  Context extends string,
  Name extends string,
  Next extends string = ""
> = Next extends ""
  ? _Trace<Context, Name>
  : // TODO: is it necessary (next)?
    _Trace<Context, _Trace<Name, Next>>

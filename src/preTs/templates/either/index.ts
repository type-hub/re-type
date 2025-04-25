import { parseTypeFunction } from "../../parsers";
import { b } from "../backvalidation";

// BENEFIT: keep type argument names throught all funcs -> easy to track
// TODO: maybe replace TX with strait code?

export function Either(typeDef: string) {
  const { typesList } = parseTypeFunction(typeDef);

  return `type ${Either.name}<E, C extends string, ${typesList}> = [E] extends [never]
  ? ${b.name}<${typesList}, TX<C, "${Either.name}">>
  : E
`;
}

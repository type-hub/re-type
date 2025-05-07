import { customAlphabet } from "nanoid"
import { CONTEXT_GENERIC } from "../../consts"
import { Generic, ParsedTypeDeclaration, SafePick, WithContext } from "../types"

//

const alphabet = `0123456789abcdefghijklmnopqrstuvwxyz`
export const uuid: () => string = customAlphabet(alphabet, 7)

//

type resolverProps = WithContext & SafePick<ParsedTypeDeclaration, "generics">

export const resolveGenerics = ({ withContext, generics }: resolverProps): Generic[] => {
  return withContext ? [CONTEXT_GENERIC, ...generics] : generics
}

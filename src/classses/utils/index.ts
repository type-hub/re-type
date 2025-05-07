import { customAlphabet } from "nanoid"
import { CONTEXT, CONTEXT_GENERIC } from "../../consts"
import { Generic, ParsedTypeDeclaration, SafePick, WithContext } from "../types"

//

const alphabet = `0123456789abcdefghijklmnopqrstuvwxyz`
export const uuid: () => string = customAlphabet(alphabet, 7)

//

type resolverProps = WithContext & SafePick<ParsedTypeDeclaration, "generics">

export const resolveGenerics = ({ withContext, generics }: resolverProps): Generic[] => {
  return withContext ? [CONTEXT_GENERIC, ...generics] : generics
}

//

export type TraceProps = {
  withID: boolean
  currentFunc: string
  currentArg: string
}

export const trace = ({ withID, currentFunc, currentArg }: TraceProps) => {
  const stringLiteral = `${"${" + CONTEXT + "}"}`

  return `\`${stringLiteral}->${currentFunc}->${currentArg}${withID ? `::${uuid()}` : ""}\``
}

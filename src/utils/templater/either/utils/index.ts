import { CONTEXT } from "utils/consts"
import { GENERIC } from "utils/parseTypeDeclarations"

export const resolveEitherName = (name: string) => `Either_${name}`
export const rejectContext = (generics: GENERIC[]) => generics.filter(({ name }) => name !== CONTEXT)

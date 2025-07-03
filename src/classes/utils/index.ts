import { pipe } from "ramda"
import { CONTEXT } from "utils/consts"
import type { GENERIC } from "utils/parseTypeDeclarations"

export const resolveLaxName = (typeName: string): string => `${typeName}_Lax`
export const resolveStrictName = (typeName: string): string => `${typeName}_Strict`
export const resolveEitherName = (typeName: string): string => `Either_${typeName}`

export const resolveStrictLaxName = pipe(resolveStrictName, resolveLaxName)
export const resolveEitherLaxName = pipe(resolveEitherName, resolveLaxName)

export const rejectContext = (generics: GENERIC[]): GENERIC[] => generics.filter(({ name }) => name !== CONTEXT)

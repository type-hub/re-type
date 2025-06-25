import { pipe } from "ramda"
import { CONTEXT } from "utils/consts"
import type { GENERIC } from "utils/parseTypeDeclarations"

export const resolveLaxName = (name: string): string => `${name}_Lax`
export const resolveStrictName = (name: string): string => `${name}_Strict`
export const resolveEitherName = (name: string): string => `Either_${name}`

export const resolveStrictLaxName = pipe(resolveStrictName, resolveLaxName)
export const resolveEitherLaxName = pipe(resolveEitherName, resolveLaxName)

export const rejectContext = (generics: GENERIC[]): GENERIC[] => generics.filter(({ name }) => name !== CONTEXT)

// TODO: why imports from classes
import { match } from "ts-pattern"
import type { SafePick } from "utilTypes"
import { CONTEXT_GENERIC, ERROR_GENERIC } from "../consts"
import type { GENERIC, PARSED_TYPE_DECLARATION } from "../parseTypeDeclarations"

export type WITH_CONTEXT = { withContext: boolean }
export type WITH_ERROR = { withError: boolean }

// prettier-ignore
type ResolveGenericProps =
  & Partial<WITH_CONTEXT>
  & Partial<WITH_ERROR>
  & SafePick<PARSED_TYPE_DECLARATION, "generics">

export const resolveGenerics = ({ withError, withContext, generics }: ResolveGenericProps): GENERIC[] =>
  match([withError || false, withContext || false])
    .with([true, true], () => [CONTEXT_GENERIC, ERROR_GENERIC, ...generics])
    .with([true, false], () => [ERROR_GENERIC, ...generics])
    .with([false, true], () => [CONTEXT_GENERIC, ...generics])
    .with([false, false], () => generics)
    .exhaustive()

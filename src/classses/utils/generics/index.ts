import { match } from "ts-pattern"
import { SafePick } from "../../../typeUtils"
import { WITH_CONTEXT, WITH_ERROR } from "../../types"
import { CONTEXT_GENERIC, ERROR_GENERIC } from "../consts"
import { GENERIC, PARSED_TYPE_DECLARATION } from "../parseTypeDeclarations"

type ResolveGenericProps = Partial<WITH_CONTEXT> & Partial<WITH_ERROR> & SafePick<PARSED_TYPE_DECLARATION, "generics">

export const resolveGenerics = ({ withError, withContext, generics }: ResolveGenericProps): GENERIC[] =>
  match([withError || false, withContext || false])
    .with([true, true], () => [ERROR_GENERIC, CONTEXT_GENERIC, ...generics])
    .with([true, false], () => [ERROR_GENERIC, ...generics])
    .with([false, true], () => [CONTEXT_GENERIC, ...generics])
    .with([false, false], () => generics)
    .exhaustive()

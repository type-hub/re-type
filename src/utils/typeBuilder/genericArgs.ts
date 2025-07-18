import { P, match } from "ts-pattern"
import { CONTEXT, CONTEXT_DECLARATION } from "utils/consts"
import type { GENERIC } from "utils/parseTypeDeclarations"
import type { CurrentTypeName } from "utils/reTypeError/trace"
import type { Brand } from "utilTypes"
import { supportContextTracing } from "./utils"

export type GENERIC_ARGS_DECLARATION = Brand<string, "GENERIC_ARGS_DECLARATION">

export const genericArgsDeclaration = ({
  generics,
  lax,
}: {
  generics: GENERIC[]
  lax?: boolean
}): GENERIC_ARGS_DECLARATION =>
  generics
    .map((generic) =>
      // TODO: dirty, support context appropriately
      match([lax || false, generic])
        .returnType<string>()
        // LAX TRUE
        .with([true, { name: P.string, defaultValue: P.string }], ([_, g]) => `${g.name} = ${g.defaultValue}`)
        // .with([true, { name: P.string, constraint: P.string }], ([_, g]) => `${g.name} extends ${g.constraint}`)
        .with([true, { name: P.string }], ([_, g]) => (g.name === CONTEXT ? CONTEXT_DECLARATION : `${g.name}`))
        // LAX FALSE
        .with(
          [false, { name: P.string, constraint: P.string, defaultValue: P.string }],
          ([_, g]) => `${g.name} extends ${g.constraint} = ${g.defaultValue}`,
        )
        .with([false, { name: P.string, constraint: P.string }], ([_, g]) => `${g.name} extends ${g.constraint}`)
        .with([false, { name: P.string, defaultValue: P.string }], ([_, g]) => `${g.name} = ${g.defaultValue}`)
        .with([false, { name: P.string }], ([_, g]) => g.name)
        .exhaustive(),
    )
    .join(", ") as GENERIC_ARGS_DECLARATION

export type GENERIC_ARGS_INVOCATION = Brand<string, "GENERIC_ARGS_INVOCATION">

export const genericArgsInvocation = (
  generics: GENERIC[],
  currentTypeName?: CurrentTypeName,
): GENERIC_ARGS_INVOCATION =>
  generics
    //
    .map(supportContextTracing(currentTypeName))
    .join(", ") as GENERIC_ARGS_INVOCATION

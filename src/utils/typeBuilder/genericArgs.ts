import { P, match } from "ts-pattern"
import { CONTEXT, CONTEXT_DECLARATION } from "utils/consts"
import type { GENERIC } from "utils/parseTypeDeclarations"
import type { ParentName } from "utils/reTypeError/trace"
import { supportContextTracing } from "./utils"

export const genericArgsDeclaration = ({ generics, lax }: { generics: GENERIC[]; lax?: boolean }): string =>
  generics
    .map((generic) =>
      // TODO: dirty, support context appropriately
      match([lax || false, generic])
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
    .join(", ")

export const genericArgsInvocation = (generics: GENERIC[], parentName?: ParentName["parentName"]): string =>
  generics
    //
    .map(supportContextTracing(parentName))
    .join(", ")

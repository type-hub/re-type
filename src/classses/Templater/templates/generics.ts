import { match, P } from "ts-pattern"
import { GENERIC } from "../../utils/parseTypeDeclarations"

export const genericArgsInvocation = (generics: GENERIC[]) => generics.map(({ name }) => name).join(", ")

export const genericArgsDeclaration = ({ generics, lax }: { generics: GENERIC[]; lax?: boolean }) =>
  generics
    .map((generic) => {
      return (
        match([lax || false, generic])
          // LAX FALSE
          .with(
            [false, { name: P.string, constraint: P.string, defaultValue: P.string }],
            ([_, g]) => `${g.name} extends ${g.constraint} = ${g.defaultValue}`,
          )
          .with([false, { name: P.string, constraint: P.string }], ([_, g]) => `${g.name} extends ${g.constraint}`)
          .with([false, { name: P.string, defaultValue: P.string }], ([_, g]) => `${g.name} = ${g.defaultValue}`)
          .with([false, { name: P.string }], ([_, g]) => g.name)
          // LAX TRUE
          .with([true, { name: P.string, defaultValue: P.string }], ([_, g]) => `${g.name} = ${g.defaultValue}`)
          .with([true, { name: P.string }], ([_, g]) => g.name)
          .exhaustive()
      )
    })
    .join(", ")

import { regexes } from "../../../../regexes"
import { ParsedTypeDeclaration, SingleGenericArg } from "../../types"

export const parseTypeDeclarations = (
  typeFunc: string
): ParsedTypeDeclaration => {
  const match = typeFunc.match(regexes.extractTypesAndValidations)

  if (!match) {
    throw new Error(
      `parseTypeFunction: Type function not found in type definition: ${typeFunc}`
    )
  }

  const name = match[1]
  const rawArgs = match[2].split(",")
  const body = match[3]

  if (!name) {
    throw new Error(
      `parseTypeFunction: Type function name not found in type definition: ${typeFunc}`
    )
  }
  if (!rawArgs) {
    throw new Error(
      `parseTypeFunction: Type function args not found in type definition: ${typeFunc}`
    )
  }
  if (!body) {
    throw new Error(
      `parseTypeFunction: Type function body not found in type definition: ${typeFunc}`
    )
  }

  const args: SingleGenericArg[] = []

  for (let i = 0; i < rawArgs.length; i++) {
    const arg = rawArgs[i]

    args.push({
      name: arg.split("extends")[0].split("=")[0].trim(),
      constraint: arg.split("extends")[1]?.split("=")[0].trim(),
      defaultValue: arg.split("=")[1]?.trim(),
    })
  }

  return {
    name: {
      original: name,
      safe: `Safe${name}`,
      lax: `${name}_Lax`,
    },
    args,
    body,
  }
}

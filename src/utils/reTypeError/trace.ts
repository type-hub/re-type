import { CONTEXT } from "utils/consts"
import { SafeOmit } from "utilTypes"
import { uuid } from "./uuid"

export type TraceProps = {
  withID?: boolean
  currentFunc: string
  currentArg: string
}

export const traceArg = ({ withID, currentFunc, currentArg }: TraceProps) => {
  const stringLiteral = `${"${" + CONTEXT + "}"}`

  return `\`${stringLiteral}->${currentFunc}->${currentArg}${withID ? `::${uuid()}` : ""}\``
}

export const trace = ({ withID, currentFunc }: SafeOmit<TraceProps, "currentArg">) => {
  const stringLiteral = `${"${" + CONTEXT + "}"}`

  return `\`${stringLiteral}->${currentFunc}${withID ? `::${uuid()}` : ""}\``
}

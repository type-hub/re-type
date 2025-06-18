import { CONTEXT } from "utils/consts"
import { uuid } from "./uuid"

export type TraceProps = {
  withID: boolean
  currentFunc: string
  currentArg: string
}

export const trace = ({ withID, currentFunc, currentArg }: TraceProps) => {
  const stringLiteral = `${"${" + CONTEXT + "}"}`

  return `\`${stringLiteral}->${currentFunc}->${currentArg}${withID ? `::${uuid()}` : ""}\``
}

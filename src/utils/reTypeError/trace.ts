import { CONTEXT } from "utils/consts"
import { uuid } from "./uuid"

export type CurrentTypeName = string

// prettier-ignore
export type TraceProps =
  {
    currentTypeName: CurrentTypeName
    currentArg: string
    withID?: boolean
  }

const contextLiteral = `${"${" + CONTEXT + "}"}`

export const traceArg = ({ withID, currentTypeName, currentArg }: TraceProps): string =>
  `\`${contextLiteral}->${currentTypeName}->${currentArg}${withID ? `::${uuid()}` : ""}\``

export const trace = (currentTypeName: CurrentTypeName): string => `\`${contextLiteral}->${currentTypeName}\``

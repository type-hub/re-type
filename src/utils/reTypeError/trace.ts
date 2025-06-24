import { CONTEXT } from "utils/consts"
import { uuid } from "./uuid"

export type ParentName = { parentName: string }

// prettier-ignore
export type TraceProps =
  & ParentName
  & {
    currentArg: string
    withID?: boolean
  }

const contextLiteral = `${"${" + CONTEXT + "}"}`

export const traceArg = ({ withID, parentName, currentArg }: TraceProps) =>
  `\`${contextLiteral}->${parentName}->${currentArg}${withID ? `::${uuid()}` : ""}\``

export const trace = ({ parentName }: ParentName) => `\`${contextLiteral}->${parentName}\``

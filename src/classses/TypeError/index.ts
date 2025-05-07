import { trace, TraceProps } from "../utils"

type Props = TraceProps

export class TypeErrorTemplate {
  public newMismatchError({ withID, currentFunc, currentArg }: Props) {
    const contextString = trace({ withID, currentFunc, currentArg })

    // TODO: read error type from enum
    return `TypeError<${"MismatchError"}, ${contextString}, ${currentArg}>`
  }
}

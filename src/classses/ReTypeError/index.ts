import { ERROR_TYPE, ERRORS_LOOKUP, ErrorsLookup, ErrorType, ReTypeError } from "../../types/errors"
import { Generic, SafeOmit } from "../types"
import { trace, TraceProps } from "../utils"

type MismatchErrorProps = SafeOmit<TraceProps, "currentArg"> & {
  generic: Generic
}

// INFO: Ensure proper overlap with ErrorType
type ErrorHandler = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in ErrorType]: (...args: any[]) => string
}

const buildReTypeError = <
  //
  _ErrorType extends keyof ErrorsLookup,
  Context extends string,
  _Generic extends Generic,
>(
  __type: _ErrorType,
  __context: Context,
  generic: _Generic,
): string => {
  const e: ReTypeError<_ErrorType, Context, _Generic["name"], _Generic["constraint"]> = {
    __type: __type,
    __message: ERRORS_LOOKUP[__type]["msg"],
    __url: ERRORS_LOOKUP[__type]["url"],
    __context: __context,
    __value: generic.name,
    __constraint: generic.constraint,
  }

  return `${e.__type}<${e.__context}, ${e.__value}, ${e.__constraint}>`
}

export class ReTypeErrorTemplate implements ErrorHandler {
  // TODO: proxy?
  public MismatchError({ withID, currentFunc, generic }: MismatchErrorProps) {
    const contextTrace = trace({ withID, currentFunc, currentArg: generic.name })

    return buildReTypeError(ERROR_TYPE.MismatchError, contextTrace, generic)
  }

  public OpenTypeError({ withID, currentFunc, generic }: MismatchErrorProps) {
    const contextTrace = trace({ withID, currentFunc, currentArg: generic.name })

    return buildReTypeError(ERROR_TYPE.OpenTypeError, contextTrace, generic)
  }

  public NeverError({ withID, currentFunc, generic }: MismatchErrorProps) {
    const contextTrace = trace({ withID, currentFunc, currentArg: generic.name })

    return buildReTypeError(ERROR_TYPE.NeverError, contextTrace, generic)
  }

  public AnyError({ withID, currentFunc, generic }: MismatchErrorProps) {
    const contextTrace = trace({ withID, currentFunc, currentArg: generic.name })

    return buildReTypeError(ERROR_TYPE.AnyError, contextTrace, generic)
  }

  public UnknownError({ withID, currentFunc, generic }: MismatchErrorProps) {
    const contextTrace = trace({ withID, currentFunc, currentArg: generic.name })

    return buildReTypeError(ERROR_TYPE.UnknownError, contextTrace, generic)
  }

  public NonLiteralError({ withID, currentFunc, generic }: MismatchErrorProps) {
    const contextTrace = trace({ withID, currentFunc, currentArg: generic.name })

    return buildReTypeError(ERROR_TYPE.NonLiteralError, contextTrace, generic)
  }

  public EmptyStringError({ withID, currentFunc, generic }: MismatchErrorProps) {
    const contextTrace = trace({ withID, currentFunc, currentArg: generic.name })

    return buildReTypeError(ERROR_TYPE.EmptyStringError, contextTrace, generic)
  }

  public OutputError({ withID, currentFunc, generic }: MismatchErrorProps) {
    const contextTrace = trace({ withID, currentFunc, currentArg: generic.name })

    return buildReTypeError(ERROR_TYPE.OutputError, contextTrace, generic)
  }
}

import { GENERIC } from "utils/parseTypeDeclarations"
import { ERROR_TYPE, ERRORS_LOOKUP, ErrorsLookup, ErrorType, ReTypeError } from "../../coreTypes/errors"
import { SafeOmit } from "../../utilTypes"
import { trace, TraceProps } from "./trace"

type MismatchErrorProps = SafeOmit<TraceProps, "currentArg"> & {
  generic: GENERIC
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
  _Generic extends GENERIC,
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

export const reTypeError = {
  // TODO: proxy?
  MismatchError: ({ withID, currentFunc, generic }: MismatchErrorProps) => {
    const contextTrace = trace({ withID, currentFunc, currentArg: generic.name })

    return buildReTypeError(ERROR_TYPE.MismatchError, contextTrace, generic)
  },

  OpenTypeError: ({ withID, currentFunc, generic }: MismatchErrorProps) => {
    const contextTrace = trace({ withID, currentFunc, currentArg: generic.name })

    return buildReTypeError(ERROR_TYPE.OpenTypeError, contextTrace, generic)
  },

  NeverError: ({ withID, currentFunc, generic }: MismatchErrorProps) => {
    const contextTrace = trace({ withID, currentFunc, currentArg: generic.name })

    return buildReTypeError(ERROR_TYPE.NeverError, contextTrace, generic)
  },

  AnyError: ({ withID, currentFunc, generic }: MismatchErrorProps) => {
    const contextTrace = trace({ withID, currentFunc, currentArg: generic.name })

    return buildReTypeError(ERROR_TYPE.AnyError, contextTrace, generic)
  },

  UnknownError: ({ withID, currentFunc, generic }: MismatchErrorProps) => {
    const contextTrace = trace({ withID, currentFunc, currentArg: generic.name })

    return buildReTypeError(ERROR_TYPE.UnknownError, contextTrace, generic)
  },

  NonLiteralError: ({ withID, currentFunc, generic }: MismatchErrorProps) => {
    const contextTrace = trace({ withID, currentFunc, currentArg: generic.name })

    return buildReTypeError(ERROR_TYPE.NonLiteralError, contextTrace, generic)
  },

  EmptyStringError: ({ withID, currentFunc, generic }: MismatchErrorProps) => {
    const contextTrace = trace({ withID, currentFunc, currentArg: generic.name })

    return buildReTypeError(ERROR_TYPE.EmptyStringError, contextTrace, generic)
  },

  OutputError: ({ withID, currentFunc, generic }: MismatchErrorProps) => {
    const contextTrace = trace({ withID, currentFunc, currentArg: generic.name })

    return buildReTypeError(ERROR_TYPE.OutputError, contextTrace, generic)
  },
} satisfies ErrorHandler

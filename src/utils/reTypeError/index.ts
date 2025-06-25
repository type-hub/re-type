import type { GENERIC } from "utils/parseTypeDeclarations"
import type { ErrorType, ErrorsLookup, ReTypeError } from "../../coreTypes/errors"
import { ERRORS_LOOKUP, ERROR_TYPE } from "../../coreTypes/errors"
import type { SafeOmit } from "../../utilTypes"
import type { TraceProps } from "./trace"
import { traceArg } from "./trace"

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
    __type,
    __message: ERRORS_LOOKUP[__type]["msg"],
    __url: ERRORS_LOOKUP[__type]["url"],
    __context,
    __value: generic.name,
    __constraint: generic.constraint,
  }

  return `${e.__type}<${e.__context}, ${e.__value}, ${e.__constraint}>`
}

export const reTypeError = {
  // TODO: proxy?
  MismatchError: ({ withID, currentTypeName, generic }: MismatchErrorProps) => {
    const _context = traceArg({ withID, currentTypeName, currentArg: generic.name })

    return buildReTypeError(ERROR_TYPE.MismatchError, _context, generic)
  },

  // TODO: adjust error props type
  OpenTypeError: ({ withID, currentTypeName, generic }: MismatchErrorProps) => {
    const _context = traceArg({ withID, currentTypeName, currentArg: generic.name })

    return buildReTypeError(ERROR_TYPE.OpenTypeError, _context, generic)
  },

  NeverError: ({ withID, currentTypeName, generic }: MismatchErrorProps) => {
    const _context = traceArg({ withID, currentTypeName, currentArg: generic.name })

    return buildReTypeError(ERROR_TYPE.NeverError, _context, generic)
  },

  AnyError: ({ withID, currentTypeName, generic }: MismatchErrorProps) => {
    const _context = traceArg({ withID, currentTypeName, currentArg: generic.name })

    return buildReTypeError(ERROR_TYPE.AnyError, _context, generic)
  },

  UnknownError: ({ withID, currentTypeName, generic }: MismatchErrorProps) => {
    const _context = traceArg({ withID, currentTypeName, currentArg: generic.name })

    return buildReTypeError(ERROR_TYPE.UnknownError, _context, generic)
  },

  NonLiteralError: ({ withID, currentTypeName, generic }: MismatchErrorProps) => {
    const _context = traceArg({ withID, currentTypeName, currentArg: generic.name })

    return buildReTypeError(ERROR_TYPE.NonLiteralError, _context, generic)
  },

  EmptyStringError: ({ withID, currentTypeName, generic }: MismatchErrorProps) => {
    const _context = traceArg({ withID, currentTypeName, currentArg: generic.name })

    return buildReTypeError(ERROR_TYPE.EmptyStringError, _context, generic)
  },

  OutputError: ({ withID, currentTypeName, generic }: MismatchErrorProps) => {
    const _context = traceArg({ withID, currentTypeName, currentArg: generic.name })

    return buildReTypeError(ERROR_TYPE.OutputError, _context, generic)
  },
} satisfies ErrorHandler

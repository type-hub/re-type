import { CONTEXT } from "../../consts"
import { createBackTypeFuncName } from "../../templates/backvalidation/utils"
import { getTypeFromValidation } from "../../utils"

const buildPartialCondition = (
  templateName: string,
  validation: string,
  code: string
) => {
  const typeArgName = getTypeFromValidation(validation)

  return `${validation}
  ? ${code}
  : MismatchError<TX<${CONTEXT}, "${createBackTypeFuncName(
    templateName
  )}-${typeArgName}">, ${typeArgName}>`
}

export const buildConditionalTypeBody = (
  templateName: string,
  validations: string[],
  typeInvocation: string
) =>
  validations.reduce(
    (acc, validation) => buildPartialCondition(templateName, validation, acc),
    typeInvocation
  )

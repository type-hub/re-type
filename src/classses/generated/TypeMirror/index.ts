
  import type { ErrorsLookup } from "coreTypes/errors" // TODO: Hardcoded path, should be replaced with a dynamic import
  import type { BYPASS_MODES } from "coreTypes/validators" 
  

export class TypeUtils {
    
  ReTypeError(_ErrorType: keyof ErrorsLookup, Context: string, Value, Constraint = unknown): string { 
    return `ReTypeError<${_ErrorType}, ${Context}, ${Value}, ${Constraint}>`
  }

  EmptyStringError(CX: string, T, Constraint = unknown): string { 
    return `EmptyStringError<${CX}, ${T}, ${Constraint}>`
  }

  AnyMatchError$(T): string { 
    return `AnyMatchError$<${T}>`
  }

  FilterError$(T): string { 
    return `FilterError$<${T}>`
  }

  Trace(Context: string, ParentName: string): string { 
    return `Trace<${Context}, ${ParentName}>`
  }

  _FlatValidate$(T, CX: string, BypassMode: BYPASS_MODES = BypassModes["off"]): string { 
    return `_FlatValidate$<${T}, ${CX}, ${BypassMode}>`
  }

  ValidateArr(Data: unknown[], Acc, Context: string, Index: any[] = []): string { 
    return `ValidateArr<${Data}, ${Acc}, ${Context}, ${Index}>`
  }

  Validate$(T, CX: string = ""): string { 
    return `Validate$<${T}, ${CX}>`
  }

  EitherValidate(T, CX: string = ""): string { 
    return `EitherValidate<${T}, ${CX}>`
  }

  ValidateFlatTuple$(Args: unknown[], Context: string, Index: any[] = []): string { 
    return `ValidateFlatTuple$<${Args}, ${Context}, ${Index}>`
  }

  ValidateEmptyString$(T): string { 
    return `ValidateEmptyString$<${T}>`
  }

  EitherValidate_EmptyString$(T): string { 
    return `EitherValidate_EmptyString$<${T}>`
  }

  ValidateLiteral$(Mode: BYPASS_MODES, T, Match): string { 
    return `ValidateLiteral$<${Mode}, ${T}, ${Match}>`
  }

  Validate_StringLiteral(T): string { 
    return `Validate_StringLiteral<${T}>`
  }

  Validate_NumberLiteral(T): string { 
    return `Validate_NumberLiteral<${T}>`
  }

  Validate_BooleanLiteral(T): string { 
    return `Validate_BooleanLiteral<${T}>`
  }

  EitherValidate_StringLiteral(T): string { 
    return `EitherValidate_StringLiteral<${T}>`
  }

  EitherValidate_NumberLiteral(T): string { 
    return `EitherValidate_NumberLiteral<${T}>`
  }

  EitherValidate_BooleanLiteral(T): string { 
    return `EitherValidate_BooleanLiteral<${T}>`
  }

  ValidateType$(CX: string, T$, Match): string { 
    return `ValidateType$<${CX}, ${T$}, ${Match}>`
  }

  EitherValidate_Type$(T$, Match): string { 
    return `EitherValidate_Type$<${T$}, ${Match}>`
  }

  ValidateUsableSting$(T): string { 
    return `ValidateUsableSting$<${T}>`
  }

  CH_ValidateUsableSting$(T): string { 
    return `CH_ValidateUsableSting$<${T}>`
  }
  
}
  
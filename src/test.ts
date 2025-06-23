import { Lax } from "classses/Lax"
import { Strict } from "classses/Strict"
import { MismatchError } from "coreTypes/errors"
import { ValidateFlatTuple$ } from "coreTypes/validators/validateArr"
import { ImportRegistry } from "services/ImportRegistry"

type Preserve = MismatchError<"", "", "">
type Check<A extends string, B extends number, C = 1> = "hura!"

const lax = new Lax(
  //
  "type Check<A extends string, B extends number, C = 1> = A | B | C",
  true,
)

const strict = new Strict(
  //
  "type Check<A extends string, B extends number, C = 1> = A | B | C",
  true,
)

console.log(lax.typeDeclaration(), "\n")
console.log(lax.eitherTypeDeclaration(), "\n")
// console.log(lax.inline())
console.log(strict.typeDeclaration(), "\n")
// console.log(strict.eitherTypeDeclaration(), "\n")
// console.log(strict.inline())

console.log("imports", ImportRegistry.getImports())

// -------------------------------------------------------------------------

/**
# Check_Lax
@template _Context - string
@template A - string
@template B - number
@template C - any, fallbacks to 1
*/
type Check_Lax<_Context extends string, A, B, C = 1> = A extends string
  ? B extends number
    ? Check<A, B, C>
    : MismatchError<`${_Context}->Check_Lax->B::joilaxm`, B, number>
  : MismatchError<`${_Context}->Check_Lax->A::o0o5y5a`, A, string>

/**
# Either_Check_Lax
@template _Context - string
@template _Error - GENERIC_ERROR
@template A - string
@template B - number
@template C - any, fallbacks to 1
*/
type Either_Check_Lax<_Context extends string, _Error, A, B, C = 1> = [_Error] extends [never]
  ? Check_Lax<_Context, A, B, C>
  : _Error

/**
# Check_Strict
@template _Context - string
@template A - string
@template B - number
@template C - any, fallbacks to 1
*/
type Check_Strict<_Context extends string, A, B, C = 1> = Either_Check_Lax<
  _Context,
  ValidateFlatTuple$<[_Context, A, B, C], `${_Context}->ValidateFlatTuple$`>,
  A,
  B,
  C
>

// -------------------------------------------------------------------------

type AAA = Check_Strict<"Check_Strict", never, 1, 10>
//   ^?

type BBB = Check_Strict<"Check_Strict", "never", "1", 10>
//   ^?

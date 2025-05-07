import { Generic } from "../types"
import { parseTypeDeclarations } from "./utils"

export class TypeParser {
  private _name: string
  private _generics: Generic[]
  private _body: string

  constructor(typeDeclaration: string) {
    const { name, generics, body } = parseTypeDeclarations(typeDeclaration)

    this._name = name
    this._generics = generics
    this._body = body
  }

  public get name(): string {
    return this._name
  }

  public get generics(): Generic[] {
    return this._generics
  }

  public get body(): string {
    return this._body
  }
}

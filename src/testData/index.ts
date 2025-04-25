export const TYPE = {
  importedTypeDef: `export type Algo<T extends any, U extends string = "", V extends number> = "algo logic here..."`,
  exportedTypeDef: "export type ReverseString<T, U, V> = Algo<T, U, V>",
  func: {
    withoutValidation: "type WithoutValidation<A, B, C> = A",
    mixedValidation:
      "type MixedValidation<A, B extends boolean, C extends number, D = 1> = A",
    withValidation:
      "type WithValidation<A extends string, B extends boolean, C extends number> = A",
  },
}

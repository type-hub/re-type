// // TODO: this should become branded type
export const getTypeFromValidation = (arg: string) => {
  return arg.split("extends")[0].trim()
}

// export const getAllTypesFromValidation = (arg: string[]) => {
//   return arg.map(getTypeFromValidation).filter(Boolean);
// };

// // .

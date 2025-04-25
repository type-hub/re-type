export const getGenericTypesFromDeclaration = (args: string) => {
  return args.split(",").map((arg) => arg.split("=")[0].trim());
};

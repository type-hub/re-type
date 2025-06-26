export const regexes = {
  extractTypesAndValidations: /type ([\w$]*)<([^<>]*)>\s*=\s*(.*)/,
  exportType: /\bexport\s+type\b/,
  blockComment: /\/\*\*[\s\S]*?\*\//g,
  lineComment: /\/\/.*/g,
}

import { resolveType, resolveTypeSync } from './type-resolver';

/**
 * Resolves a TypeScript type expression to its computed form asynchronously.
 * This provides the same information as hovering over a type in VS Code or TypeScript Playground.
 * 
 * @example
 * ```ts
 * // For template literal types
 * type x = 'a' | 'b';
 * type y = `${x}---`;
 * 
 * // Get the computed type asynchronously
 * resolveTypeExpression('`${x}---`').then(resolved => {
 *   console.log(resolved); // Should output: "'a---' | 'b---'"
 * });
 * ```
 */
export function resolveTypeExpression(typeExpression: string): Promise<string> {
  return resolveType(typeExpression);
}

/**
 * Synchronous version of resolveTypeExpression.
 * This function can be easier to use in some contexts, but may be less reliable.
 * 
 * @example
 * ```ts
 * // For template literal types
 * type x = 'a' | 'b';
 * type y = `${x}---`;
 * 
 * // Get the computed type synchronously
 * const resolvedType = resolveTypeExpressionSync('`${x}---`'); // Should return "'a---' | 'b---'"
 * ```
 */
export function resolveTypeExpressionSync(typeExpression: string): string {
  return resolveTypeSync(typeExpression);
}

/**
 * Utility to asynchronously print the computed type of a TypeScript expression to the console.
 * Useful for quick debugging.
 * 
 * @example
 * ```ts
 * // Quick check what a template literal type resolves to
 * await debugType('`${x}---`'); // Logs the resolved type: "'a---' | 'b---'"
 * ```
 */
export async function debugType(typeExpression: string): Promise<void> {
  console.log(`Type expression: ${typeExpression}`);
  const resolvedType = await resolveType(typeExpression);
  console.log(`Resolved to: ${resolvedType}`);
}

/**
 * Synchronous utility to print the computed type of a TypeScript expression to the console.
 * 
 * @example
 * ```ts
 * // Quick check what a template literal type resolves to synchronously
 * debugTypeSync('`${x}---`'); // Logs the resolved type immediately
 * ```
 */
export function debugTypeSync(typeExpression: string): void {
  console.log(`Type expression: ${typeExpression}`);
  console.log(`Resolved to: ${resolveTypeSync(typeExpression)}`);
}

export default {
  resolveTypeExpression,
  resolveTypeExpressionSync,
  debugType,
  debugTypeSync
};

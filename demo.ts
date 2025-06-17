import { resolveTypeExpression } from "./hook"

// The example types you provided
type x = "a" | "b" | "c" | "d"
type y = `${x}---`

async function runDemo() {
  console.log("--- ASYNC METHODS ---")

  // Method 1: Using the async resolveTypeExpression function
  console.log("Resolving template literal type with resolveTypeExpression:")
  const resolvedType = await resolveTypeExpression("`${x}---`")
  console.log("Resolved type:", resolvedType) // Should output: "'a---' | 'b---'"

  // // Method 2: Using the async debugType helper (logs directly to console)
  // console.log('\nDebugging template literal type with debugType:');
  // await debugType('`${x}---`');

  // // You can also use it to check other complex types
  // console.log('\nTesting with other complex types:');
  // await debugType('Extract<string | number | boolean, string | number>');
  // await debugType('Omit<{ name: string; age: number; email: string }, "email">');

  // console.log('\n--- SYNC METHODS ---');

  // // Method 3: Using the sync resolveTypeExpressionSync function
  // console.log('Resolving template literal type with resolveTypeExpressionSync:');
  // const syncResolvedType = resolveTypeExpressionSync('`${x}---`');
  // console.log('Resolved type (sync):', syncResolvedType);

  // // Method 4: Using the debugTypeSync helper
  // console.log('\nDebugging template literal type with debugTypeSync:');
  // debugTypeSync('`${x}---`');
}

// Run the demo
runDemo().catch(console.error)

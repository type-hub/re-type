#!/usr/bin/env node
import path from 'path';
import fs from 'fs';
import { ImportRegistry } from './services/ImportRegistry';

/**
 * Script to run all classes in the project
 * Usage: npx ts-node src/run.ts
 */

// Helper function to recursively find all TypeScript files
async function findAllTsFiles(directory: string): Promise<string[]> {
  const files: string[] = [];
  
  const items = await fs.promises.readdir(directory, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(directory, item.name);
    
    if (item.isDirectory()) {
      files.push(...await findAllTsFiles(fullPath));
    } else if (item.name.endsWith('.ts') && !item.name.endsWith('.d.ts') && item.name !== 'run.ts') {
      files.push(fullPath);
    }
  }
  
  return files;
}


// This function will simply check if the file is readable (exists and accessible)
// We won't actually import the modules but instead just report on their existence
function checkModule(filePath: string): boolean {
  try {
    fs.accessSync(filePath, fs.constants.R_OK);
    return true;
  } catch (error) {
    console.error(`Error accessing ${filePath}:`, error instanceof Error ? error.message : String(error));
    return false;
  }
}

// Main function to analyze TypeScript files
async function analyzeTypeScriptFiles(): Promise<void> {
  console.log('🔍 Analyzing TypeScript files in the project...');
  
  // Find all TypeScript files in the classes directory
  const classesDir = path.resolve(process.cwd(), 'src', 'classses');
  const tsFiles = await findAllTsFiles(classesDir);
  
  console.log(`Found ${tsFiles.length} TypeScript files`);
  
  // Track accessible and inaccessible files
  const results = {
    accessible: 0,
    inaccessible: 0,
    files: [] as Array<{path: string, accessible: boolean}>
  };
  
  // Check each file
  for (const file of tsFiles) {
    const accessible = checkModule(file);
    
    if (accessible) {
      results.accessible++;
      results.files.push({
        path: file,
        accessible: true
      });
      
      // Read the file to analyze its structure
      try {
        const content = fs.readFileSync(file, 'utf-8');
        const className = extractClassName(content);
        const methodNames = extractMethodNames(content);
        
        console.log(`✅ ${path.relative(process.cwd(), file)}:`);
        if (className) {
          console.log(`   Class: ${className}`);
        }
        if (methodNames.length > 0) {
          console.log(`   Methods: ${methodNames.join(', ')}`);
        }
      } catch (error) {
        console.log(`   Could not analyze file: ${error instanceof Error ? error.message : String(error)}`);
      }
    } else {
      results.inaccessible++;
      results.files.push({
        path: file,
        accessible: false
      });
      console.log(`❌ Inaccessible: ${path.relative(process.cwd(), file)}`);
    }
  }
  
    // Print import registry contents
  console.log('\n📋 Import Registry contents:');
  console.log(ImportRegistry.getImports());
  
  // Summary
  console.log('\n📊 Summary:');
  console.log(`Total files processed: ${tsFiles.length}`);
  console.log(`Accessible files: ${results.accessible}`);
  console.log(`Inaccessible files: ${results.inaccessible}`);
}

// Helper functions to extract class and method information from file content
function extractClassName(content: string): string | null {
  const classMatch = content.match(/class\s+(\w+)/);
  return classMatch ? classMatch[1] : null;
}

function extractMethodNames(content: string): string[] {
  const methodMatches = content.matchAll(/(?:public|private|protected)?\s*(\w+)\s*\([^)]*\)\s*(?::\s*[\w<>|&]+)?\s*\{/g);
  const methods: string[] = [];
  
  for (const match of methodMatches) {
    if (match[1] && !['constructor', 'if', 'for', 'while', 'switch'].includes(match[1])) {
      methods.push(match[1]);
    }
  }
  
  return methods;
}

// Run the script
analyzeTypeScriptFiles().catch(error => {
  console.error('Error running script:', error);
  process.exit(1);
});

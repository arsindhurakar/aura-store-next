#!/usr/bin/env node

/**
 * Analyzes a target file or component to extract testable units
 * Usage: ts-node scripts/analyze-target.ts <target> <framework>
 */

import { readFileSync, existsSync } from 'fs'
import { join, dirname, extname, basename } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

interface TestableUnit {
  name: string
  type: 'function' | 'method' | 'class' | 'component' | 'route' | 'hook'
  params?: string[]
  returnType?: string
  isAsync?: boolean
  isExported?: boolean
}

interface AnalysisResult {
  target: string
  framework: 'client' | 'server'
  units: TestableUnit[]
  imports: string[]
  hasForms: boolean
  hasQuery: boolean
  hasAuth: boolean
  modelName?: string
}

function analyzeServerFile(content: string): TestableUnit[] {
  const units: TestableUnit[] = []

  // Class methods
  const classMethodRegex = /(?:public|private|protected)?\s*(?:async\s+)?(\w+)\s*\([^)]*\)\s*:?\s*[^{]*\{/g
  let match
  while ((match = classMethodRegex.exec(content)) !== null) {
    const name = match[1]
    if (!['constructor', 'get', 'set'].includes(name)) {
      units.push({
        name,
        type: 'method',
        isAsync: content.slice(match.index - 10, match.index).includes('async'),
        isExported: true,
      })
    }
  }

  // Standalone functions
  const functionRegex = /export\s+(?:async\s+)?function\s+(\w+)\s*\(/g
  while ((match = functionRegex.exec(content)) !== null) {
    units.push({
      name: match[1],
      type: 'function',
      isAsync: match[0].includes('async'),
      isExported: true,
    })
  }

  // Arrow function exports
  const arrowRegex = /export\s+const\s+(\w+)\s*=\s*(?:async\s+)?\(/g
  while ((match = arrowRegex.exec(content)) !== null) {
    units.push({
      name: match[1],
      type: 'function',
      isAsync: match[0].includes('async'),
      isExported: true,
    })
  }

  return units
}

function analyzeClientFile(content: string): TestableUnit[] {
  const units: TestableUnit[] = []

  // React component (function)
  const componentRegex = /export\s+(?:default\s+)?(?:function|const)\s+(\w+)\s*(?:=|\().*?=>/g
  let match
  while ((match = componentRegex.exec(content)) !== null) {
    units.push({
      name: match[1],
      type: 'component',
      isExported: true,
    })
  }

  // Custom hooks
  const hookRegex = /export\s+(?:function|const)\s+(use\w+)\s*(?:=|\().*?=>/g
  while ((match = hookRegex.exec(content)) !== null) {
    units.push({
      name: match[1],
      type: 'hook',
      isExported: true,
    })
  }

  return units
}

function extractImports(content: string): string[] {
  const imports: string[] = []
  const importRegex = /import\s+.*?\s+from\s+['"]([^'"]+)['"]/g
  let match
  while ((match = importRegex.exec(content)) !== null) {
    imports.push(match[1])
  }
  return imports
}

function detectFeatures(content: string): { hasForms: boolean; hasQuery: boolean; hasAuth: boolean; modelName?: string } {
  const hasForms = /react-hook-form|useForm|zod|z\.object/.test(content)
  const hasQuery = /@tanstack\/react-query|useQuery|useMutation|QueryClient/.test(content)
  const hasAuth = /next-auth|useSession|getServerSession/.test(content)

  // Detect Prisma model name
  const modelMatch = content.match(/prisma\.(\w+)\./)
  const modelName = modelMatch ? modelMatch[1] : undefined

  return { hasForms, hasQuery, hasAuth, modelName }
}

function main() {
  const args = process.argv.slice(2)
  if (args.length < 2) {
    console.error('Usage: analyze-target.ts <target> <framework>')
    process.exit(1)
  }

  const [target, framework] = args
  const fullPath = join(process.cwd(), target)

  if (!existsSync(fullPath)) {
    // Try with common extensions
    const extensions = ['.ts', '.tsx', '.js', '.jsx']
    let found = false
    for (const ext of extensions) {
      if (existsSync(fullPath + ext)) {
        fullPath + ext
        found = true
        break
      }
    }
    if (!found) {
      console.error(`File not found: ${target}`)
      process.exit(1)
    }
  }

  const content = readFileSync(fullPath, 'utf-8')
  const ext = extname(fullPath)

  let units: TestableUnit[]
  if (framework === 'server' || ext === '.ts') {
    units = analyzeServerFile(content)
  } else {
    units = analyzeClientFile(content)
  }

  const imports = extractImports(content)
  const features = detectFeatures(content)

  const result: AnalysisResult = {
    target: basename(fullPath, ext),
    framework: framework as 'client' | 'server',
    units,
    imports,
    ...features,
  }

  console.log(JSON.stringify(result, null, 2))
}

main()
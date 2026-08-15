#!/usr/bin/env node

/**
 * Main test generation script
 * Usage: ts-node scripts/generate.ts --type=unit --target=src/routes/products.ts --framework=server
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join, dirname, basename, extname } from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

interface Args {
  type: 'unit' | 'integration' | 'component' | 'e2e'
  target: string
  framework: 'client' | 'server'
  watch?: boolean
}

function parseArgs(): Args {
  const args = process.argv.slice(2)
  const result: Partial<Args> = {
    type: 'unit',
  }

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg.startsWith('--type=')) result.type = arg.split('=')[1] as Args['type']
    else if (arg.startsWith('--target=')) result.target = arg.split('=')[1]
    else if (arg.startsWith('--framework=')) result.framework = arg.split('=')[1] as Args['framework']
    else if (arg === '--watch') result.watch = true
    else if (!result.target) result.target = arg
    else if (!result.framework) result.framework = arg as 'client' | 'server'
  }

  if (!result.target || !result.framework) {
    console.error('Usage: generate.ts --type=unit --target=<file> --framework=<client|server>')
    process.exit(1)
  }

  return result as Args
}

interface AnalysisResult {
  target: string
  framework: 'client' | 'server'
  units: Array<{ name: string; type: string; isAsync?: boolean }>
  imports: string[]
  hasForms: boolean
  hasQuery: boolean
  hasAuth: boolean
  modelName?: string
}

function runAnalysis(target: string, framework: 'client' | 'server'): AnalysisResult {
  try {
    const output = execSync(
      `ts-node ${join(__dirname, 'analyze-target.ts')} "${target}" "${framework}"`,
      { encoding: 'utf-8', cwd: process.cwd() }
    )
    return JSON.parse(output.trim())
  } catch (e) {
    console.warn('Analysis failed, using defaults:', e)
    return {
      target: basename(target, extname(target)),
      framework,
      units: [],
      imports: [],
      hasForms: false,
      hasQuery: false,
      hasAuth: false,
    }
  }
}

function loadTemplate(type: Args['type']): string {
  const templatePath = join(__dirname, '..', 'templates', `${type}.test.ts.j2`)
  if (!existsSync(templatePath)) {
    throw new Error(`Template not found: ${templatePath}`)
  }
  return readFileSync(templatePath, 'utf-8')
}

function renderTemplate(template: string, data: Record<string, any>): string {
  // Simple template rendering (Jinja2-like)
  let result = template

  // Handle conditionals {% if condition %}...{% endif %}
  result = result.replace(
    /\{%\s*if\s+(\w+)\s*%\}([\s\S]*?)\{%\s*endif\s*%\}/g,
    (_, condition, content) => (data[condition] ? content : '')
  )

  // Handle loops {% for item in items %}...{% endfor %}
  result = result.replace(
    /\{%\s*for\s+(\w+)\s+in\s+(\w+)\s*%\}([\s\S]*?)\{%\s*endfor\s*%\}/g,
    (_, itemVar, arrayVar, content) => {
      const items = data[arrayVar] || []
      return items.map((item: any) => {
        let itemContent = content
        // Replace {{item.prop}} in loop content
        itemContent = itemContent.replace(
          new RegExp(`\\{\\{\\s*${itemVar}\\.(\\w+)\\s*\\}\\}`, 'g'),
          (_, prop) => item[prop] ?? ''
        )
        // Replace {{item.prop.subprop}}
        itemContent = itemContent.replace(
          new RegExp(`\\{\\{\\s*${itemVar}\\.(\\w+)\\.(\\w+)\\s*\\}\\}`, 'g'),
          (_, prop1, prop2) => item[prop1]?.[prop2] ?? ''
        )
        return itemContent
      }).join('\n')
    }
  )

  // Replace variables {{variable}}
  result = result.replace(/\{\{\s*(\w+(?:\.\w+)*)\s*\}\}/g, (_, path) => {
    const keys = path.split('.')
    let value: any = data
    for (const key of keys) {
      value = value?.[key]
      if (value === undefined) return `{{${path}}}`
    }
    return value ?? `{{${path}}}`
  })

  return result
}

function buildTemplateData(analysis: AnalysisResult, args: Args): Record<string, any> {
  const targetName = analysis.target
  const isServer = args.framework === 'server'

  // First unit as primary target
  const primaryUnit = analysis.units[0] || { name: 'handler', type: 'function', isAsync: true }
  const modelName = analysis.modelName || (isServer ? 'model' : '')

  return {
    // Common
    targetName,
    componentName: targetName,
    routeName: targetName.replace(/Route$/, ''),
    flowName: targetName.replace(/Flow$/, ''),
    testUtilsPath: isServer ? '../../test-utils' : '@/test-utils',
    appImport: isServer ? '../src/app' : '',
    componentImport: isServer ? '' : `../components/${targetName}`,
    model: modelName.toLowerCase(),
    methodName: primaryUnit.name,
    method: primaryUnit.name,
    methodLower: primaryUnit.name.toLowerCase(),

    // Unit test specific
    targetImport: isServer ? `../src/${args.target.replace(/\.ts$/, '')}` : `../${targetName}`,
    inputExample: '{ id: "test-id" }',
    expectedExample: '{ id: "test-id", name: "Test" }',
    expectedCallArgs: '{ where: { id: "test-id" } }',
    expectedBehavior: 'return expected result',
    errorCondition: 'record not found',
    errorMessage: 'Not found',

    // Integration test specific
    path: `/api/${targetName.toLowerCase().replace(/route$/, '')}`,
    expectedResponse: 'success',
    mockResponse: '{ id: "test-id", name: "Test" }',
    expectedBody: '{ success: true, data: { id: "test-id", name: "Test" } }',
    requestBody: '{ name: "Test" }',
    invalidBody: '{ name: "" }',
    auth: analysis.hasAuth,
    validToken: 'test-jwt-token',

    // Component test specific
    role: 'region',
    expectedContent: 'expected content',
    expectedText: 'Expected Text',
    defaultProps: '{}',
    interaction: 'click',
    buttonLabel: 'Submit',
    hasForms: analysis.hasForms,
    fieldLabel: 'Email',
    invalidValue: 'invalid-email',
    hasQuery: analysis.hasQuery,
    queryName: targetName,
    mockData: '{ items: [] }',

    // E2E specific
    startUrl: `/${targetName.toLowerCase()}`,
    finalUrl: `/${targetName.toLowerCase()}/success`,
    step2Description: 'perform action',
    steps: [
      { action: 'click', selector: '[data-testid="next"]', expect: { target: 'toHaveText', selector: 'h1', matcher: 'toContainText', value: 'Step 2' } },
    ],
    errorScenario: 'invalid input',
    errorUrl: `/${targetName.toLowerCase()}`,
    errorAction: { action: 'click', selector: '[data-testid="submit"]' },
    errorMessage: 'Validation failed',
    testUser: { email: 'test@example.com', password: 'password123' },
    afterLoginUrl: '/dashboard',
  }
}

function getOutputPath(args: Args, analysis: AnalysisResult): string {
  const baseDir = args.framework === 'server' ? 'server/__tests__' : 'client/src/__tests__'
  const dir = join(process.cwd(), baseDir)

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }

  const ext = args.type === 'component' ? '.test.tsx' : '.test.ts'
  const name = analysis.target.replace(/\.(ts|tsx)$/, '')
  return join(dir, `${name}${ext}`)
}

function main() {
  const args = parseArgs()
  console.log(`Generating ${args.type} test for ${args.target} (${args.framework})...`)

  const analysis = runAnalysis(args.target, args.framework)
  const template = loadTemplate(args.type)
  const data = buildTemplateData(analysis, args)
  const rendered = renderTemplate(template, data)
  const outputPath = getOutputPath(args, analysis)

  writeFileSync(outputPath, rendered)
  console.log(`✓ Generated: ${outputPath}`)

  if (args.watch) {
    console.log('Watch mode not implemented yet')
  }
}

main()
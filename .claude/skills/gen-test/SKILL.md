---
name: gen-test
description: Generate test files with Vitest templates for client and server
disable-model-invocation: true
args_schema:
  type: object
  properties:
    type:
      type: string
      enum: [unit, integration, e2e, component]
      default: unit
      description: Type of test to generate
    target:
      type: string
      description: File or component to test (e.g., "src/routes/products.ts" or "ProductCard")
    framework:
      type: string
      enum: [client, server]
      description: Target framework (client = Next.js, server = Express)
    watch:
      type: boolean
      default: false
      description: Watch mode
  required: []
---

# gen-test Skill

Generate test files using Vitest with project-specific templates.

## Usage
```bash
# Unit test for server route
/gen-test --type=unit --target=src/routes/products.ts --framework=server

# Component test for React component
/gen-test --type=component --target=ProductCard --framework=client

# Integration test for API
/gen-test --type=integration --target=src/controllers/auth.ts --framework=server

# E2E test (Playwright)
/gen-test --type=e2e --target=checkout-flow --framework=client
```

## What It Does
1. Analyzes target file/component for testable units
2. Generates test file with proper imports, mocks, and assertions
3. Uses project-specific patterns (Prisma mocking, Radix UI testing, TanStack Query)
4. Places in `__tests__/` (server) or `*.test.tsx` (client)

## Templates Used
- `templates/unit.test.ts.j2` - Server unit test (Vitest + Prisma mock)
- `templates/integration.test.ts.j2` - Server integration test (Express + Supertest)
- `templates/component.test.tsx.j2` - Client component test (Vitest + React Testing Library)
- `templates/e2e.test.ts.j2` - E2E test (Playwright)
- `templates/prisma-mock.ts.j2` - Prisma client mock factory
- `templates/test-utils.tsx.j2` - Client test utilities (providers, render)

## Scripts
- `scripts/generate.ts` - Main generation logic
- `scripts/analyze-target.ts` - Extracts testable units from source
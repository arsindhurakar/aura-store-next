---
name: api-doc
description: Generate OpenAPI spec from Express routes + Zod schemas
disable-model-invocation: true
args_schema:
  type: object
  properties:
    route:
      type: string
      description: Specific route to document (e.g., "products")
    method:
      type: string
      enum: [GET, POST, PUT, PATCH, DELETE]
      description: HTTP method to filter
    output:
      type: string
      default: "openapi.yaml"
      description: Output file path
    watch:
      type: boolean
      default: false
      description: Watch for changes and regenerate
  required: []
---

# api-doc Skill

Generate/update OpenAPI 3.1 spec from Express routes and Zod schemas.

## Usage
```bash
# Generate full spec
/api-doc

# Generate for specific route
/api-doc --route=products --method=GET

# Watch mode for development
/api-doc --watch
```

## What It Does
1. Scans `src/routes/` for Express route handlers
2. Finds Zod schemas in `src/schemas/` or inline
3. Maps to OpenAPI 3.1 specification
4. Outputs `openapi.yaml` (or custom path)

## Templates Used
- `templates/openapi.yaml.j2` - Main OpenAPI document template
- `templates/path-item.yaml.j2` - Individual path template
- `templates/schema.yaml.j2` - Zod→OpenAPI schema template

## Scripts
- `scripts/generate.ts` - Main generation script
- `scripts/zod-to-openapi.ts` - Zod to OpenAPI converter
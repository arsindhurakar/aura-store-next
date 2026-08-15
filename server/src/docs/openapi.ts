import type { OpenAPIV3_1 } from "openapi-types";

export const openApiSpec: OpenAPIV3_1.Document = {
  openapi: "3.1.0",
  info: {
    title: "Aura Store API",
    version: "1.0.0",
    description:
      "Product catalog API for Aura Store. Covers product listing, lookup, " +
      "and admin management (create/update/delete).",
  },
  servers: [
    { url: "http://localhost:4000", description: "Local development" },
    { url: "https://api.aurastore.com", description: "Production" },
  ],
  tags: [{ name: "Products", description: "Product catalog operations" }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Access token issued by the auth service.",
      },
    },
    schemas: {
      Category: {
        type: "string",
        enum: ["phones", "audio", "wearables", "accessories"],
        description: "Top-level product category.",
      },
      StockStatus: {
        type: "string",
        enum: ["in_stock", "low_stock", "out_of_stock"],
        description: "Current inventory status.",
      },
      ProductResponse: {
        type: "object",
        required: [
          "id",
          "name",
          "slug",
          "price",
          "salePrice",
          "description",
          "tagline",
          "category",
          "brand",
          "stockStatus",
          "images",
          "featured",
          "createdAt",
          "updatedAt",
        ],
        properties: {
          id: { type: "string", examples: ["clx1a2b3c4d5e6f"] },
          name: { type: "string", examples: ["AuraPhone 15 Pro"] },
          slug: { type: "string", examples: ["auraphone-15-pro"] },
          price: { type: "number", minimum: 0, examples: [999.99] },
          salePrice: {
            type: ["number", "null"],
            minimum: 0,
            examples: [899.99, null],
          },
          description: {
            type: "string",
            examples: ["Flagship phone with a titanium frame and Pro camera."],
          },
          tagline: {
            type: ["string", "null"],
            examples: ["Pro. Beyond.", null],
          },
          category: { $ref: "#/components/schemas/Category" },
          brand: { type: "string", examples: ["Aura"] },
          stockStatus: { $ref: "#/components/schemas/StockStatus" },
          images: {
            type: "array",
            items: { type: "string", format: "uri" },
            examples: [
              [
                "https://cdn.aurastore.com/products/auraphone-15-pro-1.jpg",
                "https://cdn.aurastore.com/products/auraphone-15-pro-2.jpg",
              ],
            ],
          },
          featured: { type: "boolean", examples: [false] },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      CreateProductRequest: {
        type: "object",
        required: [
          "name",
          "price",
          "description",
          "category",
          "brand",
          "stockStatus",
          "images",
        ],
        properties: {
          name: { type: "string", minLength: 2 },
          price: { type: "number", exclusiveMinimum: 0 },
          salePrice: { type: "number", exclusiveMinimum: 0 },
          description: { type: "string", minLength: 10 },
          tagline: { type: "string" },
          category: { $ref: "#/components/schemas/Category" },
          brand: { type: "string", minLength: 2 },
          stockStatus: { $ref: "#/components/schemas/StockStatus" },
          images: {
            type: "array",
            items: { type: "string", format: "uri" },
            minItems: 1,
          },
          featured: { type: "boolean", default: false },
        },
        examples: [
          {
            name: "AuraPhone 15 Pro",
            price: 999.99,
            salePrice: 899.99,
            description: "Flagship phone with a titanium frame and Pro camera.",
            tagline: "Pro. Beyond.",
            category: "phones",
            brand: "Aura",
            stockStatus: "in_stock",
            images: [
              "https://cdn.aurastore.com/products/auraphone-15-pro-1.jpg",
              "https://cdn.aurastore.com/products/auraphone-15-pro-2.jpg",
            ],
            featured: true,
          },
        ],
      },
      UpdateProductRequest: {
        description:
          "All fields are optional. At least one field must be provided.",
        type: "object",
        properties: {
          name: { type: "string", minLength: 2 },
          price: { type: "number", exclusiveMinimum: 0 },
          salePrice: { type: "number", exclusiveMinimum: 0 },
          description: { type: "string", minLength: 10 },
          tagline: { type: "string" },
          category: { $ref: "#/components/schemas/Category" },
          brand: { type: "string", minLength: 2 },
          stockStatus: { $ref: "#/components/schemas/StockStatus" },
          images: {
            type: "array",
            items: { type: "string", format: "uri" },
            minItems: 1,
          },
          featured: { type: "boolean" },
        },
      },
      ErrorResponse: {
        type: "object",
        required: ["success", "error"],
        properties: {
          success: { type: "boolean", enum: [false] },
          error: {
            type: "object",
            required: ["message"],
            properties: {
              message: { type: "string" },
              code: { type: "string" },
              details: {},
            },
          },
        },
      },
    },
    responses: {
      Unauthorized: {
        description: "Missing or invalid authentication token.",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorResponse" },
            examples: {
              unauthorized: {
                summary: "Missing token",
                value: {
                  success: false,
                  error: {
                    message: "Authentication token is required",
                    code: "UNAUTHORIZED",
                  },
                },
              },
            },
          },
        },
      },
      NotFound: {
        description: "Resource not found.",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorResponse" },
            examples: {
              notFound: {
                summary: "Product not found",
                value: {
                  success: false,
                  error: { message: "Record not found", code: "NOT_FOUND" },
                },
              },
            },
          },
        },
      },
      ValidationError: {
        description: "Request validation failed.",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorResponse" },
            examples: {
              validation: {
                summary: "Invalid body",
                value: {
                  success: false,
                  error: {
                    message: "Description is too short",
                    code: "VALIDATION_ERROR",
                    details: [
                      {
                        path: ["description"],
                        message: "Description is too short",
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
      Conflict: {
        description: "Resource conflicts with an existing record.",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorResponse" },
            examples: {
              conflict: {
                summary: "Duplicate slug",
                value: {
                  success: false,
                  error: {
                    message: "A record with this slug already exists",
                    code: "CONFLICT",
                    details: { fields: ["slug"] },
                  },
                },
              },
            },
          },
        },
      },
      InternalError: {
        description: "Unexpected server error.",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorResponse" },
            examples: {
              internal: {
                value: {
                  success: false,
                  error: {
                    message: "Internal server error",
                    code: "INTERNAL_ERROR",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  paths: {
    "/api/products": {
      get: {
        tags: ["Products"],
        summary: "List all products",
        operationId: "listProducts",
        security: [],
        responses: {
          "200": {
            description: "List of products.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["success", "data"],
                  properties: {
                    success: { type: "boolean", enum: [true] },
                    data: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/ProductResponse",
                      },
                    },
                  },
                },
                examples: {
                  list: {
                    value: {
                      success: true,
                      data: [
                        {
                          id: "clx1a2b3c4d5e6f",
                          name: "AuraPhone 15 Pro",
                          slug: "auraphone-15-pro",
                          price: 999.99,
                          salePrice: 899.99,
                          description:
                            "Flagship phone with a titanium frame and Pro camera.",
                          tagline: "Pro. Beyond.",
                          category: "phones",
                          brand: "Aura",
                          stockStatus: "in_stock",
                          images: [
                            "https://cdn.aurastore.com/products/auraphone-15-pro-1.jpg",
                          ],
                          featured: true,
                          createdAt: "2026-08-01T10:00:00.000Z",
                          updatedAt: "2026-08-01T10:00:00.000Z",
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
      post: {
        tags: ["Products"],
        summary: "Create a product",
        operationId: "createProduct",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateProductRequest" },
            },
          },
        },
        responses: {
          "201": {
            description: "Product created.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["success", "data"],
                  properties: {
                    success: { type: "boolean", enum: [true] },
                    data: {
                      $ref: "#/components/schemas/ProductResponse",
                    },
                  },
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/ValidationError" },
          "401": { $ref: "#/components/responses/Unauthorized" },
          "409": { $ref: "#/components/responses/Conflict" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },
    "/api/products/{id}": {
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Product ID (lowercase alphanumeric).",
          schema: { type: "string", pattern: "^[a-z0-9]+$" },
        },
      ],
      get: {
        tags: ["Products"],
        summary: "Get a product by ID",
        operationId: "getProductById",
        security: [],
        responses: {
          "200": {
            description: "The requested product.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["success", "data"],
                  properties: {
                    success: { type: "boolean", enum: [true] },
                    data: {
                      $ref: "#/components/schemas/ProductResponse",
                    },
                  },
                },
              },
            },
          },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
      patch: {
        tags: ["Products"],
        summary: "Update a product",
        operationId: "updateProduct",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UpdateProductRequest" },
            },
          },
        },
        responses: {
          "200": {
            description: "The updated product.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["success", "data"],
                  properties: {
                    success: { type: "boolean", enum: [true] },
                    data: {
                      $ref: "#/components/schemas/ProductResponse",
                    },
                  },
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/ValidationError" },
          "401": { $ref: "#/components/responses/Unauthorized" },
          "404": { $ref: "#/components/responses/NotFound" },
          "409": { $ref: "#/components/responses/Conflict" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
      delete: {
        tags: ["Products"],
        summary: "Delete a product",
        operationId: "deleteProduct",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "The deleted product.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["success", "data"],
                  properties: {
                    success: { type: "boolean", enum: [true] },
                    data: {
                      $ref: "#/components/schemas/ProductResponse",
                    },
                  },
                },
              },
            },
          },
          "401": { $ref: "#/components/responses/Unauthorized" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },
    "/api/products/slug/{slug}": {
      parameters: [
        {
          name: "slug",
          in: "path",
          required: true,
          description: "URL-friendly product slug (kebab-case).",
          schema: {
            type: "string",
            pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$",
          },
        },
      ],
      get: {
        tags: ["Products"],
        summary: "Get a product by slug",
        operationId: "getProductBySlug",
        security: [],
        responses: {
          "200": {
            description: "The requested product.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["success", "data"],
                  properties: {
                    success: { type: "boolean", enum: [true] },
                    data: {
                      $ref: "#/components/schemas/ProductResponse",
                    },
                  },
                },
              },
            },
          },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },
  },
};

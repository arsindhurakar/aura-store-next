import type { OpenAPIV3_1 } from "openapi-types";

export const openApiSpec: OpenAPIV3_1.Document = {
  openapi: "3.1.0",
  info: {
    title: "Aura Store API",
    version: "1.0.0",
    description:
      "Product catalog and authentication API for Aura Store. Covers product " +
      "listing, lookup, admin management (create/update/delete), and the " +
      "auth service (register, login, token refresh, logout).",
  },
  servers: [
    { url: "http://localhost:4000", description: "Local development" },
    { url: "https://api.aurastore.com", description: "Production" },
  ],
  tags: [
    { name: "Products", description: "Product catalog operations" },
    { name: "Auth", description: "Authentication and session management" },
  ],
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
      UserRole: {
        type: "string",
        enum: ["admin"],
        description: "Role assigned to the user.",
      },
      UserResponse: {
        type: "object",
        required: [
          "id",
          "firstName",
          "lastName",
          "email",
          "role",
          "createdAt",
          "updatedAt",
        ],
        properties: {
          id: { type: "string", examples: ["clp1a2b3c4d5e6f"] },
          firstName: { type: "string", examples: ["Ada"] },
          lastName: { type: "string", examples: ["Lovelace"] },
          email: { type: "string", format: "email", examples: ["ada@example.com"] },
          role: { $ref: "#/components/schemas/UserRole" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      AuthTokens: {
        type: "object",
        required: ["accessToken", "refreshToken"],
        properties: {
          accessToken: {
            type: "string",
            description: "Short-lived JWT used to authorize requests.",
            examples: ["eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."],
          },
          refreshToken: {
            type: "string",
            description:
              "Long-lived token used to obtain new access tokens. Rotate on use.",
            examples: ["eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."],
          },
        },
      },
      AuthResponse: {
        type: "object",
        required: ["user", "tokens"],
        properties: {
          user: { $ref: "#/components/schemas/UserResponse" },
          tokens: { $ref: "#/components/schemas/AuthTokens" },
        },
      },
      RegisterRequest: {
        type: "object",
        required: ["firstName", "lastName", "email", "password"],
        properties: {
          firstName: {
            type: "string",
            minLength: 2,
            examples: ["Ada"],
          },
          lastName: {
            type: "string",
            minLength: 2,
            examples: ["Lovelace"],
          },
          email: {
            type: "string",
            format: "email",
            examples: ["ada@example.com"],
          },
          password: {
            type: "string",
            minLength: 8,
            examples: ["sup3rsecret"],
          },
          role: {
            type: "string",
            enum: ["admin"],
            default: "admin",
            description: "Role for the new account. Defaults to admin.",
          },
        },
        examples: [
          {
            firstName: "Ada",
            lastName: "Lovelace",
            email: "ada@example.com",
            password: "sup3rsecret",
          },
        ],
      },
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            format: "email",
            examples: ["ada@example.com"],
          },
          password: { type: "string", examples: ["sup3rsecret"] },
        },
        examples: [
          {
            email: "ada@example.com",
            password: "sup3rsecret",
          },
        ],
      },
      RefreshRequest: {
        type: "object",
        required: ["refreshToken"],
        properties: {
          refreshToken: {
            type: "string",
            description: "A valid (non-revoked, unexpired) refresh token.",
            examples: ["eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."],
          },
        },
        examples: [{ refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }],
      },
      NullData: {
        type: "null",
        description: "No data returned (successful operation with empty response body).",
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
    "/api/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register a new user",
        operationId: "register",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/RegisterRequest" },
            },
          },
        },
        responses: {
          "201": {
            description: "The newly created user.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["success", "data"],
                  properties: {
                    success: { type: "boolean", enum: [true] },
                    data: {
                      $ref: "#/components/schemas/UserResponse",
                    },
                  },
                },
                examples: {
                  registered: {
                    value: {
                      success: true,
                      data: {
                        id: "clp1a2b3c4d5e6f",
                        firstName: "Ada",
                        lastName: "Lovelace",
                        email: "ada@example.com",
                        role: "admin",
                        createdAt: "2026-08-16T10:00:00.000Z",
                        updatedAt: "2026-08-16T10:00:00.000Z",
                      },
                    },
                  },
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/ValidationError" },
          "409": { $ref: "#/components/responses/Conflict" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },
    "/api/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Log in and obtain tokens",
        operationId: "login",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginRequest" },
            },
          },
        },
        responses: {
          "200": {
            description: "The authenticated user and issued tokens.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["success", "data"],
                  properties: {
                    success: { type: "boolean", enum: [true] },
                    data: {
                      $ref: "#/components/schemas/AuthResponse",
                    },
                  },
                },
                examples: {
                  loggedIn: {
                    value: {
                      success: true,
                      data: {
                        user: {
                          id: "clp1a2b3c4d5e6f",
                          firstName: "Ada",
                          lastName: "Lovelace",
                          email: "ada@example.com",
                          role: "admin",
                          createdAt: "2026-08-16T10:00:00.000Z",
                          updatedAt: "2026-08-16T10:00:00.000Z",
                        },
                        tokens: {
                          accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                          refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/ValidationError" },
          "401": { $ref: "#/components/responses/Unauthorized" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },
    "/api/auth/logout": {
      post: {
        tags: ["Auth"],
        summary: "Revoke a refresh session",
        operationId: "logout",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/RefreshRequest" },
            },
          },
        },
        responses: {
          "200": {
            description: "The refresh session was revoked.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["success", "data"],
                  properties: {
                    success: { type: "boolean", enum: [true] },
                    data: { $ref: "#/components/schemas/NullData" },
                  },
                },
                examples: {
                  loggedOut: {
                    value: { success: true, data: null },
                  },
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/ValidationError" },
          "401": { $ref: "#/components/responses/Unauthorized" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },
    "/api/auth/refresh": {
      post: {
        tags: ["Auth"],
        summary: "Refresh an access token",
        operationId: "refresh",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/RefreshRequest" },
            },
          },
        },
        responses: {
          "200": {
            description: "A new access token and rotated refresh token.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["success", "data"],
                  properties: {
                    success: { type: "boolean", enum: [true] },
                    data: {
                      $ref: "#/components/schemas/AuthTokens",
                    },
                  },
                },
                examples: {
                  refreshed: {
                    value: {
                      success: true,
                      data: {
                        accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                        refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                      },
                    },
                  },
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/ValidationError" },
          "401": { $ref: "#/components/responses/Unauthorized" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },
  },
};

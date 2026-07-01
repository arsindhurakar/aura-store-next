export const config = {
  port: process.env.PORT ?? 3000,
  databaseUrl: process.env.DATABASE_URL,
  jwtIssuer: process.env.JWT_ISSUER ?? "aura-store",
  jwtAudience: process.env.JWT_AUDIENCE ?? "aura-store-api",
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET ?? "",
  jwtAccessSecretExpiresIn: process.env.JWT_ACCESS_SECRET_EXPIRES_IN ?? "15m",
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET ?? "",
  jwtRefreshSecretExpiresIn: process.env.JWT_REFRESH_SECRET_EXPIRES_IN ?? "7d",
};

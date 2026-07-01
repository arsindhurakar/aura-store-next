import { AccessTokenPayload } from "./auth.types.js";

export {};

declare global {
  namespace Express {
    interface Request {
      user?: AccessTokenPayload;
    }
  }
}

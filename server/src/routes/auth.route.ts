import { Router } from "express";

import {
  login,
  logout,
  refresh,
  register,
} from "@/controllers/auth.controller.js";
import { validateBody } from "@/middlewares/validator.js";
import {
  registerSchema,
  loginSchema,
  refreshSessionSchema,
} from "@/schemas/auth.schema.js";

const authRouter = Router();

authRouter.post("/register", validateBody(registerSchema), register);
authRouter.post("/login", validateBody(loginSchema), login);
authRouter.post("/logout", validateBody(refreshSessionSchema), logout);
authRouter.post("/refresh", validateBody(refreshSessionSchema), refresh);

export default authRouter;

import { Router } from "express";

import {
  login,
  logout,
  refresh,
  register,
} from "@/controllers/auth.controller.js";
import { validate } from "@/middlewares/validator.js";
import {
  registerSchema,
  loginSchema,
  refreshSessionSchema,
} from "@/schemas/auth.schema.js";

const authRouter = Router();

authRouter.post("/register", validate(registerSchema), register);
authRouter.post("/login", validate(loginSchema), login);
authRouter.post("/logout", logout);
authRouter.post("/refresh", validate(refreshSessionSchema), refresh);

export default authRouter;

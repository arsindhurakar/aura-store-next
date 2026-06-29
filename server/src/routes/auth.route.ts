import { Router } from "express";

import { login, register } from "@/controllers/auth.controller.js";
import { validate } from "@/middlewares/validator.js";
import { registerSchema, loginSchema } from "@/schemas/auth.schema.js";

const authRouter = Router();

authRouter.post("/register", validate(registerSchema), register);
authRouter.post("/login", validate(loginSchema), login);

export default authRouter;

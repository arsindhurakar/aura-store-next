import type { Request, Response } from "express";

import { IAuthService } from "@/interfaces/auth/auth.service.interface.js";
import { authService } from "@/services/auth.service.js";
import { asyncHandler } from "@/utils/async-handler.js";
import { ok } from "@/utils/response.js";

const service: IAuthService = authService;

export const register = asyncHandler(async (req: Request, res: Response) => {
  const data = await service.register(req.body);

  res.status(201).json(ok(data));
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const data = await service.login(req.body);

  res.json(ok(data));
});

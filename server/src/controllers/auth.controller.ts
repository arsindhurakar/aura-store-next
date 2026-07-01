import type { Request, Response } from "express";

import { IAuthService } from "@/interfaces/auth/auth.service.interface.js";
import { authService } from "@/services/auth.service.js";
import { asyncHandler } from "@/utils/async-handler.js";
import { ok } from "@/utils/response.js";
import { RefreshSessionRequest, RequestMeta } from "@/types/auth.types.js";

const service: IAuthService = authService;

function getRequestMeta(req: Request): RequestMeta {
  return {
    ipAddress: req.ip,
    userAgent: req.headers["user-agent"],
    deviceName: req.headers["x-device-name"] as string | undefined,
  };
}

export const register = asyncHandler(async (req: Request, res: Response) => {
  const data = await service.register(req.body);

  res.status(201).json(ok(data));
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const data = await service.login(req.body, {
    meta: getRequestMeta(req),
  });

  res.json(ok(data));
});

export const logout = asyncHandler(async (_req: Request, res: Response) => {
  const data = await service.logout();

  res.json(ok(data));
});

export const refresh = asyncHandler(
  async (req: Request<{}, {}, RefreshSessionRequest>, res: Response) => {
    const data = await service.refresh(req.body, {
      meta: getRequestMeta(req),
    });

    res.json(ok(data));
  },
);

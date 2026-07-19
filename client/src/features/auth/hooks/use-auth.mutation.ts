"use client";

import { useRouter } from "next/navigation";

import { authService } from "@/features/auth/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export function useLogin() {
  return useMutation({
    mutationFn: authService.login,
  });
}

export function useLogout() {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      router.replace("/admin");
    },
  });
}

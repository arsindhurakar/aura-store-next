"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Lock } from "lucide-react";
import { toast } from "sonner";

import { loginSchema, type LoginInput } from "@/lib/validators";
import { authService } from "@/features/auth/services/auth.service";

export default function AdminLoginPage() {
  const router = useRouter();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const login = useMutation({
    mutationFn: ({ email, password }: LoginInput) =>
      authService.login(email, password),

    onSuccess: () => {
      router.push("/admin/dashboard");
    },

    onError: () => {
      toast.error("Invalid credentials");
    },
  });

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-sidebar p-12 md:flex">
        <Link href="/" className="font-display text-2xl">
          NOIR <span className="ml-1 text-eyebrow">/ admin</span>
        </Link>

        <div
          className="absolute inset-0 -z-10"
          style={{ background: "var(--gradient-hero)" }}
        />

        <div>
          <div className="text-eyebrow">Operations</div>

          <h2 className="mt-4 font-display text-5xl tracking-tight text-balance">
            The store, in your hands.
          </h2>

          <p className="mt-4 max-w-sm text-muted-foreground">
            Inventory, orders, settings — managed from one quiet, premium
            console.
          </p>
        </div>

        <div className="text-xs text-muted-foreground">© NOIR Devices</div>
      </div>

      <div className="flex items-center justify-center p-8 sm:p-12">
        <form
          onSubmit={form.handleSubmit((data) => login.mutate(data))}
          className="w-full max-w-sm"
        >
          <div className="text-eyebrow">Sign in</div>

          <h1 className="mt-3 font-display text-4xl tracking-tight">
            Welcome back.
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Any credentials work in this demo.
          </p>

          <div className="mt-10 space-y-5">
            <label className="block">
              <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
                Email
              </div>

              <input
                {...form.register("email")}
                className={input}
                placeholder="admin@noir.com"
              />

              {form.formState.errors.email && (
                <div className="mt-1.5 text-xs text-destructive">
                  {form.formState.errors.email.message}
                </div>
              )}
            </label>

            <label className="block">
              <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
                Password
              </div>

              <input
                type="password"
                {...form.register("password")}
                className={input}
                placeholder="••••••••"
              />

              {form.formState.errors.password && (
                <div className="mt-1.5 text-xs text-destructive">
                  {form.formState.errors.password.message}
                </div>
              )}
            </label>
          </div>

          <button
            type="submit"
            disabled={login.isPending}
            className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-sm font-medium text-background transition hover:opacity-90 disabled:opacity-50"
          >
            {login.isPending ? (
              "Signing in…"
            ) : (
              <>
                Sign in
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Lock className="h-3 w-3" />
            Encrypted demo session
          </div>
        </form>
      </div>
    </div>
  );
}

const input =
  "w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-accent/30";

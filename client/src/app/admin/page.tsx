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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldLabel } from "@/components/common/FieldLabel";
import { FieldError } from "@/components/common/FieldError";

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
      toast.success("Welcome back");
      router.push("/admin/dashboard");
    },

    onError: () => {
      toast.error("Invalid credentials");
    },
  });

  const onSubmit = (data: LoginInput) => {
    login.mutate(data);
  };

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      {/* LEFT SIDE */}
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
            Inventory, orders, settings — managed from one quiet, premium console.
          </p>
        </div>

        <div className="text-xs text-muted-foreground">
          © NOIR Devices
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center p-8 sm:p-12">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-sm"
        >
          <div className="text-eyebrow">Sign in</div>

          <h1 className="mt-3 font-display text-4xl tracking-tight">
            Welcome back.
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Any credentials work in this demo.
          </p>

          {/* FIELDS */}
          <div className="mt-10 space-y-5">
            {/* EMAIL */}
            <div>
              <FieldLabel>Email</FieldLabel>

              <Input
                {...form.register("email")}
                placeholder="admin@noir.com"
                className={fieldClass}
              />

              <FieldError
                error={form.formState.errors.email?.message}
              />
            </div>

            {/* PASSWORD */}
            <div>
              <FieldLabel>Password</FieldLabel>

              <Input
                type="password"
                {...form.register("password")}
                placeholder="••••••••"
                className={fieldClass}
              />

              <FieldError
                error={form.formState.errors.password?.message}
              />
            </div>
          </div>

          {/* SUBMIT */}
          <Button
            type="submit"
            disabled={login.isPending}
            size="lg"
            className="mt-8 w-full"
          >
            {login.isPending ? (
              "Signing in..."
            ) : (
              <>
                Sign in
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>

          {/* FOOTER NOTE */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Lock className="h-3 w-3" />
            Encrypted demo session
          </div>
        </form>
      </div>
    </div>
  );
}

const fieldClass =
  "mt-2 h-12";
"use client";

import LoginForm from "@/components/login-form";
import { useSearchParams } from "next/navigation";

export function LoginPageClient() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  return <LoginForm redirect={redirect} />;
}

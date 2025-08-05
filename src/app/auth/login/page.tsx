import { LoginPageClient } from "./_client";
import { Suspense } from "react";

export default async function LoginPage() {
  return (
    <Suspense>
      <LoginPageClient />;
    </Suspense>
  );
}

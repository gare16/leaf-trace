import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  // Validasi jika belum login redirect ke login pagew
  if (!token) {
    redirect("/auth/login");
  } else redirect("/dashboard");
}

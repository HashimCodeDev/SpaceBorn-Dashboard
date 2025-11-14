import { redirect } from "next/navigation";
import { getAccessToken } from "@/lib/auth";

export default async function Page() {
  const token = await getAccessToken();

  // If user is authenticated, redirect to dashboard
  if (token) {
    redirect("/dashboard");
  }

  // If not authenticated, redirect to login
  redirect("/login");
}

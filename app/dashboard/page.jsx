import { redirect } from "next/navigation";
import { getAccessToken } from "@/lib/auth";
import Dashboard from "@/components/Dashboard";

export default async function Page() {
  const token = await getAccessToken();
  if (!token) redirect("/login");
  return <Dashboard />;
}

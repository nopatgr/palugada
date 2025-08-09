import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/admin/login");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>Selamat datang, {session.user.email}</p>
    </div>
  );
}

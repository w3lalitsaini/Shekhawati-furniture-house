import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "admin") {
    redirect("/login?unauthorized=true");
  }

  return (
    <div className="flex min-h-screen bg-[#fbfbe2]">
      <AdminSidebar />
      <div className="flex-1 lg:pl-64">
        <header className="sticky top-0 z-30 bg-[#fbfbe2]/80 backdrop-blur-xl border-b border-[#d4c3be]/15 px-8 py-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl text-[#442a22]">Admin Panel</h2>
            <div className="flex items-center gap-3">
              <span className="font-sans text-sm text-[#5e604d]">{session.user?.name}</span>
              <div className="w-8 h-8 rounded-full bg-[#442a22] flex items-center justify-center text-white font-sans text-sm">
                {session.user?.name?.[0] || "A"}
              </div>
            </div>
          </div>
        </header>
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

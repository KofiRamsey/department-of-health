import { Sidebar } from "@/components/admin/Sidebar";
import { MobileNav } from "@/components/admin/MobileNav";
import { requireRole } from "@/lib/auth-utils";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side role check
  await requireRole(["ADMIN"]);
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <MobileNav />
      <main className="md:ml-64 flex-1 flex flex-col pt-16 md:pt-0">
        {children}
      </main>
    </div>
  );
} 
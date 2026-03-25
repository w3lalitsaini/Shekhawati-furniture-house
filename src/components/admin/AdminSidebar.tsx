"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingBag, Users, FolderTree, ArrowLeft } from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { label: "Categories", href: "/admin/categories", icon: FolderTree },
  { label: "Users", href: "/admin/users", icon: Users },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-linear-to-b from-surface-high to-black text-secondary z-40 hidden lg:flex flex-col border-r border-white/5">
      <div className="p-6 border-b border-white/5">
        <h2 className="font-serif text-lg text-white font-bold">Shekhawati</h2>
        <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-bold">Furniture House Admin</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-md font-sans text-sm transition-colors ${
                isActive
                  ? "bg-primary/20 text-primary font-bold"
                  : "hover:bg-white/5 text-secondary hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5" strokeWidth={1.5} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <Link href="/" className="flex items-center gap-2 font-sans text-sm text-secondary hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </Link>
      </div>
    </aside>
  );
}

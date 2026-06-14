import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { LayoutDashboard, Package, Image as ImageIcon, Tv } from "lucide-react";

const sidebarLinks = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Hero", href: "/admin/hero", icon: Tv },
  { label: "Media", href: "/admin/media", icon: ImageIcon },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Allow login page through without auth
  if (!session?.user) {
    // We can't check pathname server-side in layout easily,
    // so the login page handles its own layout
  }

  return (
    <div className="min-h-screen bg-void flex">
      {session?.user && (
        <aside className="w-60 bg-surface border-r border-border-subtle flex flex-col">
          <div className="p-6">
            <Link
              href="/admin/dashboard"
              className="font-display text-xl font-bold text-white tracking-tight"
            >
              CTOWN
            </Link>
            <p className="font-mono text-[10px] uppercase tracking-widest text-text-mono mt-1">
              Admin Panel
            </p>
          </div>
          <nav className="flex-1 px-3">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm text-text-secondary hover:text-white hover:bg-surface-raised rounded-sm transition-colors mb-0.5"
                >
                  <Icon size={16} />
                  <span className="font-body">{link.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-border-subtle">
            <p className="font-mono text-[10px] text-text-mono truncate">
              {session.user.email}
            </p>
          </div>
        </aside>
      )}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}

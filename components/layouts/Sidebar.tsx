"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { LayoutDashboard, Users, Shield, ChevronLeft, ChevronRight, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { path: "/dashboard", label: "仪表盘", icon: LayoutDashboard },
  { path: "/users/list", label: "用户列表", icon: Users },
  { path: "/users/roles", label: "角色管理", icon: Shield },
];

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onDesktopToggle: () => void;
  onMobileClose: () => void;
  onNavigate?: () => void;
}

export function Sidebar({
  collapsed,
  mobileOpen,
  onDesktopToggle,
  onMobileClose,
  onNavigate,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-50 flex h-screen w-60 -translate-x-full flex-col border-r border-white/40 glass shadow-2xl transition-[width,transform] duration-300 lg:translate-x-0 lg:shadow-none",
        mobileOpen && "translate-x-0",
        collapsed ? "lg:w-[72px]" : "lg:w-60"
      )}
    >
      <div
        className={cn(
          "relative flex h-16 items-center border-b border-black/5 px-4",
          collapsed && "lg:justify-center lg:px-3"
        )}
      >
        <button
          type="button"
          onClick={onDesktopToggle}
          aria-label="展开侧边栏"
          className={cn(
            "group relative hidden h-11 w-11 items-center justify-center rounded-xl transition-colors duration-200 hover:bg-black/5 focus-visible:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/30 lg:flex",
            !collapsed && "lg:hidden"
          )}
        >
          <Image
            src="/logo.png"
            alt="Omnity Logo"
            width={46}
            height={46}
            className="rounded-lg transition-opacity duration-200 group-hover:opacity-0 group-focus-visible:opacity-0"
          />
          <span className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/70 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
            <ChevronRight className="w-5 h-5 text-macos-text" />
          </span>
        </button>

        <div className={cn("flex items-center gap-3", collapsed && "lg:hidden")}>
          <Image
            src="/logo.png"
            alt="Omnity Logo"
            width={46}
            height={46}
            className="rounded-lg"
          />
          <span className="font-serif text-xl font-semibold tracking-tight text-macos-text">
            Omnity
          </span>
        </div>

        <button
          type="button"
          onClick={onMobileClose}
          aria-label="关闭侧边栏"
          className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-macos-gray transition-colors duration-200 hover:bg-black/5 hover:text-macos-text lg:hidden"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={onDesktopToggle}
          aria-label="收起侧边栏"
          className={cn(
            "absolute right-4 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-macos-gray transition-colors duration-200 hover:bg-black/5 hover:text-macos-text lg:flex",
            collapsed && "lg:hidden"
          )}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              onClick={onNavigate}
              className={cn(
                "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 mb-1",
                isActive
                  ? "bg-gradient-to-br from-[#F97316] to-[#EA580C] text-white"
                  : "text-macos-text hover:bg-black/5",
                collapsed && "lg:justify-center"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className={cn("ml-3", collapsed && "lg:hidden")}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-black/5 p-3">
        <div className={cn("flex", collapsed && "lg:justify-center")}>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg text-macos-gray transition-colors duration-200 hover:bg-black/5 hover:text-macos-text">
            <Settings className="w-5 h-5" />
          </div>
        </div>
      </div>
    </aside>
  );
}

"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layouts/Sidebar";
import { Header } from "@/components/layouts/Header";
import Breadcrumb from "@/components/common/Breadcrumb";
import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDesktopSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-macos-bg relative">
      <GridPattern
        width={40}
        height={40}
        className="absolute inset-0 stroke-orange-500/20 [mask-image:radial-gradient(white,transparent_85%)]"
      />
      <button
        type="button"
        aria-label="关闭侧边栏遮罩"
        className={cn(
          "fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden",
          mobileOpen ? "block" : "hidden"
        )}
        onClick={() => setMobileOpen(false)}
      />
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onDesktopToggle={toggleDesktopSidebar}
        onMobileClose={() => setMobileOpen(false)}
        onNavigate={() => setMobileOpen(false)}
      />
      <Header
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onMobileMenuClick={() => setMobileOpen((prev) => !prev)}
      />

      <main 
        className={cn(
          "relative min-h-screen pt-16 transition-[margin] duration-300",
          collapsed ? "lg:ml-[72px]" : "lg:ml-60"
        )}
      >
        <div className="p-4 sm:p-6">
          <Breadcrumb />
          {children}
        </div>
      </main>
    </div>
  );
}

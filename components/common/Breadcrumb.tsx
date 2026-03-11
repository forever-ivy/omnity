"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutDashboard, Users } from "lucide-react";
import {
  Breadcrumb as BreadcrumbRoot,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const pathMap: Record<string, { title: string; icon?: typeof Home }> = {
  "/": { title: "首页", icon: Home },
  "/dashboard": { title: "仪表盘", icon: LayoutDashboard },
  "/users": { title: "用户管理", icon: Users },
  "/users/list": { title: "用户列表" },
  "/users/roles": { title: "角色管理" },
};

export default function Breadcrumb() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  const items: Array<{ path: string; title: string; icon?: typeof Home }> = [{ path: "/", title: "首页", icon: Home }];

  let currentPath = "";
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`;
    const config = pathMap[currentPath];
    if (config) {
      items.push({ path: currentPath, title: config.title, icon: config.icon });
    }
  });

  return (
    <div className="mb-6">
      <BreadcrumbRoot>
        <BreadcrumbList className="text-sm">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const Icon = item.icon;

            return (
              <div key={item.path} className="flex items-center">
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="flex items-center gap-1.5 text-macos-text font-medium">
                      {Icon && <Icon className="w-4 h-4" />}
                      {item.title}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={item.path} className="flex items-center gap-1.5 text-macos-text-secondary hover:text-macos-orange transition-colors">
                        {Icon && <Icon className="w-4 h-4" />}
                        {item.title}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator className="text-macos-gray-light" />}
              </div>
            );
          })}
        </BreadcrumbList>
      </BreadcrumbRoot>
    </div>
  );
}

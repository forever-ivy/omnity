"use client";

import { Bell, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onMobileMenuClick: () => void;
}

export function Header({
  collapsed,
  mobileOpen,
  onMobileMenuClick,
}: HeaderProps) {
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-white/40 px-4 glass transition-[left] duration-300 sm:px-6",
        collapsed ? "lg:left-[72px]" : "lg:left-60"
      )}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onMobileMenuClick}
        aria-label={mobileOpen ? "关闭侧边栏" : "打开侧边栏"}
        className="lg:hidden"
      >
        {mobileOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
      </Button>

      <div className="flex gap-4 ml-auto">
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback>管</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">管理员</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>我的账户</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>个人资料</DropdownMenuItem>
            <DropdownMenuItem>设置</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">退出登录</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

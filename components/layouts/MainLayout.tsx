"use client";

import React, { useState, useCallback } from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import { Header } from "./Header";
import Breadcrumb from "../common/Breadcrumb";
import {
  useSidebarVisibility,
  useHeaderVisibility,
  useContainerClassName,
  useBreadcrumbVisibility,
} from "@/lib/hooks/useLayout";

const { Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const showSidebar = useSidebarVisibility();
  const showHeader = useHeaderVisibility();
  const showBreadcrumb = useBreadcrumbVisibility();
  const containerClassName = useContainerClassName();

  const toggleSidebar = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  // 场景1：最简布局
  if (!showSidebar && !showHeader) {
    return <div className={containerClassName}>{children}</div>;
  }

  // 场景2：仅头部布局
  if (!showSidebar && showHeader) {
    return (
      <Layout className="min-h-screen">
        <Header showMenuButton={false} />
        <Content className="bg-gray-50 min-h-[calc(100vh-64px)] overflow-auto">
          <div className={containerClassName}>
            {showBreadcrumb && <Breadcrumb />}
            {children}
          </div>
        </Content>
      </Layout>
    );
  }

  // 场景3：完整布局
  return (
    <Layout className="min-h-screen">
      <Sidebar collapsed={collapsed} />
      <Layout>
        {/* 固定 margin，避免动画问题 */}
        <Header
          showMenuButton={true}
          onMenuClick={toggleSidebar}
          collapsed={collapsed}
        />
        <Content className="bg-white min-h-[calc(100vh-64px)] overflow-auto">
          <div className={containerClassName}>
            {showBreadcrumb && <Breadcrumb />}
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

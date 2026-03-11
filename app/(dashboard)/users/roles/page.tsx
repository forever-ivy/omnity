"use client";

import { useState } from "react";
import { Plus, Eye, Pencil, Trash2, Settings } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/common/DataTable";
import { formatDate } from "@/lib/utils";

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  status: "active" | "inactive";
  createdAt: string;
}

export default function RoleManagement() {
  const [roles, setRoles] = useState<Role[]>([
    { id: "1", name: "超级管理员", description: "拥有系统所有权限", permissions: ["user:read", "user:write", "role:read", "role:write", "system:admin"], userCount: 2, status: "active", createdAt: "2024-01-01T00:00:00Z" },
    { id: "2", name: "普通管理员", description: "拥有用户管理权限", permissions: ["user:read", "user:write"], userCount: 5, status: "active", createdAt: "2024-01-02T00:00:00Z" },
    { id: "3", name: "访客", description: "只读权限", permissions: ["user:read"], userCount: 10, status: "active", createdAt: "2024-01-03T00:00:00Z" },
  ]);

  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const handleDelete = (record: Role) => {
    if (record.userCount > 0) {
      toast.warning("该角色下还有用户，无法删除");
      return;
    }
    if (confirm(`确定要删除角色 "${record.name}" 吗？`)) {
      setRoles((prev) => prev.filter((r) => r.id !== record.id));
      toast.success("删除成功");
    }
  };

  const columns = [
    { key: "name", title: "角色名称" },
    { key: "description", title: "描述" },
    {
      key: "permissions",
      title: "权限数量",
      render: (perms: string[]) => <Badge variant="secondary">{perms.length}</Badge>,
    },
    {
      key: "userCount",
      title: "用户数量",
      render: (count: number) => <Badge variant={count > 0 ? "default" : "outline"}>{count}</Badge>,
    },
    {
      key: "status",
      title: "状态",
      render: (status: string) => (
        <Badge variant={status === "active" ? "default" : "outline"}>
          {status === "active" ? "启用" : "禁用"}
        </Badge>
      ),
    },
    {
      key: "createdAt",
      title: "创建时间",
      render: (date: string) => formatDate(date),
    },
    {
      key: "action",
      title: "操作",
      render: (_: any, record: Role) => (
        <div className="flex items-center gap-1">
          <Button variant="link" size="sm" onClick={() => { setSelectedRole(record); setDetailOpen(true); }}>
            <Eye className="w-4 h-4 mr-1" /> 查看
          </Button>
          <Button variant="link" size="sm" onClick={() => toast.info(`编辑角色: ${record.name}`)}>
            <Pencil className="w-4 h-4 mr-1" /> 编辑
          </Button>
          <Button variant="link" size="sm" onClick={() => toast.info(`配置权限: ${record.name}`)}>
            <Settings className="w-4 h-4 mr-1" /> 权限
          </Button>
          <Button variant="link" size="sm" className="text-destructive" onClick={() => handleDelete(record)} disabled={record.userCount > 0}>
            <Trash2 className="w-4 h-4 mr-1" /> 删除
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        title="角色管理"
        dataSource={roles}
        columns={columns}
        onSearch={(v) => console.log("搜索角色:", v)}
        onRefresh={() => {
          toast.success("刷新成功");
        }}
        searchPlaceholder="搜索角色名称或描述"
        extra={
          <Button onClick={() => toast.info("跳转到新增角色页面")}>
            <Plus className="w-4 h-4 mr-1" /> 新增角色
          </Button>
        }
      />

      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>角色详情</DialogTitle>
          </DialogHeader>
          {selectedRole && (
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-macos-gray">角色名称</span><span>{selectedRole.name}</span></div>
              <Separator />
              <div className="flex justify-between"><span className="text-macos-gray">描述</span><span>{selectedRole.description}</span></div>
              <Separator />
              <div className="flex justify-between"><span className="text-macos-gray">状态</span><Badge variant={selectedRole.status === "active" ? "default" : "outline"}>{selectedRole.status === "active" ? "启用" : "禁用"}</Badge></div>
              <Separator />
              <div className="flex justify-between"><span className="text-macos-gray">用户数量</span><Badge variant="secondary">{selectedRole.userCount}</Badge></div>
              <Separator />
              <div><span className="text-macos-gray">权限列表</span><div className="flex flex-wrap gap-2 mt-2">{selectedRole.permissions.map((p) => <Badge key={p} variant="secondary">{p}</Badge>)}</div></div>
              <Separator />
              <div className="flex justify-between"><span className="text-macos-gray">创建时间</span><span>{formatDate(selectedRole.createdAt)}</span></div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

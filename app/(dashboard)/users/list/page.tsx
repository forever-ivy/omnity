"use client";

import { useState } from "react";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/common/DataTable";
import { formatDate } from "@/lib/utils";
import type { User } from "@/lib/types";

export default function UserListPage() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "张三", email: "zhangsan@example.com", roleId: 1, roleName: "Admin", status: "active", createdAt: "2024-01-15T10:30:00Z", updatedAt: "2024-01-15T10:30:00Z" },
    { id: 2, name: "李四", email: "lisi@example.com", roleId: 2, roleName: "User", status: "active", createdAt: "2024-01-16T14:20:00Z", updatedAt: "2024-01-16T14:20:00Z" },
    { id: 3, name: "王五", email: "wangwu@example.com", roleId: 2, roleName: "User", status: "inactive", createdAt: "2024-01-17T09:15:00Z", updatedAt: "2024-01-17T09:15:00Z" },
  ]);

  const handleDelete = (record: User) => {
    if (confirm(`确定要删除用户 "${record.name}" 吗？`)) {
      setUsers((prev) => prev.filter((u) => u.id !== record.id));
      toast.success("删除成功");
    }
  };

  const columns = [
    { key: "name", title: "姓名" },
    { key: "email", title: "邮箱" },
    {
      key: "roleName",
      title: "角色",
      render: (roleName: string, record: User) => (
        <Badge variant={record.roleId === 1 ? "destructive" : "secondary"}>
          {roleName === "Admin" ? "管理员" : "普通用户"}
        </Badge>
      ),
    },
    {
      key: "status",
      title: "状态",
      render: (status: string) => (
        <Badge variant={status === "active" ? "default" : "outline"}>
          {status === "active" ? "激活" : "禁用"}
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
      render: (_: any, record: User) => (
        <div className="flex items-center gap-1">
          <Button variant="link" size="sm" onClick={() => toast.info(`查看用户: ${record.name}`)}>
            <Eye className="w-4 h-4 mr-1" /> 查看
          </Button>
          <Button variant="link" size="sm" onClick={() => toast.info(`编辑用户: ${record.name}`)}>
            <Pencil className="w-4 h-4 mr-1" /> 编辑
          </Button>
          <Button variant="link" size="sm" className="text-destructive" onClick={() => handleDelete(record)}>
            <Trash2 className="w-4 h-4 mr-1" /> 删除
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      title="用户列表"
      dataSource={users}
      columns={columns}
      onSearch={(v) => console.log("搜索:", v)}
      onRefresh={() => {
        toast.success("刷新成功");
      }}
      extra={
        <Button onClick={() => toast.info("跳转到新增用户页面")}>
          <Plus className="w-4 h-4 mr-1" /> 新增用户
        </Button>
      }
    />
  );
}

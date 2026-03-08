"use client";

import React, { useState } from "react";
import { App, Button, Tag, Space } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { MainLayout } from "@/components/layouts/MainLayout";
import { PageLayoutProvider } from "@/lib/hooks/useLayout";
import { DataTable } from "@/components/common/DataTable";
import { formatDate } from "@/lib/utils";
import type { User, UserStatus, UserRole } from "@/lib/types";

export default function UserListPage() {
  const { message: messageApi, modal } = App.useApp();
  const [loading, setLoading] = useState(false);

  // 模拟用户数据
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "张三",
      email: "zhangsan@example.com",
      role: "admin",
      status: "active",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-15T10:30:00Z",
    },
    {
      id: "2",
      name: "李四",
      email: "lisi@example.com",
      role: "user",
      status: "active",
      createdAt: "2024-01-16T14:20:00Z",
      updatedAt: "2024-01-16T14:20:00Z",
    },
    {
      id: "3",
      name: "王五",
      email: "wangwu@example.com",
      role: "user",
      status: "inactive",
      createdAt: "2024-01-17T09:15:00Z",
      updatedAt: "2024-01-17T09:15:00Z",
    },
  ]);

  // 处理用户操作
  const handleView = (record: User) => {
    messageApi.info(`查看用户: ${record.name}`);
  };

  const handleEdit = (record: User) => {
    messageApi.info(`编辑用户: ${record.name}`);
  };

  const handleDelete = (record: User) => {
    modal.confirm({
      title: "确认删除",
      content: `确定要删除用户 "${record.name}" 吗？`,
      okText: "确认",
      cancelText: "取消",
      onOk() {
        setUsers((prev) => prev.filter((user) => user.id !== record.id));
        messageApi.success("删除成功");
      },
    });
  };

  const handleAdd = () => {
    messageApi.info("跳转到新增用户页面");
  };

  const handleSearch = (value: string) => {
    console.log("搜索:", value);
    // TODO: 调用 API 进行搜索
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      messageApi.success("刷新成功");
    }, 1000);
  };

  // 表格列配置
  const columns: ColumnsType<User> = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "角色",
      dataIndex: "role",
      key: "role",
      render: (role: UserRole) => (
        <Tag color={role === "admin" ? "red" : "blue"}>
          {role === "admin" ? "管理员" : "普通用户"}
        </Tag>
      ),
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status: UserStatus) => (
        <Tag color={status === "active" ? "green" : "default"}>
          {status === "active" ? "激活" : "禁用"}
        </Tag>
      ),
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => formatDate(date),
    },
    {
      title: "操作",
      key: "action",
      width: 180,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          >
            查看
          </Button>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button
            type="link"
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <PageLayoutProvider config={{ title: "用户列表" }}>
      <MainLayout>
        <DataTable
          title="用户列表"
          dataSource={users}
          columns={columns}
          loading={loading}
          rowKey="id"
          onSearch={handleSearch}
          onRefresh={handleRefresh}
          extra={
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              新增用户
            </Button>
          }
        />
      </MainLayout>
    </PageLayoutProvider>
  );
}

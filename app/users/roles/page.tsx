"use client";

import React, { useState } from "react";
import { App, Button, Tag, Space, Modal, Descriptions, Badge } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { MainLayout } from "@/components/layouts/MainLayout";
import { PageLayoutProvider } from "@/lib/hooks/useLayout";
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
  const { message: messageApi, modal } = App.useApp();
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<Role[]>([
    {
      id: "1",
      name: "超级管理员",
      description: "拥有系统所有权限",
      permissions: [
        "user:read",
        "user:write",
        "role:read",
        "role:write",
        "system:admin",
      ],
      userCount: 2,
      status: "active",
      createdAt: "2024-01-01T00:00:00Z",
    },
    {
      id: "2",
      name: "普通管理员",
      description: "拥有用户管理权限",
      permissions: ["user:read", "user:write"],
      userCount: 5,
      status: "active",
      createdAt: "2024-01-02T00:00:00Z",
    },
    {
      id: "3",
      name: "访客",
      description: "只读权限",
      permissions: ["user:read"],
      userCount: 10,
      status: "active",
      createdAt: "2024-01-03T00:00:00Z",
    },
  ]);

  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const handleView = (record: Role) => {
    setSelectedRole(record);
    setDetailModalVisible(true);
  };

  const handleEdit = (record: Role) => {
    messageApi.info(`编辑角色: ${record.name}`);
  };

  const handleDelete = (record: Role) => {
    if (record.userCount > 0) {
      messageApi.warning("该角色下还有用户，无法删除");
      return;
    }

    modal.confirm({
      title: "确认删除",
      icon: <ExclamationCircleOutlined />,
      content: `确定要删除角色 "${record.name}" 吗？`,
      okText: "确认",
      cancelText: "取消",
      onOk() {
        setRoles((prev) => prev.filter((role) => role.id !== record.id));
        messageApi.success("删除成功");
      },
    });
  };

  const handlePermissions = (record: Role) => {
    messageApi.info(`配置权限: ${record.name}`);
  };

  const handleAdd = () => {
    messageApi.info("跳转到新增角色页面");
  };

  const handleSearch = (value: string) => {
    console.log("搜索角色:", value);
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      messageApi.success("刷新成功");
    }, 1000);
  };

  const columns: ColumnsType<Role> = [
    {
      title: "角色名称",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "描述",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "权限数量",
      dataIndex: "permissions",
      key: "permissions",
      render: (permissions: string[]) => (
        <Badge count={permissions.length} color="blue" />
      ),
      sorter: (a, b) => a.permissions.length - b.permissions.length,
    },
    {
      title: "用户数量",
      dataIndex: "userCount",
      key: "userCount",
      render: (count: number) => (
        <Badge count={count} color={count > 0 ? "green" : "default"} />
      ),
      sorter: (a, b) => a.userCount - b.userCount,
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "active" ? "green" : "default"}>
          {status === "active" ? "启用" : "禁用"}
        </Tag>
      ),
      filters: [
        { text: "启用", value: "active" },
        { text: "禁用", value: "inactive" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => formatDate(date),
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "操作",
      key: "action",
      width: 250,
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
            icon={<SettingOutlined />}
            onClick={() => handlePermissions(record)}
          >
            权限
          </Button>
          <Button
            type="link"
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
            disabled={record.userCount > 0}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <PageLayoutProvider config={{ title: "角色管理" }}>
      <MainLayout>
        <DataTable
          title="角色管理"
          dataSource={roles}
          columns={columns}
          loading={loading}
          rowKey="id"
          onSearch={handleSearch}
          onRefresh={handleRefresh}
          searchPlaceholder="搜索角色名称或描述"
          extra={
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              新增角色
            </Button>
          }
        />

        {/* 角色详情弹窗 */}
        <Modal
          title="角色详情"
          open={detailModalVisible}
          onCancel={() => setDetailModalVisible(false)}
          footer={null}
          width={600}
        >
          {selectedRole && (
            <Descriptions column={1} bordered>
              <Descriptions.Item label="角色名称">
                {selectedRole.name}
              </Descriptions.Item>
              <Descriptions.Item label="描述">
                {selectedRole.description}
              </Descriptions.Item>
              <Descriptions.Item label="状态">
                <Tag
                  color={selectedRole.status === "active" ? "green" : "default"}
                >
                  {selectedRole.status === "active" ? "启用" : "禁用"}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="用户数量">
                <Badge count={selectedRole.userCount} color="blue" />
              </Descriptions.Item>
              <Descriptions.Item label="权限列表">
                <Space wrap>
                  {selectedRole.permissions.map((permission) => (
                    <Tag key={permission} color="blue">
                      {permission}
                    </Tag>
                  ))}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="创建时间">
                {formatDate(selectedRole.createdAt)}
              </Descriptions.Item>
            </Descriptions>
          )}
        </Modal>
      </MainLayout>
    </PageLayoutProvider>
  );
}

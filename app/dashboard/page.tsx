"use client";

import React from "react";
import { Card, Row, Col, Statistic, Progress, List, Avatar, Tag } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import { MainLayout } from "@/components/layouts/MainLayout";
import { PageLayoutProvider } from "@/lib/hooks/useLayout";

export default function Dashboard() {
  const recentActivities = [
    {
      id: 1,
      user: "张三",
      action: "创建了新用户",
      time: "2 分钟前",
      type: "create",
    },
    {
      id: 2,
      user: "李四",
      action: "更新了角色权限",
      time: "5 分钟前",
      type: "update",
    },
    {
      id: 3,
      user: "王五",
      action: "删除了过期数据",
      time: "10 分钟前",
      type: "delete",
    },
  ];

  return (
    <PageLayoutProvider config={{ title: "仪表盘" }}>
      <MainLayout>
        <div className="space-y-6">
          {/* 统计卡片 */}
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="总用户数"
                  value={1128}
                  prefix={<UserOutlined />}
                  suffix={
                    <span className="text-green-500 text-sm">
                      <ArrowUpOutlined /> 12%
                    </span>
                  }
                  valueStyle={{ color: "#3f8600" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="活跃用户"
                  value={856}
                  prefix={<TeamOutlined />}
                  suffix={
                    <span className="text-green-500 text-sm">
                      <ArrowUpOutlined /> 8%
                    </span>
                  }
                  valueStyle={{ color: "#1890ff" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="今日订单"
                  value={93}
                  prefix={<ShoppingCartOutlined />}
                  suffix={
                    <span className="text-red-500 text-sm">
                      <ArrowDownOutlined /> 3%
                    </span>
                  }
                  valueStyle={{ color: "#cf1322" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="总收入"
                  value={112893}
                  prefix={<DollarOutlined />}
                  precision={2}
                  suffix={
                    <span className="text-green-500 text-sm">
                      <ArrowUpOutlined /> 15%
                    </span>
                  }
                  valueStyle={{ color: "#722ed1" }}
                />
              </Card>
            </Col>
          </Row>

          {/* 图表和活动 */}
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={16}>
              <Card title="系统性能" extra={<a href="#">查看详情</a>}>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>CPU 使用率</span>
                      <span>65%</span>
                    </div>
                    <Progress percent={65} status="active" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>内存使用率</span>
                      <span>78%</span>
                    </div>
                    <Progress
                      percent={78}
                      status="active"
                      strokeColor="#52c41a"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>磁盘使用率</span>
                      <span>45%</span>
                    </div>
                    <Progress percent={45} strokeColor="#1890ff" />
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} lg={8}>
              <Card title="最近活动" extra={<a href="#">查看全部</a>}>
                <List
                  itemLayout="horizontal"
                  dataSource={recentActivities}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon={<UserOutlined />} />}
                        title={
                          <div className="flex items-center space-x-2">
                            <span>{item.user}</span>
                            <Tag
                              color={
                                item.type === "create"
                                  ? "green"
                                  : item.type === "update"
                                    ? "blue"
                                    : "red"
                              }
                            >
                              {item.type === "create"
                                ? "新增"
                                : item.type === "update"
                                  ? "更新"
                                  : "删除"}
                            </Tag>
                          </div>
                        }
                        description={
                          <div>
                            <div>{item.action}</div>
                            <div className="text-gray-500 text-xs">
                              {item.time}
                            </div>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </MainLayout>
    </PageLayoutProvider>
  );
}

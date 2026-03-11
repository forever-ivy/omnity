"use client";

import { User, Users, ShoppingCart, DollarSign, ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const recentActivities = [
    { id: 1, user: "张三", action: "创建了新用户", time: "2 分钟前", type: "create" },
    { id: 2, user: "李四", action: "更新了角色权限", time: "5 分钟前", type: "update" },
    { id: 3, user: "王五", action: "删除了过期数据", time: "10 分钟前", type: "delete" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="macos-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-macos-gray">总用户数</p>
                <p className="text-3xl font-bold text-green-600">1,128</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <ArrowUp className="w-3 h-3 mr-1" /> 12%
                </p>
              </div>
              <User className="w-8 h-8 text-macos-gray" />
            </div>
          </CardContent>
        </Card>

        <Card className="macos-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-macos-gray">活跃用户</p>
                <p className="text-3xl font-bold text-blue-600">856</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <ArrowUp className="w-3 h-3 mr-1" /> 8%
                </p>
              </div>
              <Users className="w-8 h-8 text-macos-gray" />
            </div>
          </CardContent>
        </Card>

        <Card className="macos-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-macos-gray">今日订单</p>
                <p className="text-3xl font-bold text-red-600">93</p>
                <p className="text-xs text-red-600 flex items-center mt-1">
                  <ArrowDown className="w-3 h-3 mr-1" /> 3%
                </p>
              </div>
              <ShoppingCart className="w-8 h-8 text-macos-gray" />
            </div>
          </CardContent>
        </Card>

        <Card className="macos-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-macos-gray">总收入</p>
                <p className="text-3xl font-bold text-purple-600">112,893</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <ArrowUp className="w-3 h-3 mr-1" /> 15%
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-macos-gray" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 macos-card">
          <CardHeader>
            <CardTitle>系统性能</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span>CPU 使用率</span>
                <span>65%</span>
              </div>
              <Progress value={65} />
            </div>
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span>内存使用率</span>
                <span>78%</span>
              </div>
              <Progress value={78} />
            </div>
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span>磁盘使用率</span>
                <span>45%</span>
              </div>
              <Progress value={45} />
            </div>
          </CardContent>
        </Card>

        <Card className="macos-card">
          <CardHeader>
            <CardTitle>最近活动</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>{item.user[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{item.user}</span>
                      <Badge variant={item.type === "create" ? "default" : item.type === "update" ? "secondary" : "destructive"}>
                        {item.type === "create" ? "新增" : item.type === "update" ? "更新" : "删除"}
                      </Badge>
                    </div>
                    <p className="text-sm text-macos-gray">{item.action}</p>
                    <p className="text-xs text-macos-gray">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

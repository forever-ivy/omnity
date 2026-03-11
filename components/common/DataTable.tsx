"use client";

import type { Key } from "react";
import { useState } from "react";
import { RefreshCw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Column<T> {
  key: string;
  title: string;
  render?: (value: any, record: T) => React.ReactNode;
}

interface DataTableProps<T> {
  title?: string;// 表格标题
  columns: Column<T>[];
  dataSource: T[];
  extra?: React.ReactNode;// 额外的操作按钮
  showSearch?: boolean;// 是否显示搜索框
  showRefresh?: boolean;// 是否显示刷新按钮
  searchPlaceholder?: string;// 搜索框占位符
  onSearch?: (value: string) => void;// 搜索回调
  onRefresh?: () => void;// 刷新回调
}

export function DataTable<T extends { id: Key }>({
  title,
  columns,
  dataSource,
  extra,
  showSearch = true,
  showRefresh = true,
  searchPlaceholder = "请输入搜索关键词",
  onSearch,
  onRefresh,
}: DataTableProps<T>) {
   // 搜索框的值
  const [searchValue, setSearchValue] = useState("");

  // 处理搜索
  const handleSearch = () => {
    onSearch?.(searchValue);
  };

  return (
    <Card className="macos-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <div className="flex items-center gap-2">
            {showSearch && (
              <div className="flex items-center gap-2">
                <Input
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="w-64"
                />
                <Button size="icon" variant="outline" onClick={handleSearch}>
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            )}
            {showRefresh && (
              <Button size="icon" variant="outline" onClick={onRefresh}>
                <RefreshCw className="w-4 h-4" />
              </Button>
            )}
            {extra}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.key}>{col.title}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataSource.map((record) => (
              <TableRow key={record.id}>
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    {col.render
                      ? col.render((record as any)[col.key], record)
                      : (record as any)[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

// 用户类型定义
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "user" | "guest";
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

// 分页参数类型
export interface PaginationParams {
  current: number; // 当前页码
  pageSize: number; // 每页条数
}

// 分页响应类型
export interface PaginatedResponse<T> {
  list: T[]; // 数据列表
  total: number; // 总条数
  current: number; // 当前页码
  pageSize: number; // 每页条数
}

// 用户状态枚举
export type UserStatus = "active" | "inactive" | "suspended";

// 用户角色枚举
export type UserRole = "admin" | "user" | "guest";

// 用户数据接口
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

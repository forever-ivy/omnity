
/**
 * HTTP 请求配置接口
 * 定义了所有请求需要的参数
 */
export interface RequestConfig {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  params?: Record<string, any>;
  data?: any;
  headers?: Record<string, string>;
  timeout?: number;
}

/**
 * 统一的 API 响应格式
 * 这是后端约定的响应结构
 */
export interface ApiResponse<T = any> {
  data: T; // 实际数据
  message?: string; // 响应消息
  success: boolean; // 是否成功
  total?: number; // 总数（分页时使用）
  page?: number; // 当前页码
  limit?: number; // 每页条数
  code?:number;
}

/**
 * API 错误接口
 */
export interface ApiError {
  code: string; // 错误代码
  message: string; // 错误消息
  details?: any; // 错误详情
}


export interface PaginatedResponse<T = any> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
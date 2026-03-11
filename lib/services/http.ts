import { storageUtils } from "../utils/index";
import {
  API_BASE_URL,
  ERROR_MESSAGES,
  STORAGE_KEYS,
} from "../constants/constant";
import { toast } from "sonner";
import { ApiResponse, RequestConfig, ApiError } from "../types/api";

type RequestInterceptor = (
  config: RequestConfig,
) => RequestConfig | Promise<RequestConfig>;
type ResponseInterceptor = (response: any) => any;
type ErrorInterceptor = (error: any) => any;

/**
 * HTTP 客户端类
 * 支持拦截器、自动重试、错误处理等企业级功能
 */
class HttpClient {
  private baseURL: string;
  private timeout: number;
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];
  private errorInterceptors: ErrorInterceptor[] = [];

  private setupDefaultInterceptors() {
    this.addRequestInterceptor((config) => {
      const token = storageUtils.get(STORAGE_KEYS.TOKEN);
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
      return config;
    });

    this.addResponseInterceptor((response) => {
      if (response instanceof Response) {
        return response.json().then((data) => {
          if (!response.ok) {
            throw new Error(data.message || ERROR_MESSAGES.SERVER_ERROR);
          }
          return data;
        });
      }
      return response;
    });

    // 错误拦截器 - 处理通用错误
    this.addErrorInterceptor((error) => {
      if (error.status === 401) {
        storageUtils.remove(STORAGE_KEYS.TOKEN);
        if (
          typeof window !== "undefined" &&
          !window.location.pathname.includes("/login")
        ) {
          window.location.href = "/login";
        }
        toast.error(ERROR_MESSAGES.UNAUTHORIZED);
      } else if (error.status === 403) {
        toast.error(ERROR_MESSAGES.FORBIDDEN);
      } else {
        toast.error(error.message || ERROR_MESSAGES.UNKNOWN_ERROR);
      }
      throw error;
    });
  }

  // 添加请求拦截器
  addRequestInterceptor(interceptor: RequestInterceptor) {
    this.requestInterceptors.push(interceptor);
  }

  // 添加响应拦截器
  addResponseInterceptor(interceptor: ResponseInterceptor) {
    this.responseInterceptors.push(interceptor);
  }

  // 添加错误拦截器
  addErrorInterceptor(interceptor: ErrorInterceptor) {
    this.errorInterceptors.push(interceptor);
  }

  // 应用请求拦截器
  private async applyRequestInterceptors(
    config: RequestConfig,
  ): Promise<RequestConfig> {
    let finalConfig = config;
    for (const interceptor of this.requestInterceptors) {
      finalConfig = await interceptor(finalConfig);
    }
    return finalConfig;
  }

  // 应用响应拦截器
  private async applyResponseInterceptors(response: any): Promise<any> {
    let finalResponse = response;
    for (const interceptor of this.responseInterceptors) {
      finalResponse = await interceptor(finalResponse);
    }
    return finalResponse;
  }

  // 应用错误拦截器
  private async applyErrorInterceptors(error: any): Promise<any> {
    for (const interceptor of this.errorInterceptors) {
      try {
        await interceptor(error);
      } catch {
        // 拦截器可能会抛出新的错误
      }
    }
  }

  // 构建完整 URL
  private buildURL(url: string, params?: Record<string, any>): string {
    const fullURL = url.startsWith("http") ? url : `${this.baseURL}${url}`;

    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          searchParams.append(key, String(value));
        }
      });
      const queryString = searchParams.toString();
      return queryString ? `${fullURL}?${queryString}` : fullURL;
    }

    return fullURL;
  }

  private async request<T = any>(
    config: RequestConfig,
  ): Promise<ApiResponse<T>> {
    try {
      //1.应用请求拦截（添加认证头）
      const finalConfig = await this.applyRequestInterceptors(config);

      //2.构建请求选项
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...finalConfig.headers,
      };

      const fetchOptions: RequestInit = {
        method: finalConfig.method || "GET",
        headers,
        signal: AbortSignal.timeout(finalConfig.timeout || this.timeout),
      };

      //3.添加请求体（POST,PUT,PATCH请求）
      if (
        finalConfig.data &&
        ["POST", "PUT", "PATCH"].includes(fetchOptions.method!)
      ) {
        if (finalConfig.data instanceof FormData) {
          delete headers["Content-Typr"];
          fetchOptions.body = finalConfig.data;
        } else {
          fetchOptions.body = JSON.stringify(finalConfig.data);
        }
      }

      // 4. 构建完整 URL（包含查询参数）
      const url = this.buildURL(finalConfig.url, finalConfig.params);

      // 5. 发送请求
      const response = await fetch(url, fetchOptions);

      // 6. 应用响应拦截器（处理认证、错误等）
      const data = await this.applyResponseInterceptors(response);

      return data;
    } catch (error: any) {
      // 7. 构建标准错误对象
      const apiError: ApiError = {
        code: error.code || "UNKNOWN_ERROR",
        message: error.message || ERROR_MESSAGES.UNKNOWN_ERROR,
        details: error,
      };

      // 8. 应用错误拦截器（统一错误处理）
      await this.applyErrorInterceptors(apiError);

      throw apiError;
    }
  }

  // GET 请求：获取数据
  async get<T = any>(
    url: string,
    params?: Record<string, any>,
    config?: Partial<RequestConfig>,
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      url,
      method: "GET",
      params,
      ...config,
    });
  }

  // POST 请求：创建数据
  async post<T = any>(
    url: string,
    data?: any,
    config?: Partial<RequestConfig>,
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      url,
      method: "POST",
      data,
      ...config,
    });
  }

  //PUT 请求：更新数据
  async put<T = any>(
    url: string,
    data?: any,
    config?: Partial<RequestConfig>,
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      url,
      method: "PUT",
      data,
      ...config,
    });
  }

  // PATCH 请求：部分更新
  async patch<T = any>(
    url: string,
    data?: any,
    config?: Partial<RequestConfig>,
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      url,
      method: "PATCH",
      data,
      ...config,
    });
  }

  // DELETE 请求：删除数据
  async delete<T = any>(
    url: string,
    config?: Partial<RequestConfig>,
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      url,
      method: "DELETE",
      ...config,
    });
  }

  // 文件上传：支持进度回调
  async upload<T = any>(
    url: string,
    file: File,
    onProgress?: (progress: number) => void,
  ): Promise<ApiResponse<T>> {
    // 使用 XMLHttpRequest 实现文件上传进度监听
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file);

      const xhr = new XMLHttpRequest();

      // 监听上传进度
      if (onProgress) {
        xhr.upload.addEventListener("progress", (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            onProgress(progress);
          }
        });
      }

      // 处理上传完成
      xhr.addEventListener("load", () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } catch {
            reject(new Error("Invalid JSON response"));
          }
        } else {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      });

      // 处理上传错误
      xhr.addEventListener("error", () => {
        reject(new Error("Upload failed"));
      });

      // 添加认证头
      const token = storageUtils.get(STORAGE_KEYS.TOKEN);
      if (token) {
        xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      }

      // 发送请求
      xhr.open("POST", this.buildURL(url));
      xhr.send(formData);
    });
  }

  async download(url: string, filename?: string): Promise<void> {
    try {
      const response = await fetch(this.buildURL(url), {
        headers: {
          Authorization: `Bearer ${storageUtils.get(STORAGE_KEYS.TOKEN)}`,
        },
      });

      if (!response.ok) {
        throw new Error("Download failed");
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename || "download";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      toast.error("文件下载失败");
      throw error;
    }
  }
  constructor(baseURL = API_BASE_URL, timeout = 10000) {
    this.baseURL = baseURL;
    this.timeout = timeout;
    this.setupDefaultInterceptors(); // 设置默认拦截器
  }
}

// 创建默认实例
export const http = new HttpClient();

// 导出类型和实例
export { HttpClient };
export type { ApiResponse };

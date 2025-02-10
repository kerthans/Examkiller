// src/api/config.ts
import axios from 'axios';
import { ApiError } from './errors';

export const API_BASE_URL = 'http://101.201.246.5:8000';
export const API_URL = `${API_BASE_URL}/api`;

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
} as const;

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

export interface HealthCheckResponse {
  status: string;
  database: string;
  timestamp: string;
}

// 创建axios实例
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: DEFAULT_HEADERS,
  timeout: 15000,
  validateStatus: (status) => status < 500,
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    throw new ApiError('请求配置错误', undefined, error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      throw new ApiError(
        error.response.data?.detail || '请求失败',
        error.response.status,
        error.response.data
      );
    }
    if (error.request) {
      throw new ApiError('服务器无响应', undefined, error.request);
    }
    throw new ApiError(error.message || '请求错误', undefined, error);
  }
);

export { axiosInstance };

// 通用错误处理
export function handleApiError(error: unknown, defaultMessage: string): ApiResponse<never> {
  if (error instanceof ApiError) {
    return {
      success: false,
      error: error.message || defaultMessage
    };
  }
  return {
    success: false,
    error: defaultMessage
  };
}
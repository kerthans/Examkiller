// src/api/auth.ts
import { 
    ApiResponse, 
    TokenResponse, 
    axiosInstance, 
    handleApiError 
  } from './config';
  import { ApiError } from './errors';
  
  interface LoginCredentials {
    username: string;
    password: string;
  }
  
  interface RegisterCredentials extends LoginCredentials {
    email: string;
  }
  
  export const authApi = {
    login: async (
      username: string, 
      password: string
    ): Promise<ApiResponse<TokenResponse>> => {
      try {
        const credentials: LoginCredentials = { username, password };
        const response = await axiosInstance.post<TokenResponse>(
          '/login',
          credentials
        );
        return { success: true, data: response.data };
      } catch (error) {
        return handleApiError(error, '登录失败');
      }
    },
  
    register: async (
      username: string,
      email: string,
      password: string
    ): Promise<ApiResponse<TokenResponse>> => {
      try {
        const credentials: RegisterCredentials = { username, email, password };
        const response = await axiosInstance.post<TokenResponse>(
          '/register',
          credentials
        );
        return { success: true, data: response.data };
      } catch (error) {
        if (error instanceof ApiError && error.statusCode === 400) {
          return {
            success: false,
            error: '用户名或邮箱已存在'
          };
        }
        return handleApiError(error, '注册失败');
      }
    }
  };
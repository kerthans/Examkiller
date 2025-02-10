// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */

// // src/lib/auth.ts
// import axios from 'axios';
// import { AuthResponse, UserCredentials, RegisterCredentials } from '@/types/auth';

// interface ApiErrorResponse {
//   detail?: string;
// }

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://101.201.246.5:8000/api';

// const axiosInstance = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//   },
//   withCredentials: true,
//   timeout: 15000,
// });

// // 请求拦截器
// axiosInstance.interceptors.request.use(
//   (config) => {
//     console.log('Request:', {
//       url: config.url,
//       method: config.method,
//       data: config.data,
//       headers: config.headers
//     });
//     return config;
//   },
//   (error) => {
//     console.error('Request Error:', error);
//     return Promise.reject(error);
//   }
// );

// // 响应拦截器
// axiosInstance.interceptors.response.use(
//   (response) => {
//     console.log('Response:', {
//       status: response.status,
//       data: response.data
//     });
//     return response;
//   },
//   (error) => {
//     if (error.response) {
//       console.error('Response Error:', {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message
//       });
//     }
//     return Promise.reject(error);
//   }
// );

// export async function loginUser({ username, password }: UserCredentials): Promise<AuthResponse> {
//   try {
//     const response = await axiosInstance.post<AuthResponse>('/login', {
//       username,
//       password
//     });
//     return response.data;
//   } catch (error) {
//     if (error && typeof error === 'object' && 'response' in error) {
//       const axiosError = error as { response?: { status: number; data?: ApiErrorResponse } };
//       if (axiosError.response) {
//         const detail = axiosError.response.data?.detail;
//         throw new Error(detail || '登录失败，请稍后重试');
//       } else {
//         throw new Error('无法连接到服务器，请检查网络连接');
//       }
//     }
//     throw new Error('登录过程中发生未知错误');
//   }
// }

// export async function registerUser({
//   username,
//   email,
//   password
// }: RegisterCredentials): Promise<AuthResponse> {
//   try {
//     const response = await axiosInstance.post<AuthResponse>('/register', {
//       username,
//       email,
//       password
//     });
//     return response.data;
//   } catch (error) {
//     if (error && typeof error === 'object' && 'response' in error) {
//       const axiosError = error as { response?: { status: number; data?: ApiErrorResponse } };
//       if (axiosError.response) {
//         const detail = axiosError.response.data?.detail;
//         if (axiosError.response.status === 400) {
//           throw new Error(detail || '用户名或邮箱已被注册');
//         }
//         throw new Error(detail || '注册失败，请稍后重试');
//       } else {
//         throw new Error('无法连接到服务器，请检查网络连接');
//       }
//     }
//     throw new Error('注册过程中发生未知错误');
//   }
// }
import { AuthResponse, UserCredentials, RegisterCredentials } from '@/types/auth';

export async function loginUser({ username }: UserCredentials): Promise<AuthResponse> {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    access_token: "demo_token",
    token_type: "bearer",
    user: {
      id: 1,
      username,
      email: `${username}@example.com`
    }
  };
}

export async function registerUser({
  username,
  email
}: RegisterCredentials): Promise<AuthResponse> {
  await new Promise(resolve => setTimeout(resolve, 800));

  return {
    access_token: "demo_token",
    token_type: "bearer",
    user: {
      id: 1,
      username,
      email
    }
  };
}

export type { AuthResponse, UserCredentials, RegisterCredentials };
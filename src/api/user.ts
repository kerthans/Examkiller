// src/api/user.ts
import { 
    ApiResponse, 
    UserProfile, 
    axiosInstance, 
    handleApiError 
  } from './config';
  import { ApiError } from './errors';
  
  export const userApi = {
    getProfile: async (token: string): Promise<ApiResponse<UserProfile>> => {
      try {
        const response = await axiosInstance.get<UserProfile>('/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        return { success: true, data: response.data };
      } catch (error) {
        if (error instanceof ApiError && error.statusCode === 401) {
          return {
            success: false,
            error: 'token已过期或无效，请重新登录'
          };
        }
        return handleApiError(error, '获取用户信息失败');
      }
    }
  };
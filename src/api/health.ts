// src/api/health.ts
import { 
    ApiResponse, 
    HealthCheckResponse, 
    axiosInstance, 
    handleApiError,
    API_BASE_URL 
  } from './config';
  
  export const healthApi = {
    checkHealth: async (): Promise<ApiResponse<HealthCheckResponse>> => {
      try {
        const response = await axiosInstance.get<HealthCheckResponse>(
          `${API_BASE_URL}/health`
        );
        return { success: true, data: response.data };
      } catch (error) {
        return handleApiError(error, '健康检查失败');
      }
    }
  };
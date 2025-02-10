// src/app/test/page.tsx
'use client';

import { useState, useCallback } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { healthApi } from '@/api/health';
import { authApi } from '@/api/auth';
import { userApi } from '@/api/user';
import type { 
  UserProfile, 
  TokenResponse, 
  HealthCheckResponse,
  ApiResponse 
} from '@/api/config';
import { ApiError } from '@/api/errors';

type LoadingState = 'health' | 'register' | 'login' | 'userInfo' | '';

interface TestResult {
  id: string;
  type: string;
  status: 'success' | 'error';
  message: string;
  data?: UserProfile | TokenResponse | HealthCheckResponse;
  timestamp: string;
}

type ApiOperationResult = UserProfile | TokenResponse | HealthCheckResponse;

interface ApiOperation<T extends ApiOperationResult> {
  operation: () => Promise<ApiResponse<T>>;
  type: string;
  loadingState: LoadingState;
  successMessage: string;
}

const TestPage = () => {
  const [results, setResults] = useState<TestResult[]>([]);
  const [token, setToken] = useState<string>('');
  const [loading, setLoading] = useState<LoadingState>('');
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const addResult = useCallback((result: Omit<TestResult, 'timestamp' | 'id'>) => {
    const newResult: TestResult = {
      ...result,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString()
    };
    setResults(prev => [newResult, ...prev.slice(0, 9)]);
  }, []);

  const handleApiOperation = useCallback(async <T extends ApiOperationResult>({
    operation,
    type,
    loadingState,
    successMessage
  }: ApiOperation<T>) => {
    setLoading(loadingState);
    clearError();

    try {
      const result = await operation();

      if ('access_token' in (result.data || {})) {
        setToken((result.data as TokenResponse).access_token);
      }

      addResult({
        type,
        status: result.success ? 'success' : 'error',
        message: result.success ? successMessage : result.error || '操作失败',
        data: result.data
      });
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : error instanceof Error 
          ? error.message 
          : '未知错误';

      setError(errorMessage);
      addResult({
        type,
        status: 'error',
        message: errorMessage
      });
    } finally {
      setLoading('');
    }
  }, [addResult, clearError]);

  const handleHealthCheck = useCallback(() => 
    handleApiOperation<HealthCheckResponse>({
      operation: healthApi.checkHealth,
      type: '健康检查',
      loadingState: 'health',
      successMessage: '服务器连接正常'
    }),
  [handleApiOperation]);

  const handleTestRegister = useCallback(() => {
    const testUser = {
      username: `test_${Date.now()}`,
      email: `test_${Date.now()}@example.com`,
      password: 'Test123456!'
    };

    return handleApiOperation<TokenResponse>({
      operation: () => authApi.register(
        testUser.username,
        testUser.email,
        testUser.password
      ),
      type: '注册测试',
      loadingState: 'register',
      successMessage: '注册成功'
    });
  }, [handleApiOperation]);

  const handleTestLogin = useCallback(() => 
    handleApiOperation<TokenResponse>({
      operation: () => authApi.login('testuser', 'testpassword123'),
      type: '登录测试',
      loadingState: 'login',
      successMessage: '登录成功'
    }),
  [handleApiOperation]);

  const handleTestUserInfo = useCallback(() => {
    if (!token) {
      addResult({
        type: '用户信息',
        status: 'error',
        message: '请先登录或注册获取token'
      });
      return;
    }

    return handleApiOperation<UserProfile>({
      operation: () => userApi.getProfile(token),
      type: '用户信息',
      loadingState: 'userInfo',
      successMessage: '获取成功'
    });
  }, [token, handleApiOperation, addResult]);

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-6">API 测试面板</h1>

        {error && (
          <Alert variant="destructive" className="mb-6" onMouseEnter={clearError}>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <TestButton
            label="测试服务器连接"
            loading={loading === 'health'}
            loadingText="检查中..."
            onClick={handleHealthCheck}
            className="bg-blue-500 hover:bg-blue-600"
          />

          <TestButton
            label="测试注册"
            loading={loading === 'register'}
            loadingText="注册中..."
            onClick={handleTestRegister}
            className="bg-green-500 hover:bg-green-600"
          />

          <TestButton
            label="测试登录"
            loading={loading === 'login'}
            loadingText="登录中..."
            onClick={handleTestLogin}
            className="bg-purple-500 hover:bg-purple-600"
          />

          <TestButton
            label="获取用户信息"
            loading={loading === 'userInfo'}
            loadingText="获取中..."
            onClick={handleTestUserInfo}
            disabled={!token}
            className="bg-orange-500 hover:bg-orange-600"
          />
        </div>

        {token && (
          <div className="mb-6 p-4 bg-gray-100 rounded-lg">
            <h2 className="font-semibold mb-2">当前Token:</h2>
            <p className="text-sm font-mono break-all">{token}</p>
          </div>
        )}

        <section className="space-y-4">
          <h2 className="font-semibold">测试结果:</h2>
          {results.map((result) => (
            <div
              key={result.id}
              className={`p-4 rounded-lg ${
                result.status === 'success' ? 'bg-green-50' : 'bg-red-50'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{result.type}</span>
                <time className="text-sm text-gray-500">
                  {new Date(result.timestamp).toLocaleString()}
                </time>
              </div>
              <p className="text-sm mb-2">{result.message}</p>
              {result.data && (
                <pre className="text-xs bg-white p-2 rounded overflow-x-auto border border-gray-200">
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              )}
            </div>
          ))}
        </section>
      </div>
    </main>
  );
};

interface TestButtonProps {
  label: string;
  loading: boolean;
  loadingText: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const TestButton = ({
  label,
  loading,
  loadingText,
  onClick,
  disabled,
  className
}: TestButtonProps) => (
  <button
    onClick={onClick}
    disabled={loading || disabled}
    className={`
      w-full p-4 text-white rounded-lg transition-all
      disabled:bg-gray-400 disabled:cursor-not-allowed
      focus:outline-none focus:ring-2 focus:ring-offset-2
      ${className}
    `}
  >
    {loading ? (
      <span className="flex items-center justify-center">
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
        {loadingText}
      </span>
    ) : (
      label
    )}
  </button>
);

export default TestPage;
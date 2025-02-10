import { useCallback } from 'react';

export function useAuth() {
  const login = useCallback(async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return true;
  }, []);

  const register = useCallback(async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return true;
  }, []);

  return { login, register };
}
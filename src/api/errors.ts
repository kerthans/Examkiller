// src/api/errors.ts
export class ApiError extends Error {
    constructor(
      message: string,
      public statusCode?: number,
      public response?: unknown
    ) {
      super(message);
      this.name = 'ApiError';
    }
  }
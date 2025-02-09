// src/lib/api-error.ts
export class ApiError extends Error {
    constructor(
      public message: string,
      public status: number = 500,
      public data?: unknown
    ) {
      super(message);
      this.name = 'ApiError';
    }
  }
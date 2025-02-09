// src/types/auth.ts
export interface AuthResponse {
    access_token: string;
    token_type: string;
  }
  
  export interface UserCredentials {
    username: string;
    password: string;
  }
  
  export interface RegisterCredentials extends UserCredentials {
    email: string;
  }
  
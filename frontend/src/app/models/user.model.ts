export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  mobile?: string;
  officeNumber?: string;
  designation?: string;
  role: string;
  isVerified: boolean;
  isPro: boolean;
}

export interface AuthResponse {
  token: string;
  type: string;
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  isPro: boolean;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  company?: string;
  mobile?: string;
  officeNumber?: string;
  designation?: string;
}
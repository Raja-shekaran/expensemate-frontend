export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export type TransactionType = "INCOME" | "EXPENSE";

export interface TransactionRequest {
  userId: string;
  amount: number;
  type: TransactionType;
  categoryId?: string;
  date: string;
  notes?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: TransactionType;
  categoryId?: string;
  date: string;
  notes?: string;
}

export interface JwtPayload {
  sub: string;
  exp: number;
  iat: number;
}

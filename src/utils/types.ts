export type TransactionType = "INCOME" | "EXPENSE";

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

export interface TransactionRequest {
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

export interface Category {
  id: string;
  userId: string;
  name: string;
}

export interface Summary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}
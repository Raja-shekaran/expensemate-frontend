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

//for context

export interface State {
  token: string | null;
  transactions: Transaction[];
  categories: Category[];
  summary: Summary | null;
  loading: boolean;
}

export type Action =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_TOKEN"; payload: string }
  | { type: "LOGOUT" }
  | { type: "REFRESH_ALL"; payload: { transactions: Transaction[]; categories: Category[]; summary: Summary } };

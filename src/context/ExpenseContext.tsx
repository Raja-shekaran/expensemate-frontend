import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { 
  getTransactions, addTransaction as apiAddTransaction, deleteTransaction as apiDeleteTransaction 
} from "../api/transactions";
import { 
  getCategories, addCategory as apiAddCategory, deleteCategory as apiDeleteCategory 
} from "../api/category";
import { getSummary } from "../api/dashboard";
import { LoginRequest, SignupRequest, TransactionRequest, Category, Transaction, Summary } from "../utils/types";
import { login as apiLogin, signup as apiSignup } from "../api/auth";

interface AppState {
  token: string | null;
  transactions: Transaction[];
  categories: Category[];
  summary: Summary | null;
}

interface ExpenseContextType {
  state: AppState;
  login: (data: LoginRequest) => Promise<void>;
  signup: (data: SignupRequest) => Promise<void>;
  logout: () => void;
  refreshAll: () => void;
  addTransaction: (tx: TransactionRequest) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  addCategory: (name: string) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    token: localStorage.getItem("token"),
    transactions: [],
    categories: [],
    summary: null,
  });

  const refreshAll = useCallback(async () => {
    try {
      const [transactions, categories, summary] = await Promise.all([
        getTransactions(),
        getCategories(),
        getSummary(),
      ]);
      setState((prev) => ({ ...prev, transactions, categories, summary }));
    } catch (err) {
      console.error("Failed to refresh data", err);
    }
  }, []);

  useEffect(() => {
    if (state.token) refreshAll();
  }, [state.token, refreshAll]);

  const login = async (data: LoginRequest) => {
    const res = await apiLogin(data);
    localStorage.setItem("token", res.token);
    setState((prev) => ({ ...prev, token: res.token }));
    await refreshAll();
  };

  const signup = async (data: SignupRequest) => {
    await apiSignup(data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setState({ token: null, transactions: [], categories: [], summary: null });
  };

  const addTransaction = async (tx: TransactionRequest) => {
    await apiAddTransaction(tx);
    await refreshAll();
  };

  const deleteTransaction = async (id: string) => {
    await apiDeleteTransaction(id);
    await refreshAll();
  };

  const addCategory = async (name: string) => {
    const newCat = await apiAddCategory(name);
    setState((prev) => ({ ...prev, categories: [...prev.categories, newCat] }));
  };

  const deleteCategory = async (id: string) => {
    await apiDeleteCategory(id);
    setState((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c.id !== id),
    }));
  };

  return (
    <ExpenseContext.Provider value={{
      state, login, signup, logout, refreshAll,
      addTransaction, deleteTransaction, addCategory, deleteCategory
    }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) throw new Error("useExpense must be used within ExpenseProvider");
  return context;
};

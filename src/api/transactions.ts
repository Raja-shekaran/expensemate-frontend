import api from "./api";
import { Transaction, TransactionRequest } from "../utils/types";

export const getTransactions = async (
  userId: string
): Promise<Transaction[]> => {
  const res = await api.get(`/transactions/${userId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return res.data;
};

export const addTransaction = async (
  transaction: TransactionRequest
): Promise<Transaction> => {
  const res = await api.post(`/transactions`, transaction, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return res.data;
};

export const deleteTransaction = async (
  transactionId: string
): Promise<void> => {
  await api.delete(`/transactions/${transactionId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

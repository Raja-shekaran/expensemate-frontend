import { useEffect, useState } from "react";
import { getTransactions, addTransaction, deleteTransaction } from "../api/transactions";
import { Transaction, TransactionRequest } from "../utils/types";

interface Props {
  userId: string;
  onLogout: () => void;
}

const Transactions: React.FC<Props> = ({ userId, onLogout }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [form, setForm] = useState<TransactionRequest>({
    userId,
    amount: 0,
    type: "EXPENSE",
    date: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const fetchTransactions = async () => {
    try {
      const data = await getTransactions(userId);
      setTransactions(data);
    } catch {
      alert("Failed to fetch transactions");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addTransaction(form);
      await fetchTransactions();
    } catch {
      alert("Failed to add transaction");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTransaction(id);
      await fetchTransactions();
    } catch {
      alert("Failed to delete transaction");
    }
  };

  return (
    <div>
      <h2>Transactions</h2>

      <button onClick={onLogout}>Logout</button>

      <form onSubmit={handleSubmit}>
        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          required
        />
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
        </select>
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <input
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
        />
        <button type="submit">Add Transaction</button>
      </form>

      <ul>
        {transactions.map((t) => (
          <li key={t.id}>
            {t.type} - ${t.amount} - {new Date(t.date).toLocaleDateString()} - {t.notes ?? ""}
            <button onClick={() => handleDelete(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;

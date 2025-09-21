import { useState, useEffect } from "react";
import { getTransactions, addTransaction, deleteTransaction } from "../api/transactions";
import { Transaction, TransactionRequest } from "../utils/types";

interface Props {
  onLogout: () => void;
}

const Transactions: React.FC<Props> = ({ onLogout }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [form, setForm] = useState<TransactionRequest>({
    amount: 0,
    type: "EXPENSE",
    date: new Date().toISOString().split("T")[0],
    notes: "",
    categoryId: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch {
      alert("Failed to fetch transactions");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addTransaction(form);
      setForm((prev) => ({ ...prev, amount: 0, notes: "", categoryId: "" }));
      await fetchTransactions();
    } catch {
      alert("Failed to add transaction");
    } finally {
      setLoading(false);
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
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">ExpenseMate</h1>
        <button
          onClick={onLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Add Transaction Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="notes"
            placeholder="Notes"
            value={form.notes}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring focus:ring-indigo-300"
            required
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring focus:ring-indigo-300"
            required
          />
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring focus:ring-indigo-300"
          >
            <option value="INCOME">Income</option>
            <option value="EXPENSE">Expense</option>
          </select>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring focus:ring-indigo-300"
            required
          />
          <input
            type="text"
            name="categoryId"
            placeholder="Category ID (optional)"
            value={form.categoryId}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring focus:ring-indigo-300"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Transaction"}
          </button>
        </form>
      </div>

      {/* Transactions History */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
        {transactions.length === 0 ? (
          <p className="text-gray-500">No transactions yet.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left">Notes</th>
                <th className="p-2 text-left">Amount</th>
                <th className="p-2 text-left">Type</th>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b">
                  <td className="p-2">{tx.notes}</td>
                  <td
                    className={`p-2 font-semibold ${
                      tx.type === "EXPENSE" ? "text-red-500" : "text-green-600"
                    }`}
                  >
                    ₹{tx.amount}
                  </td>
                  <td className="p-2">{tx.type}</td>
                  <td className="p-2">{new Date(tx.date).toLocaleDateString()}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleDelete(tx.id)}
                      className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Transactions;

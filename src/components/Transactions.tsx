import React, { useState } from "react";
import { TransactionRequest } from "../utils/types";
import { useExpense } from "../context/ExpenseContext";

const Transactions: React.FC = () => {
  const { state, addTransaction, deleteTransaction } = useExpense();
  const [form, setForm] = useState<TransactionRequest>({
    amount: 0,
    type: "EXPENSE",
    date: new Date().toISOString().split("T")[0],
    notes: "",
    categoryId: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
      setForm({
        amount: 0,
        type: "EXPENSE",
        date: new Date().toISOString().split("T")[0],
        notes: "",
        categoryId: "",
      });
    } catch {
      alert("Failed to add transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-soft mb-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Add Transaction
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
        <input
          type="text"
          name="amount"
          placeholder="Amount"
          value={form.amount === 0 ? "" : form.amount}
          onChange={(e) => {
            const val = e.target.value.replace(/[^0-9.]/g, ""); // allow only digits & dot
            setForm((prev) => ({
              ...prev,
              amount: val === "" ? 0 : Number(val),
            }));
          }}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
        </select>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="">-- Select Category (optional) --</option>
          {state.categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Transaction"}
        </button>
      </form>

      <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-3">
        Transaction History
      </h2>
      {state.transactions.length === 0 ? (
        <p className="text-gray-500">No transactions yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-blue-100 text-blue-800">
              <tr>
                <th className="p-2">Notes</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Type</th>
                <th className="p-2">Date</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.transactions.map((tx) => (
                <tr key={tx.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{tx.notes}</td>
                  <td
                    className={`p-2 font-semibold ${
                      tx.type === "EXPENSE" ? "text-red-500" : "text-green-600"
                    }`}
                  >
                    ₹{tx.amount}
                  </td>
                  <td className="p-2">{tx.type}</td>
                  <td className="p-2">
                    {new Date(tx.date).toLocaleDateString()}
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => deleteTransaction(tx.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Transactions;

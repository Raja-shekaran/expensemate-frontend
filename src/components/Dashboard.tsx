import { useState, useEffect } from "react";
import api from "../api/api";

interface Summary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

const Dashboard = () => {
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    api.get("/dashboard/summary").then((res) => setSummary(res.data));
  }, []);

  if (!summary) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      <div className="bg-green-100 p-4 rounded shadow">
        <h3 className="font-bold">Income</h3>
        <p className="text-2xl text-green-700">₹{summary.totalIncome}</p>
      </div>
      <div className="bg-red-100 p-4 rounded shadow">
        <h3 className="font-bold">Expense</h3>
        <p className="text-2xl text-red-700">₹{summary.totalExpense}</p>
      </div>
      <div className="bg-blue-100 p-4 rounded shadow">
        <h3 className="font-bold">Balance</h3>
        <p className="text-2xl text-blue-700">₹{summary.balance}</p>
      </div>
    </div>
  );
};

export default Dashboard;

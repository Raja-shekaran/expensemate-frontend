import React from "react";
import { useExpense } from "../context/ExpenseContext";

const Dashboard: React.FC = () => {
  const { state } = useExpense();
  const summary = state.summary;

  if (!summary) return <p className="p-4 text-gray-500">Loading...</p>;

  const cards = [
    { title: "Income", amount: summary.totalIncome, color: "green" },
    { title: "Expense", amount: summary.totalExpense, color: "red" },
    { title: "Balance", amount: summary.balance, color: "blue" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`p-4 rounded-xl shadow-soft bg-white`}
        >
          <h3 className="font-semibold text-gray-700">{card.title}</h3>
          <p
            className={`text-2xl font-bold mt-2 ${
              card.color === "red"
                ? "text-red-500"
                : card.color === "green"
                ? "text-green-600"
                : "text-blue-600"
            }`}
          >
            ₹{card.amount}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;

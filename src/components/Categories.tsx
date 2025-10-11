import React, { useState } from "react";
import { useExpense } from "../context/ExpenseContext";

const Categories: React.FC = () => {
  const { state, addCategory, deleteCategory } = useExpense();
  const [name, setName] = useState("");

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      await addCategory(name);
      setName("");
    } catch {
      alert("Failed to add category");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-card p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Categories</h2>

      <form
        onSubmit={handleAdd}
        className="flex flex-col sm:flex-row gap-2 mb-6 w-full"
      >
        <div className="flex-1">
          <input
            type="text"
            placeholder="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
          />
        </div>
        <div className="w-full sm:w-auto">
          <button
            type="submit"
            className="w-full sm:w-auto bg-primary text-white px-4 py-3 rounded-xl hover:bg-indigo-700 transition-all duration-300 shadow-md"
          >
            Add
          </button>
        </div>
      </form>

      <ul className="space-y-2">
        {state.categories.map((cat) => (
          <li
            key={cat.id}
            className="flex justify-between items-center p-2 bg-blue-50 rounded-lg"
          >
            <span>{cat.name}</span>
            <button
              onClick={() => deleteCategory(cat.id)}
              className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;

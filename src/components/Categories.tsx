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
    <div className="bg-white p-6 rounded-xl shadow-soft">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Categories</h2>

      <form
        onSubmit={handleAdd}
        className="flex flex-col sm:flex-row gap-2 mb-6"
      >
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 w-full sm:w-auto"
        />
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-all duration-300 shadow-md w-full sm:w-auto"
        >
          Add
        </button>
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

import React, { useState } from "react";
import { LoginRequest } from "../utils/types";
import { useExpense } from "../context/ExpenseContext";

const Login: React.FC = () => {
  const { login } = useExpense();
  const [form, setForm] = useState<LoginRequest>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form);
    } catch {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-blue-800 text-center mb-4">Login</h2>
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Signing in..." : "Login"}
      </button>
    </form>
  );
};

export default Login;

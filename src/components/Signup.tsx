import React, { useState } from "react";
import { SignupRequest } from "../utils/types";
import { useExpense } from "../context/ExpenseContext";

const Signup: React.FC<{ onSwitchToLogin?: () => void }> = ({ onSwitchToLogin }) => {
  const { signup } = useExpense();
  const [form, setForm] = useState<SignupRequest>({ name: "", email: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await signup(form);
      alert("Signup successful! Redirecting to login...");
      // Redirect to login tab
      if (onSwitchToLogin) onSwitchToLogin();
    } catch {
      alert("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary transition-all duration-300"
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary transition-all duration-300"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary transition-all duration-300"
        required
      />
      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary transition-all duration-300"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl bg-secondary text-black font-semibold hover:bg-yellow-500 shadow-md transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Signup"}
      </button>
    </form>
  );
};

export default Signup;

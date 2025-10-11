import React, { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Transactions from "./components/Transactions";
import Categories from "./components/Categories";
import Dashboard from "./components/Dashboard";
import { ExpenseProvider, useExpense } from "./context/ExpenseContext";
import "./index.css";

const MainApp = () => {
  const { state, logout } = useExpense();
  const [showSignup, setShowSignup] = useState(false);

  // Auth view
  if (!state.token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-soft">
          {showSignup ? (
            <Signup onSwitchToLogin={() => setShowSignup(false)} />
          ) : (
            <Login />
          )}
          <p className="mt-4 text-center text-gray-600">
            {showSignup
              ? "Already have an account? "
              : "Don’t have an account? "}
            <button
              onClick={() => setShowSignup(!showSignup)}
              className={`underline font-semibold ${
                showSignup ? "text-blue-600" : "text-blue-700"
              }`}
            >
              {showSignup ? "Login" : "Signup"}
            </button>
          </p>
        </div>
      </div>
    );
  }

  // Logged-in dashboard
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-white shadow-soft sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-blue-800">ExpenseMate</h1>
        <button
          onClick={logout}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-all duration-300"
        >
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <div className="p-6 grid gap-6 md:grid-cols-3">
        {/* Dashboard spans full width */}
        <div className="md:col-span-3">
          <Dashboard />
        </div>

        {/* Transactions + Categories */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <Transactions />
        </div>

        <div className="md:col-span-1 flex flex-col gap-6">
          <Categories />
        </div>
      </div>
    </div>
  );
};

const App = () => (
  <ExpenseProvider>
    <MainApp />
  </ExpenseProvider>
);

export default App;

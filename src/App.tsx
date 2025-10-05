import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Transactions from "./components/Transactions";
import Categories from "./components/Categories";
import Dashboard from "./components/Dashboard";
import { JwtPayload } from "./utils/types";
import "./index.css";

type AuthTab = "login" | "signup";
type DashTab = "transactions";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!localStorage.getItem("token")
  );
  const [userId, setUserId] = useState<string>("");
  const [authTab, setAuthTab] = useState<AuthTab>("login");
  const [dashTab, setDashTab] = useState<DashTab>("transactions");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setUserId(decoded.sub);
      } catch (err) {
        console.error("Invalid token", err);
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    }
  }, [isLoggedIn]);
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserId("");
    setAuthTab("login");
    setDashTab("transactions");
  };

  const onLoginSuccess = () => {
    setIsLoggedIn(true);
    setDashTab("transactions");
  };

  const onSignupComplete = () => {
    setAuthTab("login");
    setTimeout(() => alert("Signup successful — please login."), 50);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-yellow-500 tracking-wider">
            ExpenseMate
          </h1>
        </header>

        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex bg-gray-50">
            <button
              className={`flex-1 py-3 text-center font-medium transition ${
                authTab === "login"
                  ? "bg-white text-indigo-700 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
              onClick={() => setAuthTab("login")}
            >
              Login
            </button>
            <button
              className={`flex-1 py-3 text-center font-medium transition ${
                authTab === "signup"
                  ? "bg-white text-yellow-600 border-b-2 border-yellow-500"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
              onClick={() => setAuthTab("signup")}
            >
              Signup
            </button>
          </div>

          <div className="p-6">
            {authTab === "login" ? (
              <Login onLogin={onLoginSuccess} />
            ) : (
              <Signup onSignupComplete={onSignupComplete} />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-yellow-400 text-black p-4 flex items-center justify-between shadow">
        <div>
          <h1 className="text-2xl font-bold">ExpenseMate</h1>
        </div>

        <div className="flex items-center gap-3">
          <nav className="hidden sm:flex gap-2">
            <button
              onClick={() => setDashTab("transactions")}
              className={`px-4 py-2 rounded-lg font-medium ${
                dashTab === "transactions"
                  ? "bg-white text-yellow-500"
                  : "text-white/90 hover:bg-white/10"
              }`}
            >
              Transactions
            </button>
          </nav>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6">
        {dashTab === "transactions" && (
          <>
            <Dashboard />
            <Categories />
            <div className="mt-6 bg-white p-6 rounded-2xl shadow">
              <Transactions onLogout={handleLogout} />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default App;

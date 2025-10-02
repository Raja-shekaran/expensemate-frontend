import { useState, useEffect } from "react";
import "./index.css";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Transactions from "./components/Transactions";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "./utils/types";
import Dashboard from "./components/Dashboard";
import Categories from "./components/Categories";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        jwtDecode<JwtPayload>(token);
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      {/* Navbar */}
      <nav className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold tracking-wide">ExpenseMate</h1>
        <div className="flex gap-4">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-300 transition"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/transactions"
                className="bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                Transactions
              </Link>
              <Link
                to="/dashboard"
                className="bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                Dashboard
              </Link>
              <Link
                to="/categories"
                className="bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                Categories
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Routes */}
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route
                path="/login"
                element={<Login onLogin={() => setIsLoggedIn(true)} />}
              />
              <Route
                path="/signup"
                element={<Signup onSignup={() => setIsLoggedIn(true)} />}
              />
              <Route
                path="*"
                element={<Login onLogin={() => setIsLoggedIn(true)} />}
              />
            </>
          ) : (
            <>
              <Route path="/transactions" element={<Transactions onLogout={handleLogout} />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/categories" element={<Categories />} />
              {/* Default after login → Transactions */}
              <Route path="*" element={<Transactions onLogout={handleLogout} />} />
            </>
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;

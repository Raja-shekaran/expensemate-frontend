import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Transactions from "./components/Transactions";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "./utils/types";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("token"));
  const [userId, setUserId] = useState<string>("");

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
  };

  return (
    <BrowserRouter>
      <nav>
        {!isLoggedIn && (
          <>
            <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
          </>
        )}
        {isLoggedIn && (
          <button onClick={handleLogout}>Logout</button>
        )}
      </nav>
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
            <Route path="/signup" element={<Signup onSignup={() => setIsLoggedIn(true)} />} />
            <Route path="*" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
          </>
        ) : (
          <Route path="*" element={<Transactions userId={userId} onLogout={handleLogout} />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;

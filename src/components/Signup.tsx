import { useState } from "react";
import { signup } from "../api/auth";
import { SignupRequest } from "../utils/types";
interface Props {
  onSignup: () => void;
}

const Signup: React.FC<Props> = ({ onSignup }) => {
  const [form, setForm] = useState<SignupRequest>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token } = await signup(form);
      localStorage.setItem("token", token);
      onSignup();
    } catch {
      alert("Signup failed. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Create Account</button>
    </form>
  );
};

export default Signup;

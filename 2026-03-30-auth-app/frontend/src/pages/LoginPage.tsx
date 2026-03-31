import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import AuthCard from "../components/AuthCard";
import "../App.css";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      await login(form);
      navigate("/dashboard");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Bejelentkezés sikertelen!";

      setError(message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="auth-container">
      <AuthCard title="Bejelentkezés">
        <form onSubmit={handleSubmit} className="auth-form">
          <FormInput
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Adja meg az email címét"
          />
          <FormInput
            label="Jelszó"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Kérem adja meg a jelszavát"
          />
          {error ? <p className="error-text">{error}</p> : null}
          <button className="submit-btn" type="submit" disabled={loading}>
            {loading ? "Bejelentkezés..." : "Bejelentkezés"}
          </button>
          <Link className="reg-link" to="/register">
            Nincs még fiókja? Regisztráljon itt.
          </Link>
        </form>
      </AuthCard>
    </div>
  );
}

export default LoginPage;

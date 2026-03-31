import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthCard from "../components/AuthCard";
import FormInput from "../components/FormInput";
import { useAuth } from "../context/AuthContext";

type Props = {};

function RegisterPage({}: Props) {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      await register(form);
      navigate("/dashboard");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Regisztráció sikertelen";
      setError(message);
    }
    setLoading(false);
  }

  return (
    <AuthCard title="Regisztráció">
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Név"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Név"
        />
        <FormInput
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <FormInput
          label="Jelszó"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Jelszó"
        />
        {error ? <p className="error-text">{error}</p> : null}
        <button className="primary-btn" type="submit" disabled={loading}>
          {loading ? "Loading..." : "Regisztráció"}
        </button>
        <Link to="/login">Már van fiókod? Jelentkezz be!</Link>
      </form>
    </AuthCard>
  );
}

export default RegisterPage;

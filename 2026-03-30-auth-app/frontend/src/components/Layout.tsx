import React, { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type Props = { children: ReactNode };

function Layout({ children }: Props) {
  const { isAuthenticated, logout, user } = useAuth();
  return (
    <div className="app-shell">
      <header className="app-header">
        <h2>Authentikációs app</h2>
        <nav className="nav">
          {!isAuthenticated ? (
            <>
              <Link to="/login">Bejelentkezés</Link>
              <Link to="/register">Regisztráció</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <span className="welcome-text">Welcome {user?.email}</span>
              <button className="ghost-button" onClick={logout}>
                Logout
              </button>
            </>
          )}
        </nav>
      </header>
      <main className="app-main">{children}</main>
    </div>
  );
}

export default Layout;

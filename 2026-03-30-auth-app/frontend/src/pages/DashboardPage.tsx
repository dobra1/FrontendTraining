import React from "react";
import { useAuth } from "../context/AuthContext";

function DashboardPage() {
  const { user } = useAuth();
  return (
    <div className="dashboard-card">
      <div>DashboardPage</div>
      <p> Üdvözlünk, {user?.name}</p>
      <p>
        <strong>Email:</strong> {user?.email}
      </p>
    </div>
  );
}

export default DashboardPage;

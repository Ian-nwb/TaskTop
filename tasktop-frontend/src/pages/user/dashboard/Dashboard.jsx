// src/Dashboard.jsx
import React from "react";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Dashboard</h1>
      <p>Welcome, {auth.currentUser?.email}!</p>
      <button onClick={handleLogout} style={{ padding: "0.5rem 1rem" }}>
        Log Out
      </button>
    </div>
  );
};

export default Dashboard;
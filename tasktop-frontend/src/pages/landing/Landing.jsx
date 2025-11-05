import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1 className="landing-title">Tasktop</h1>
      <p className="landing-subtitle">WFH community and task management platform</p>

      <div className="landing-buttons">
        <button className="btn login-btn" onClick={() => navigate("/login")}>
          Login
        </button>
        <button className="btn signup-btn" onClick={() => navigate("/signup")}>
          Sign Up
        </button>
      </div>

      <footer className="landing-footer">
        <p>© {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Landing;

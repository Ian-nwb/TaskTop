// src/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "Capstone",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  const { email, password, confirmPassword, firstName, lastName, company } = formData;

  if (password !== confirmPassword) {
    setError("Passwords do not match");
    setLoading(false);
    return;
  }

  if (password.length < 6) {
    setError("Password must be 6+ characters");
    setLoading(false);
    return;
  }

  try {
    // 1. Create Auth user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2. Save to Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      firstName,
      lastName,
      email,
      company,
      createdAt: new Date().toISOString(),
    });

    alert("Signup successful!");
    navigate("/login");
  } catch (err) {
    console.error("Signup error:", err);
    setError(
      err.code === "auth/email-already-in-use"
        ? "Email already exists"
        : "Signup failed. Try again."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1 className="signup-title">Create Your Account</h1>

        {/* Error banner */}
        {error && <p className="error-msg">{error}</p>}

        {/* Name fields */}
        <div className="name-fields">
          <div className="input-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password + eye */}
        <div className="input-group password-group">
          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
        </div>

        {/* Confirm password + eye */}
        <div className="input-group password-group">
          <label>Retype Password</label>
          <div className="password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <span
              className="eye-icon"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
            </span>
          </div>
        </div>

        {/* Company */}
        <div className="input-group">
          <label>Company</label>
          <select name="company" value={formData.company} onChange={handleChange}>
            <option value="Capstone">Capstone</option>
            <option value="Skopos">Skopos</option>
          </select>
        </div>

        {/* Submit */}
        <button type="submit" className="signup-btn" disabled={loading}>
          {loading ? "Creating…" : "Sign Up"}
        </button>

        {/* Login link */}
        <p className="login-link">
          Already have an account?{" "}
          <button
            type="button"
            className="link-button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default Signup;
// src/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { auth, db } from "../../../firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log("No user data in Firestore");
          }
        } catch (err) {
          console.error("Error fetching user:", err);
        } finally {
          setLoading(false);
        }
      } else {
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#000",
        color: "#fff",
        padding: "1rem",
        textAlign: "center"
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "#000",
      color: "#fff",
      padding: "1rem",
      textAlign: "center"
    }}>
      <h1>Dashboard</h1>
      {userData ? (
        <p>
          Welcome, <strong>{userData.firstName} {userData.lastName}</strong> |{" "}
          <em>{userData.position}</em> at <strong>{userData.company}</strong>
        </p>
      ) : (
        <p>No profile data found.</p>
      )}
      <button
        onClick={handleLogout}
        style={{
          padding: "0.5rem 1rem",
          marginTop: "1rem",
          background: "#fff",
          color: "#000",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default Dashboard;

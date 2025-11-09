import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing   from "./pages/landing/Landing";
import Signup    from "./pages/signup/Signup";
import Login     from "./pages/login/Login";
import Dashboard from "./pages/user/dashboard/Dashboard";

import UserLayout from "./components/layouts/user/UserLayout";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        {/* Public pages – no layout */}
        <Route path="/"      element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login"  element={<Login />} />

        {/* ----- PROTECTED AREA ----- */}
        <Route element={<UserLayout />}>
          {/* All routes inside here automatically get Navbar + Sidebar */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add more user pages here */}
          {/* <Route path="/user/profile" element={<Profile />} /> */}
        </Route>

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
import React from 'react';
import { Outlet } from 'react-router-dom';

// Import the two UI components
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";


const UserLayout = () => {
  return (
    <div className="user-layout">
      {/* Navbar – fixed at the top */}
      <Navbar />

      {/* Sidebar + Main content */}
      <div className="user-layout-body">
        <Sidebar />
        <main className="user-layout-main">
          <Outlet />   {/* <-- Dashboard (or any child route) goes here */}
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
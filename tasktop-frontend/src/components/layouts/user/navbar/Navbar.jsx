import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import Circle_Primary from "../../../../assets/icons/Circle_Primary.svg";

const Navbar = () => {
  return (
    <div className="navbar">
      <header className="navbar-header">
        <p>Tasktop</p>
      </header>
      <main className="navbar-main">
        <div className="navbar-main-account">
          <Link to="/account">
            <img src={Circle_Primary} alt="account" style={{ width: '20px', height: '20px' }} />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Navbar;

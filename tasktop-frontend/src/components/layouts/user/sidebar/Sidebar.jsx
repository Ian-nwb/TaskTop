import React, { useState, useEffect, useRef } from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';
import Circle_Primary from "../../../../assets/icons/Circle_Primary.svg";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => setIsOpen(prev => !prev);

  useEffect(() => {
    const sidebar = sidebarRef.current;

    const handleMouseLeave = () => {
      if (window.innerWidth <= 768) {
        setIsOpen(false);
      }
    };

    if (sidebar) {
      sidebar.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (sidebar) {
        sidebar.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <>
      <button className="hamburger" onClick={toggleSidebar} aria-label="Toggle sidebar">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div ref={sidebarRef} className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <img src={Circle_Primary} alt="logo" style={{ width: '20px', height: '20px' }} />
        </div>

        <div className="sidebar-buttons">
          <button>
            <Link to="/dashboard">
              <img src={Circle_Primary} alt="dashboard" style={{ width: '20px', height: '20px' }} />
            </Link>
          </button>

          <button>
            <Link to="/timecard">
              <img src={Circle_Primary} alt="timecard" style={{ width: '20px', height: '20px' }} />
            </Link>
          </button>

          <button>
            <Link to="/records">
              <img src={Circle_Primary} alt="records" style={{ width: '20px', height: '20px' }} />
            </Link>
          </button>

          <button>
            <Link to="/chat">
              <img src={Circle_Primary} alt="chat" style={{ width: '20px', height: '20px' }} />
            </Link>
          </button>

          <button>
            <Link to="/announcements">
              <img src={Circle_Primary} alt="announcements" style={{ width: '20px', height: '20px' }} />
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
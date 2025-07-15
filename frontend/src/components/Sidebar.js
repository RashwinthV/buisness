import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Styles/Sidebar.css";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768); // md breakpoint

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isLargeScreen) {
    // Small screens (bottom navbar with icons only)
    return (
      <aside className="sidebar bottom-sidebar bg-dark d-flex d-md-none justify-content-around bg-dark text-white py-2 fixed-bottom">
        <Link to="/" className="text-white text-center">
          <i className="bi bi-house-door fs-4"></i>
        </Link>
        <Link to="/settings" className="text-white text-center">
          <i className="bi bi-gear fs-4"></i>
        </Link>
      </aside>
    );
  }

  // Large screens (left sidebar)
  return (
    <aside
      className={`sidebar vertical-sidebar d-none d-md-flex flex-column text-white ${
        isCollapsed ? "collapsed" : "expanded"
      }`}
    >
      <ul className="nav flex-column p-1 pt-5">
        <li className="nav-item mb-3">
          <div
            className="toggle-btn"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <i
              className={`bi ${
                isCollapsed
                  ? "bi-chevron-double-right"
                  : "bi-chevron-double-left"
              }`}
            ></i>
          </div>
        </li>
        <li className="nav-item mb-3">
          <Link
            to="/"
            className="nav-link text-white d-flex align-items-center"
          >
            <i className="bi bi-house-door me-2 fs-5"></i>
            {!isCollapsed && <span>Home</span>}
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/settings"
            className="nav-link text-white d-flex align-items-center"
          >
            <i className="bi bi-gear me-2 fs-5"></i>
            {!isCollapsed && <span>Settings</span>}
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;

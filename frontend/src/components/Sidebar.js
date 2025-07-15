import React from "react";
import "../Styles/Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar d-flex text-white p-0">
      <ul className="nav w-100 d-flex justify-content-start 
       align-items-center  m-0 p-3 p-md-3">
        <li className="nav-item">
          <Link to="/" className="nav-link text-white text-center ">
            <i className="bi bi-house-door me-md-2"></i>
            <span className="d-none d-md-inline">Home</span>
          </Link>
        </li>
       
        <li className="nav-item">
          <Link to="/settings" className="nav-link text-white text-center">
            <i className="bi bi-gear me-md-2"></i>
            <span className="d-none d-md-inline">Settings</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;

import "../../Styles/Sidebar.css";

import SwitchBusinessModal from "../Common/SwitchBusiness";

import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useBusiness } from "../../context/BussinessContext";
const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);
  const [showSwitchBusiness, setShowSwitchBusiness] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const { selectedBusinessId } = useBusiness();
  const [businesses] = useState([
    { id: 1, name: "India Cricket" },
    { id: 2, name: "Royal Challengers Bengaluru" },
  ]);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // console.log(selectedBusinessId);

  // Bottom bar for small screens
  if (!isLargeScreen) {
    return (
      <aside className="sidebar bottom-sidebar bg-dark d-flex d-md-none justify-content-around text-white py-2 fixed-bottom">
        <Link to="/home" className="text-white text-center">
          <i className="bi bi-house-door fs-4"></i>
        </Link>

        <Link to="/allbusinesses" className="text-white text-center">
          <i className="bi bi-list-ul fs-4"></i>
        </Link>

        <Link
          to={`/businessdashboard/${selectedBusinessId}`}
          className="text-white text-center"
        >
          <i className="bi bi-speedometer2 fs-4"></i>
        </Link>
        <Link
          to={`/managebusiness/${selectedBusinessId}`}
          className="text-white text-center"
        >
          <i className="bi bi-gear fs-4"></i>
        </Link>
        <button
          onClick={() => setShowSwitchBusiness(true)}
          className="btn btn-link text-white text-center p-0"
        >
          <i className="bi bi-arrow-repeat fs-4"></i>
        </button>
        <SwitchBusinessModal
          show={showSwitchBusiness}
          onClose={() => setShowSwitchBusiness(false)}
          businesses={businesses}
          selectedBusiness={selectedBusiness}
          onSwitch={(biz) => setSelectedBusiness(biz)}
          onAddBusiness={() => alert("Redirect to Add Business")}
        />
      </aside>
    );
  }

  return (
    <>
      <aside
        className={`sidebar vertical-sidebar d-none d-md-flex flex-column text-white ${
          isCollapsed ? "collapsed" : "expanded"
        }`}
      >
        <ul className="nav flex-column  p-1 pt-4">
          <li className="nav-item mb-3">
            <button
              className="nav-link text-white d-flex align-items-center justify-content-center bg-transparent border-0"
              onClick={() => setIsCollapsed(!isCollapsed)}
              style={{ height: "40px" }}
            >
              <i
                className={`bi ${
                  isCollapsed
                    ? "bi-chevron-double-right"
                    : "bi-chevron-double-left"
                } fs-5`}
              ></i>
            </button>
          </li>

          <li className="nav-item mb-1">
            <Link
              to="/home"
              className="nav-link text-white d-flex align-items-center"
            >
              <i className="bi bi-house-door me-2 fs-5"></i>
              {!isCollapsed && <span>Home</span>}
            </Link>
          </li>

          <li className="nav-item mb-1">
            <Link
              to="/allbusinesses"
              className="nav-link text-white d-flex align-items-center"
            >
              <i className="bi bi-list-ul me-2 fs-5"></i>
              {!isCollapsed && <span>All Businesses</span>}
            </Link>
          </li>

          <hr></hr>
          <li className="nav-item mb-3">
            <Link
              to={`/businessdashboard/${selectedBusinessId}`}
              className="nav-link text-white d-flex align-items-center"
            >
              <i className="bi bi-speedometer2 me-2 fs-5"></i>
              {!isCollapsed && <span>Dashboard</span>}
            </Link>
          </li>

          <li className="nav-item mb-3">
            <Link
              to={`/managebusiness/${selectedBusinessId}`}
              className="nav-link text-white d-flex align-items-center"
            >
              <i className="bi bi-gear me-2 fs-5"></i>
              {!isCollapsed && <span>Manage</span>}
            </Link>
          </li>

          <li className="nav-item">
            <button
              className="nav-link text-white d-flex align-items-center bg-transparent border-0"
              onClick={() => setShowSwitchBusiness(true)}
            >
              <i className="bi bi-arrow-repeat me-2 fs-5"></i>
              {!isCollapsed && <span>Switch buissness</span>}
            </button>
          </li>
        </ul>
      </aside>

      <SwitchBusinessModal
        show={showSwitchBusiness}
        onClose={() => setShowSwitchBusiness(false)}
        businesses={businesses}
        selectedBusiness={selectedBusiness}
        onSwitch={(biz) => setSelectedBusiness(biz)}
        onAddBusiness={() => alert("Redirect to Add Business")}
      />
    </>
  );
};

export default Sidebar;
// import "../Styles/Sidebar.css";
// import SwitchBusinessModal from "./SwitchBusiness";

// import { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { useBusiness } from "../context/BussinessContext";

// const Sidebar = () => {
//   const [isCollapsed, setIsCollapsed] = useState(true); // Default collapsed
//   const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);
//   const [showSwitchBusiness, setShowSwitchBusiness] = useState(false);
//   const [selectedBusiness, setSelectedBusiness] = useState(null);
//   const { selectedBusinessId } = useBusiness();
//   const [businesses] = useState([
//     { id: 1, name: "India Cricket" },
//     { id: 2, name: "Royal Challengers Bengaluru" },
//   ]);
//   const location = useLocation(); // for detecting route changes

//   // Collapse sidebar on every route change
//   useEffect(() => {
//     setIsCollapsed(true);
//   }, [location.pathname]);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsLargeScreen(window.innerWidth >= 768);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // 📱 Bottom bar for small screens
//   if (!isLargeScreen) {
//     return (
//       <aside className="sidebar bottom-sidebar bg-dark d-flex d-md-none justify-content-around text-white py-2 fixed-bottom">
//         <Link to="/home" className="text-white text-center">
//           <i className="bi bi-house-door fs-4"></i>
//         </Link>
//         <Link to="/allbusinesses" className="text-white text-center">
//           <i className="bi bi-list-ul fs-4"></i>
//         </Link>
//         <Link to={`/businessdashboard/${selectedBusinessId}`} className="text-white text-center">
//           <i className="bi bi-speedometer2 fs-4"></i>
//         </Link>
//         <Link to={`/managebusiness/${selectedBusinessId}`} className="text-white text-center">
//           <i className="bi bi-gear fs-4"></i>
//         </Link>
//         <button
//           onClick={() => setShowSwitchBusiness(true)}
//           className="btn btn-link text-white text-center p-0"
//         >
//           <i className="bi bi-arrow-repeat fs-4"></i>
//         </button>
//         <SwitchBusinessModal
//           show={showSwitchBusiness}
//           onClose={() => setShowSwitchBusiness(false)}
//           businesses={businesses}
//           selectedBusiness={selectedBusiness}
//           onSwitch={(biz) => setSelectedBusiness(biz)}
//           onAddBusiness={() => alert("Redirect to Add Business")}
//         />
//       </aside>
//     );
//   }

//   return (
//     <>
//       <aside
//         className={`sidebar vertical-sidebar d-none d-md-flex flex-column text-white ${
//           isCollapsed ? "collapsed" : "expanded"
//         }`}
//       >
//         <ul className="nav flex-column  p-1 pt-4">
//           <li className="nav-item mb-3">
//             <button
//               className="nav-link text-white d-flex align-items-center justify-content-center bg-transparent border-0"
//               onClick={() => setIsCollapsed(!isCollapsed)}
//               style={{ height: "40px" }}
//             >
//               <i
//                 className={`bi ${
//                   isCollapsed ? "bi-chevron-double-right" : "bi-chevron-double-left"
//                 } fs-5`}
//               ></i>
//             </button>
//           </li>

//           <li className="nav-item mb-1">
//             <Link to="/home" className="nav-link text-white d-flex align-items-center">
//               <i className="bi bi-house-door me-2 fs-5"></i>
//               {!isCollapsed && <span>Home</span>}
//             </Link>
//           </li>

//           <li className="nav-item mb-1">
//             <Link to="/allbusinesses" className="nav-link text-white d-flex align-items-center">
//               <i className="bi bi-list-ul me-2 fs-5"></i>
//               {!isCollapsed && <span>All Businesses</span>}
//             </Link>
//           </li>

//           <hr />
//           <li className="nav-item mb-3">
//             <Link to={`/businessdashboard/${selectedBusinessId}`} className="nav-link text-white d-flex align-items-center">
//               <i className="bi bi-speedometer2 me-2 fs-5"></i>
//               {!isCollapsed && <span>Dashboard</span>}
//             </Link>
//           </li>

//           <li className="nav-item mb-3">
//             <Link  to={`/managebusiness/${selectedBusinessId}`} className="nav-link text-white d-flex align-items-center">
//               <i className="bi bi-gear me-2 fs-5"></i>
//               {!isCollapsed && <span>Manage</span>}
//             </Link>
//           </li>

//           <li className="nav-item">
//             <button
//               className="nav-link text-white d-flex align-items-center bg-transparent border-0"
//               onClick={() => setShowSwitchBusiness(true)}
//             >
//               <i className="bi bi-arrow-repeat me-2 fs-5"></i>
//               {!isCollapsed && <span>Switch business</span>}
//             </button>
//           </li>
//         </ul>
//       </aside>

//       <SwitchBusinessModal
//         show={showSwitchBusiness}
//         onClose={() => setShowSwitchBusiness(false)}
//         businesses={businesses}
//         selectedBusiness={selectedBusiness}
//         onSwitch={(biz) => setSelectedBusiness(biz)}
//         onAddBusiness={() => alert("Redirect to Add Business")}
//       />
//     </>
//   );
// };

// export default Sidebar;

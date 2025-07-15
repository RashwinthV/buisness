// import React, { useEffect, useState, useContext } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import { Link, useNavigate } from "react-router-dom";
// import { UserContext } from "../context/userContext";

// function NavbarComponent() {
//   const [businesses, setBusinesses] = useState([]);
//   const [selectedBusiness, setSelectedBusiness] = useState(null);
//   const navigate = useNavigate();
//   const { logout, isloggedin, user } = useContext(UserContext);
//   const isLoggedIn = isloggedin();
//   useEffect(() => {
//     const fetchBusinesses = async () => {
//       const response = await Promise.resolve([
//         { id: 1, name: "Royal Challengers Bengaluru" },
//         { id: 2, name: "India Cricket" },
//       ]);
//       setBusinesses(response);
//     };
//     if (isLoggedIn) {
//       fetchBusinesses();
//     } else {
//       setBusinesses([]);
//       setSelectedBusiness(null);
//     }
//   }, [isLoggedIn]);

//   const isSubscribed = user?.subscription === "Premium";
//   const canManage = isSubscribed || businesses.length < 2;

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm">
//       <div className="container-fluid">
//         <Link to="/" className="navbar-brand fw-bold">
//           Business Management
//         </Link>

//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ms-auto align-items-center">
//             {isLoggedIn ? (
//               <>
//                 <li className="nav-item dropdown">
//                   <p
//                     className="nav-link dropdown-toggle d-flex align-items-center"
//                     role="button"
//                     data-bs-toggle="dropdown"
//                   >
//                     <img
//                       src={user?.profilePic}
//                       alt="Profile"
//                       width="32"
//                       height="32"
//                       className="rounded-circle me-2"
//                     />
//                     <span className="fw-semibold text-white">{user?.firstName}</span>
//                   </p>
//                   <ul className="dropdown-menu dropdown-menu-end">
//                     <li>
//                       <Link to={"/profile"} className="dropdown-item">
//                         Profile
//                       </Link>
//                     </li>
//                     <li>
//                       <Link to={"/settings"} className="dropdown-item">
//                         Settings
//                       </Link>
//                     </li>
//                     <li>
//                       <Link to={"/plans"} className="dropdown-item">
//                         Plans
//                       </Link>
//                     </li>
//                     <li>
//                       <hr className="dropdown-divider" />
//                     </li>
//                     <li>
//                       <button
//                         className="dropdown-item"
//                         onClick={() => logout()}
//                       >
//                         Logout
//                       </button>
//                     </li>
//                   </ul>
//                 </li>
//               </>
//             ) : (
//               <li className="nav-item mx-3">
//                 <button
//                   className="btn btn-outline-light"
//                   onClick={() => navigate("/login")}
//                 >
//                   Login
//                 </button>
//               </li>
//             )}

//             {/* dev info  */}
//             <Link
//              to="/developers"
//               className="btn btn-sm btn-outline-info rounded-circle"
//               title="Developer Info"
//               style={{
//                 width: "32px",
//                 height: "32px",
//                 padding: 0,
//                 textAlign: "center",
//                 lineHeight: "28px",
//               }}
//             >
//               <i className="bi bi-info-lg"></i>
//             </Link>


//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default NavbarComponent;

import  {useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

function NavbarComponent() {
  const navigate = useNavigate();
  const { logout, isloggedin, user } = useContext(UserContext);
  const isLoggedIn = isloggedin();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bold">
          Business 
        </Link>

        {/* ❌ Removed navbar-toggler and collapse behavior */}
        <div className="d-flex ms-auto align-items-center">
          {isLoggedIn ? (
            <>
              {/* ✅ Profile dropdown remains */}
              <li className="nav-item dropdown list-unstyled me-3">
                <p
                  className="nav-link dropdown-toggle d-flex align-items-center mb-0"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  <img
                    src={user?.profilePic}
                    alt="Profile"
                    width="32"
                    height="32"
                    className="rounded-circle me-2"
                  />
                  <span className="fw-semibold text-white">{user?.firstName}</span>
                </p>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link to="/profile" className="dropdown-item">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings" className="dropdown-item">
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link to="/plans" className="dropdown-item">
                      Plans
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={logout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            </>
          ) : (
            <li className="nav-item mx-3 list-unstyled">
              <button
                className="btn btn-outline-light"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </li>
          )}

          {/* Developer Info Button */}
          <Link
            to="/developers"
            className="btn btn-sm btn-outline-info rounded-circle"
            title="Developer Info"
            style={{
              width: "32px",
              height: "32px",
              padding: 0,
              textAlign: "center",
              lineHeight: "28px",
            }}
          >
            <i className="bi bi-info-lg"></i>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavbarComponent;

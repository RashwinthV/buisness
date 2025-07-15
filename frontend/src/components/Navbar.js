import React, { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

function NavbarComponent() {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const navigate = useNavigate();
  const { logout, isloggedin, user } = useContext(UserContext);
  const isLoggedIn = isloggedin();

  // //  {
  //   name: "Kirithik",
  //   profilePic: "https://via.placeholder.com/40",
  //   subscription: "Regular",
  // };

  useEffect(() => {
    const fetchBusinesses = async () => {
      const response = await Promise.resolve([
        { id: 1, name: "Royal Challengers Bengaluru" },
        { id: 2, name: "India Cricket" },
      ]);
      setBusinesses(response);
    };
    if (isLoggedIn) {
      fetchBusinesses();
    } else {
      setBusinesses([]);
      setSelectedBusiness(null);
    }
  }, [isLoggedIn]);

  const isSubscribed = user?.subscription === "Premium";
  const canManage = isSubscribed || businesses.length < 2;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bold">
          Business Management
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {isLoggedIn && (
              <li className="nav-item">
                <a className="nav-link" href="#plans">
                  Plans
                </a>
              </li>
            )}
          </ul>

          <ul className="navbar-nav ms-auto align-items-center">
            {isLoggedIn ? (
              <>
                {businesses.length === 0 ? (
                  <a
                    href="#create-business"
                    className="btn btn-outline-light me-2"
                  >
                    + Create Business
                  </a>
                ) : (
                  <li className="nav-item dropdown me-3">
                    <p
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                    >
                      {selectedBusiness
                        ? selectedBusiness.name
                        : "Your Businesses"}
                    </p>
                    <ul className="dropdown-menu dropdown-menu-end">
                      {businesses.map((biz) => (
                        <li key={biz.id}>
                          <button
                            className={`dropdown-item ${
                              selectedBusiness?.id === biz.id ? "active" : ""
                            }`}
                            onClick={() => setSelectedBusiness(biz)}
                          >
                            {biz.name}
                          </button>
                        </li>
                      ))}
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        {canManage ? (
                          <a className="dropdown-item" href="#business/manage">
                            Manage Businesses
                          </a>
                        ) : (
                          <button className="dropdown-item disabled" disabled>
                            Manage Businesses (Premium Only)
                          </button>
                        )}
                      </li>
                    </ul>
                  </li>
                )}

                <li className="nav-item dropdown">
                  <p
                    className="nav-link dropdown-toggle d-flex align-items-center"
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
                    <span className="fw-semibold text-white">{user?.name}</span>
                  </p>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link to={"/profile"} className="dropdown-item">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link to={"/settings"} className="dropdown-item">
                        Settings
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => logout()}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button
                  className="btn btn-outline-light"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavbarComponent;

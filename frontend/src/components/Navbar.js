import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate } from "react-router-dom";
import {  useUser } from "../context/userContext";
import image from '../Assets/Images/Default.png'

function NavbarComponent() {
  const navigate = useNavigate();
  const { logout, isloggedin, user } = useUser();
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
                    src={user?.profilepic||image}
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

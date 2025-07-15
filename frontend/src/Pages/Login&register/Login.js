import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

function Login() {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "test@example.com" && password === "password") {
      const dummyUser = {
        email,
        password,
      };
      login(dummyUser);
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  const handleGoogleLogin = () => {
    alert("Google login clicked!");
    // integrate Google OAuth here
  };

  const handleFacebookLogin = () => {
    alert("Facebook login clicked!");
    // integrate Facebook OAuth here
  };

  return (
    // <div className="container d-flex justify-content-center align-items-center ">
    //   <div
    //     className="card shadow-sm p-4"
    //     style={{ maxWidth: "400px", width: "100%" }}
    //   >
    //     <h3 className="mb-4 text-center">Login</h3>

    //     {/* Email Login */}
    //     <form onSubmit={handleLogin}>
    //       <div className="mb-3">
    //         <label htmlFor="email" className="form-label">
    //           Email address
    //         </label>
    //         <input
    //           type="email"
    //           id="email"
    //           className="form-control"
    //           placeholder="Enter your email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           required
    //         />
    //       </div>

    //       <div className="mb-3">
    //         <label htmlFor="password" className="form-label">
    //           Password
    //         </label>
    //         <input
    //           type="password"
    //           id="password"
    //           className="form-control"
    //           placeholder="Enter your password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           required
    //         />
    //       </div>

    //       <div className="d-grid mb-3">
    //         <button type="submit" className="btn btn-primary">
    //           Login
    //         </button>
    //       </div>
    //       <div className="text-center mb-3">
    //         <span className="text-muted">or login with </span>
    //       </div>
    //       {/* Social Login */}
    //       <div className="d-grid gap-2 mb-3">
    //         <button
    //           className="btn btn-outline-danger"
    //           onClick={handleGoogleLogin}
    //         >
    //           <i className="bi bi-google me-2"></i> Continue with Google
    //         </button>
    //         <button
    //           className="btn btn-outline-primary"
    //           onClick={handleFacebookLogin}
    //         >
    //           <i className="bi bi-facebook me-2"></i> Continue with Facebook
    //         </button>
    //       </div>
    //       <div className="text-center">
    //         <span>Don't have an account? </span>
    //         <a href="/register">Register</a>
    //       </div>
    //     </form>
    //   </div>
    // </div>
        <div className="container-fluid max-vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100 justify-content-center">
        <div className="col-11 col-sm-8 col-md-6 col-lg-4">
          <div className="card shadow-sm p-4">
            <h3 className="mb-4 text-center">Login</h3>

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="d-grid mb-3">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>

              <div className="text-center mb-3">
                <span className="text-muted">or login with</span>
              </div>

              <div className="d-grid gap-2 mb-3">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={handleGoogleLogin}
                >
                  <i className="bi bi-google me-2"></i> Continue with Google
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={handleFacebookLogin}
                >
                  <i className="bi bi-facebook me-2"></i> Continue with Facebook
                </button>
              </div>

              <div className="text-center">
                <span>Don't have an account? </span>
                <a href="/register">Register</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

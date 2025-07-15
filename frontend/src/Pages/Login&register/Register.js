import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const navigate = useNavigate();

  return (
    // <div className="container mt-5" style={{ maxWidth: "400px" }}>
    //   <div className="card shadow-sm">
    //     <div className="card-body">
    //       <h4 className="card-title text-center mb-4">Register</h4>

    //       <form>
    //         <div className="mb-3">
    //           <label className="form-label">Full Name</label>
    //           <input
    //             type="text"
    //             className="form-control"
    //             placeholder="Enter your name"
    //             required
    //           />
    //         </div>

    //         <div className="mb-3">
    //           <label className="form-label">Email address</label>
    //           <input
    //             type="email"
    //             className="form-control"
    //             placeholder="Enter email"
    //             required
    //           />
    //         </div>

    //         <div className="mb-3">
    //           <label className="form-label">Password</label>
    //           <input
    //             type="password"
    //             className="form-control"
    //             placeholder="Enter password"
    //             required
    //           />
    //         </div>

    //         <div className="mb-3">
    //           <label className="form-label">Confirm Password</label>
    //           <input
    //             type="password"
    //             className="form-control"
    //             placeholder="Re-enter password"
    //             required
    //           />
    //         </div>

    //         <button type="submit" className="btn btn-primary w-100">
    //           Register
    //         </button>
    //       </form>

    //       <div className="text-center mt-3">
    //         <span>Already have an account? </span>
    //         <button
    //           className="btn btn-link p-0"
    //           onClick={() => navigate("/login")}
    //         >
    //           Login
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
        <div className="container-fluid max-vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100 justify-content-center">
        <div className="col-11 col-sm-8 col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title text-center mb-4">Register</h4>

              <form>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Re-enter password"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Register
                </button>
              </form>

              <div className="text-center mt-3">
                <span>Already have an account? </span>
                <button
                  className="btn btn-link p-0"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;

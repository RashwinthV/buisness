import { useState } from "react";
import {toast}from 'react-toastify'
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BACKEND_URI;
  const[rules,setrules]=useState(false)
  const[confirmrules,setConfirmrules]=useState(false)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    email: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
    newsSubscription: false,
    termsAccepted: false,
  });

  const [passwordValidations, setPasswordValidations] = useState({
    minLength: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const validatePasswordRules = (password) => {
    setPasswordValidations({
      minLength: password.length >= 6,
      hasUppercase: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const isPasswordValid = Object.values(passwordValidations).every(Boolean);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "password") {
      validatePasswordRules(value);
    }

    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      toast.info("You must accept the terms and conditions.");
      return;
    }

    if (!isPasswordValid) {
      toast.info("Password does not meet requirements.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/v1/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Registration successful!");
        navigate("/login");
      } else {
        toast.error(result.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Server error. Try again later.");
    }
  };

  return (
    <div className="container-fluid max-vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100 justify-content-center">
        <div className="col-11 col-sm-8 col-md-6 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title text-center mb-4">Register</h4>

              <form onSubmit={handleSubmit}>
                {/* Name fields */}
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Email and phone */}
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phoneNo"
                      value={formData.phoneNo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Password and Confirm */}
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onClick={(()=>{setrules(true)})}
                      required
                    />
                   {rules &&( <ul className="list-unstyled mt-2">
                      <li style={{ color: passwordValidations.minLength ? "green" : "red" }}>
                        {passwordValidations.minLength ? "✔" : "✖"} Minimum 6 characters
                      </li>
                      <li style={{ color: passwordValidations.hasUppercase ? "green" : "red" }}>
                        {passwordValidations.hasUppercase ? "✔" : "✖"} At least 1 uppercase letter
                      </li>
                      <li style={{ color: passwordValidations.hasNumber ? "green" : "red" }}>
                        {passwordValidations.hasNumber ? "✔" : "✖"} At least 1 number
                      </li>
                      <li style={{ color: passwordValidations.hasSpecialChar ? "green" : "red" }}>
                        {passwordValidations.hasSpecialChar ? "✔" : "✖"} At least 1 special character
                      </li>
                    </ul>)}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      onClick={(()=>setConfirmrules(true))}
                      required
                    />
                  </div>
                    {confirmrules &&(<ul className="list-unstyled mt-2">
                     <li style={{ color: passwordValidations.hasSpecialChar ? "green" : "red" }}>
                        {passwordValidations.hasSpecialChar ? "✔" : "✖"} At least 1 special character
                      </li>
                  </ul>)}
                </div>

                {/* Age and gender */}
                <div className="row">
                  <div className="mb-3 col-md-4">
                    <label className="form-label">Date Of Birth</label>
                    <input
                      type="date"
                      className="form-control"
                      name="age"
                      value={formData.dob}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 col-md-8">
                    <label className="form-label">Gender</label>
                    <select
                      className="form-select"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Address */}
                <hr />
                <h5 className="mb-3">Address</h5>
                <div className="mb-3">
                  <label className="form-label">Address Line 1</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address.line1"
                    value={formData.address.line1}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Address Line 2</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address.line2"
                    value={formData.address.line2}
                    onChange={handleChange}
                  />
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">State</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address.state"
                      value={formData.address.state}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Country</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address.country"
                      value={formData.address.country}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Pincode</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address.pincode"
                      value={formData.address.pincode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="newsSubscription"
                    checked={formData.newsSubscription}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Subscribe to newsletter</label>
                </div>

                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={(e) =>
                      setFormData({ ...formData, termsAccepted: e.target.checked })
                    }
                    required
                  />
                  <label className="form-check-label">
                    I agree to the{" "}
                    <a href="/terms" target="_blank" rel="noopener noreferrer">
                      Terms and Conditions
                    </a>
                  </label>
                </div>

                <button type="submit" className="btn btn-primary w-100" disabled={!isPasswordValid}>
                  Register
                </button>
              </form>

              <div className="text-center mt-3">
                <span>Already have an account? </span>
                <button className="btn btn-link p-0" onClick={() => navigate("/login")}>
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

export default Register;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function BusinessRegister() {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BACKEND_URI;

  const [formData, setFormData] = useState({
    businessName: "",
    businessEmail: "",
    addressLine1: "",
    addressLine2: "",
    googleMapLink: "",
    ownerContact: "",
    officeContact: "",
    startedOn: "",
  });

  const [userPhone, setUserPhone] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "businessName",
      "businessEmail",
      "addressLine1",
      "ownerContact",
      "startedOn",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.warning(`Please fill the ${field} field.`);
        return;
      }
    }

    try {
      const res = await fetch(`${baseUrl}/v1/business/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Business registered successfully!");
        navigate("/dashboard"); // Or any route you prefer
      } else {
        toast.error(result.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error registering business:", error);
      toast.error("Server error. Try again later.");
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="text-center mb-4">Business Registration</h4>
              {/* <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Business Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Business Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="businessEmail"
                    value={formData.businessEmail}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Address Line 1</label>
                  <input
                    type="text"
                    className="form-control"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Address Line 2</label>
                  <input
                    type="text"
                    className="form-control"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Google Map Link</label>
                  <input
                    type="url"
                    className="form-control"
                    name="googleMapLink"
                    value={formData.googleMapLink}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Contact Number (Owner)</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="ownerContact"
                    value={formData.ownerContact}
                    onChange={handleChange}
                    placeholder="Enter if not auto-fetched"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Contact Number (Office)</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="officeContact"
                    value={formData.officeContact}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Started On</label>
                  <input
                    type="date"
                    className="form-control"
                    name="startedOn"
                    value={formData.startedOn}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-success w-100">
                  Register Business
                </button>
              </form> */}
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">
                      Business Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-md-6">
                    <label className="form-label">
                      Business Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="businessEmail"
                      value={formData.businessEmail}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">
                      Address Line 1 <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="addressLine1"
                      value={formData.addressLine1}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-md-6">
                    <label className="form-label">Address Line 2</label>
                    <input
                      type="text"
                      className="form-control"
                      name="addressLine2"
                      value={formData.addressLine2}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">
                      City <span className="text-danger">*</span>
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      name="businessCity"
                      value={formData.businessCity}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-md-6">
                    <label className="form-label">
                      District <span className="text-danger">*</span>
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      name="businessDistrict"
                      value={formData.businessDistrict}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">
                      Zip Code <span className="text-danger">*</span>
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      name="businessZipCode"
                      value={formData.businessZipCode}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-md-6">
                    <label className="form-label">Google Map Link</label>
                    <input
                      type="url"
                      className="form-control"
                      name="googleMapLink"
                      value={formData.googleMapLink}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">
                      Contact Number (Owner){" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      name="ownerContact"
                      value={formData.ownerContact}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-md-6">
                    <label className="form-label">
                      Contact Number (Office)
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      name="officeContact"
                      value={formData.officeContact}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">
                      Started On <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      name="startedOn"
                      value={formData.startedOn}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-success w-100">
                  Register Business
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessRegister;

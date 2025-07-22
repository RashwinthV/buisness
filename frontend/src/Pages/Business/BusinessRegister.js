import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../../context/userContext";
import Image_default from "../../Assets/Images/Default.png";
import { useBusinessImageUpload } from "../../Utils/Image/ImageUploader";
import { useRef } from "react";

function BusinessRegister() {
  const navigate = useNavigate();
  const { user } = useUser();
  const baseUrl = process.env.REACT_APP_BACKEND_URI;
  const token = localStorage.getItem("token");
  const submittedRef = useRef(false);

  const [formData, setFormData] = useState({
    businessName: "",
    businessEmail: "",
    description: "",
    addressLine1: "",
    addressLine2: "",
    googleMapLink: "",
    ownerContact: "",
    officeContact: "",
    startedOn: "",
    gstnumber: "",
    businessCity: "",
    businessDistrict: "",
    businessState: "",
    businessCountry: "",
    businessZipCode: "",
    logo: null,
    submitted: false,
  });

  const { handleImageUpload } = useBusinessImageUpload({
    userId: user?.id,
    token,
    publicId: formData.logo?.publicId,
     submittedRef,
    setImageData: (logo) => setFormData((prev) => ({ ...prev, logo })),
    baseUrl,
  });

  const handleChange = async (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) await handleImageUpload(file);
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
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
      const res = await fetch(`${baseUrl}/v2/bussiness/register/${user?.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok) {
        submittedRef.current = true; // set instantly
        setFormData((prev) => ({ ...prev, submitted: true }));
        toast.success("Business registered successfully!");
        setTimeout(() => {
          navigate("/");
        }, 100);
      } else {
        toast.error(result.message || "Registration failed.");
      }
    } catch (error) {
      toast.error("Server error. Try again later.");
    }
  };

  return (
    <div className="container py-4">
      <h4 className="mb-4 text-center">Register New Business</h4>

      {/* Logo Upload */}
      <div className="row mb-4 justify-content-center">
        <div className="col-12 text-center mb-3">
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              overflow: "hidden",
              margin: "0 auto",
              border: "2px solid #ddd",
            }}
          >
            <img
              src={formData.logo?.imageUrl || Image_default}
              alt="Business Logo"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/120?text=Logo";
              }}
            />
          </div>
          <div className="mt-2">
            <input
              type="file"
              accept="image/*"
              className="form-control form-control-sm w-50 mx-auto"
              name="logo"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* Business Details */}
      <h6 className="text-danger">Business Details</h6>
      <div className="row gy-3">
        <div className="col-md-4">
          <label>Business Name *</label>
          <input
            type="text"
            name="businessName"
            className="form-control"
            value={formData.businessName}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label>Business Email *</label>
          <input
            type="email"
            name="businessEmail"
            className="form-control"
            value={formData.businessEmail}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label>Started On *</label>
          <input
            type="date"
            name="startedOn"
            className="form-control"
            value={formData.startedOn}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label>Description</label>
          <textarea
            name="description"
            rows={3}
            className="form-control"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="col-md-6">
          <label>Google Map Link</label>
          <input
            type="url"
            name="googleMapLink"
            className="form-control"
            value={formData.googleMapLink}
            onChange={handleChange}
          />
        </div>

        {/* Address Details */}
        <hr className="mt-4" />
        <h6 className="text-danger">Address Details</h6>
        <div className="col-md-4">
          <label>Address Line 1 *</label>
          <input
            type="text"
            name="addressLine1"
            className="form-control"
            value={formData.addressLine1}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label>Address Line 2</label>
          <input
            type="text"
            name="addressLine2"
            className="form-control"
            value={formData.addressLine2}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label>City *</label>
          <input
            type="text"
            name="businessCity"
            className="form-control"
            value={formData.businessCity}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label>District *</label>
          <input
            type="text"
            name="businessDistrict"
            className="form-control"
            value={formData.businessDistrict}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label>State *</label>
          <input
            type="text"
            name="businessState"
            className="form-control"
            value={formData.businessState}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label>Country *</label>
          <input
            type="text"
            name="businessCountry"
            className="form-control"
            value={formData.businessCountry}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label>Zip Code *</label>
          <input
            type="text"
            name="businessZipCode"
            className="form-control"
            value={formData.businessZipCode}
            onChange={handleChange}
          />
        </div>

        {/* Contact Info */}
        <hr className="mt-4" />
        <h6 className="text-danger">Contact Info</h6>
        <div className="col-md-4">
          <label>Owner Contact *</label>
          <input
            type="tel"
            name="ownerContact"
            className="form-control"
            value={formData.ownerContact}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label>Office Contact</label>
          <input
            type="tel"
            name="officeContact"
            className="form-control"
            value={formData.officeContact}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label>GST Number</label>
          <input
            type="text"
            name="gstnumber"
            className="form-control"
            value={formData.gstnumber}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="text-end mt-4">
        <button className="btn btn-success" onClick={handleSubmit}>
          Register Business
        </button>
      </div>
    </div>
  );
}

export default BusinessRegister;

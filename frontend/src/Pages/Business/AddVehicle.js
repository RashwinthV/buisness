import { useState } from "react";
import { toast } from "react-toastify";
import Image_default from "../../Assets/Images/Default.png"; // Replace with your default image path
const AddVehicle = () => {
  const [formData, setFormData] = useState({
    image: null,
    name: "",
    model: "",
    brand: "",
    registrationNumber: "",
    registeredOwnerName: "",
    rtoDetails: "",
    registrationDate: "",
    ownership: "",
    insuranceValidTill: "",
    fcValidTill: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    const requiredFields = [
      "name",
      "model",
      "brand",
      "registrationNumber",
      "registeredOwnerName",
      "rtoDetails",
      "registrationDate",
      "ownership",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.warning(`Please fill the ${field} field.`);
        return;
      }
    }

    // Proceed to submit (API call here)
    toast.success("Vehicle registered successfully!");
  };

  return (
    <div className="container py-4">
      <h4 className="mb-4 text-center">Vehicle Registration</h4>

      {/* Vehicle Image Upload */}
      <div className="row mb-4 justify-content-center">
        <div className="col-12 text-center mb-3">
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "10px",
              overflow: "hidden",
              margin: "0 auto",
              border: "2px solid #ddd",
            }}
          >
            <img
              src={
                formData.image
                  ? URL.createObjectURL(formData.image)
                  : Image_default
              }
              alt="Vehicle"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/120?text=Vehicle";
              }}
            />
          </div>
          <div className="mt-2">
            <input
              type="file"
              accept="image/*"
              className="form-control form-control-sm w-50 mx-auto"
              name="image"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="row gy-3">
        <div className="col-md-4">
          <label>Vehicle Name *</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label>Model *</label>
          <input
            type="text"
            name="model"
            className="form-control"
            value={formData.model}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label>Brand *</label>
          <input
            type="text"
            name="brand"
            className="form-control"
            value={formData.brand}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4">
          <label>Registration Number *</label>
          <input
            type="text"
            name="registrationNumber"
            className="form-control"
            value={formData.registrationNumber}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4">
          <label>Registered Owner Name *</label>
          <input
            type="text"
            name="registeredOwnerName"
            className="form-control"
            value={formData.registeredOwnerName}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4">
          <label>RTO Details *</label>
          <input
            type="text"
            name="rtoDetails"
            className="form-control"
            value={formData.rtoDetails}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4">
          <label>Registration Date *</label>
          <input
            type="date"
            name="registrationDate"
            className="form-control"
            value={formData.registrationDate}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4">
          <label>Ownership *</label>
          <select
            name="ownership"
            className="form-select"
            value={formData.ownership}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="first">First</option>
            <option value="second">Second</option>
            <option value="third">Third</option>
            <option value="others">Others</option>
          </select>
        </div>

        <div className="col-md-4">
          <label>Insurance Valid Till</label>
          <input
            type="date"
            name="insuranceValidTill"
            className="form-control"
            value={formData.insuranceValidTill}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4">
          <label>FC Valid Till</label>
          <input
            type="date"
            name="fcValidTill"
            className="form-control"
            value={formData.fcValidTill}
            onChange={handleChange}
          />
        </div>

        {/* Add additional fields below if needed */}
      </div>

      <div className="text-end mt-4">
        <button className="btn btn-success" onClick={handleSubmit}>
          Register Vehicle
        </button>
      </div>
    </div>
  );
};

export default AddVehicle;

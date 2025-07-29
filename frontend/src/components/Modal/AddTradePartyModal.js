import React, { useState } from "react";
import { toast } from "react-toastify";
import Image_default from "../../Assets/Images/Default.png";
import { Modal, Button } from "react-bootstrap";
const DEFAULT_PARTY_TYPES = ["buyer", "supplier", "both"];
const AddTradePartyModal = ({ show, handleClose }) => {
  const baseUrl = process.env.REACT_APP_BACKEND_URI;

  const [formData, setFormData] = useState({
    name: "",
    partyType: "",
    product: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    district: "",
    pincode: "",
    contact: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    const requiredFields = [
      "name",
      "partyType",
      "product",
      "addressLine1",
      "city",
      "district",
      "pincode",
      "contact",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.warning(`Please fill the ${field} field.`);
        return;
      }
    }

    const partyData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) partyData.append(key, value);
    });

    try {
      const res = await fetch(`${baseUrl}/v1/tradeparty/add`, {
        method: "POST",
        body: partyData,
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Trade party added successfully!");
        handleClose();
      } else {
        toast.error(result.message || "Failed to add trade party.");
      }
    } catch (err) {
      console.error("Error adding trade party:", err);
      toast.error("Server error. Try again later.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Add New Trade Party</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center mb-3">
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "12px",
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
              alt="Preview"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => (e.target.src = Image_default)}
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

        <div className="row gy-3">
          <div className="col-md-6">
            <label>Name *</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label>Party Type *</label>
            <select
              className="form-select"
              name="partyType"
              value={formData.partyType}
              onChange={handleChange}
            >

    <option value="">Choose</option>
  {DEFAULT_PARTY_TYPES.map((type, index) => (
    <option key={index} value={type}>
      {type.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase())}
    </option> ))}
            </select>
          </div>

          <div className="col-md-6">
            <label>Product *</label>
            <input
              type="text"
              name="product"
              className="form-control"
              value={formData.product}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label>Contact Number *</label>
            <input
              type="tel"
              name="contact"
              className="form-control"
              value={formData.contact}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label>Address Line 1 *</label>
            <input
              type="text"
              name="addressLine1"
              className="form-control"
              value={formData.addressLine1}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
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
              name="city"
              className="form-control"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label>District *</label>
            <input
              type="text"
              name="district"
              className="form-control"
              value={formData.district}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label>Pincode *</label>
            <input
              type="text"
              name="pincode"
              className="form-control"
              value={formData.pincode}
              onChange={handleChange}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Add Party
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddTradePartyModal;

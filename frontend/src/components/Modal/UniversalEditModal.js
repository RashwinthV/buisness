import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";

const UniversalEditModal = ({
  show,
  handleClose,
  handleSave,
  formData,
  setFormData,
  fields,
  title = "Edit Data",
  includeImage = true,
  onImageChange,
}) => {
  // Format ISO or date string to YYYY-MM-DD
  const formatDateForInput = (value) => {
    if (!value) return "";
    try {
      return new Date(value).toISOString().split("T")[0];
    } catch {
      return "";
    }
  };

const handleChange = (e) => {
  const { name, value, type, files } = e.target;

  if (type === "file") {
    const file = files[0];
    if (file) {
      if (onImageChange) {
        onImageChange(file);
      }

      setFormData((prev) => ({
        ...prev,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  } else {
    // Auto-calculate Age when DOB changes
    if (name === "dateOfBirth") {
      const dob = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
      }

      setFormData((prev) => ({
        ...prev,
        [name]: value,
        Age: age < 0 ? 0 : age, // Prevent negative age
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }
};


  // Debug (optional)
  // console.log(formData);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {/* Image Upload Preview */}
          {includeImage && (
            <Form.Group
              className="mb-3 text-center d-flex justify-content-center"
              style={{ position: "relative", display: "inline-block" }}
            >
              <div style={{ position: "relative", display: "inline-block" }}>
                <img
                  src={
                    formData.imagePreview ||
                    formData.image?.imageUrl ||
                    formData.profilepic?.imageUrl ||
                    ""
                  }
                  alt="Preview"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "5px solid #ccc",
                  }}
                />

                <Form.Control
                  type="file"
                  name="image"
                  onChange={handleChange}
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={(ref) => (window.imageUploadInput = ref)}
                />

                <div
                  className="bg-secondary text-center d-flex justify-content-center"
                  onClick={() => window.imageUploadInput?.click()}
                  style={{
                    position: "absolute",
                    bottom: "70px",
                    right: 0,
                    backgroundColor: "#fff",
                    borderRadius: "50%",
                    padding: "6px",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                  }}
                >
                  <FaEdit className="text-white" />
                </div>
              </div>
            </Form.Group>
          )}

          {/* Dynamic Input Fields */}
          {fields.map((field) => (
            <div key={field.name} className="mb-3">
              <label className="form-label">{field.label}</label>
              <input
                type={field.type || "text"}
                name={field.name}
                value={
                  field.type === "date" && formData[field.name]
                    ? formatDateForInput(formData[field.name])
                    : formData[field.name] || ""
                }
                onChange={handleChange}
                className="form-control"
                disabled={field.disabled || false}
              />
            </div>
          ))}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => handleSave(formData)}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UniversalEditModal;

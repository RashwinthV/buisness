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
  onImageChange, // ⬅️ receive prop
}) => {
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        // Call image upload logic from parent
        if (onImageChange) {
          onImageChange(file);
        }

        // Optional: Update preview immediately
        setFormData((prev) => ({
          ...prev,
          imagePreview: URL.createObjectURL(file),
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {includeImage && (
            <Form.Group
              className="mb-3 text-center d-flex justify-content-center"
              style={{ position: "relative", display: "inline-block" }}
            >
              <div style={{ position: "relative", display: "inline-block" }}>
                <img
                  src={
                    formData.imagePreview ||
                    (typeof formData.image?.imageUrl === "string"
                      ? formData.image?.imageUrl
                      : "")
                  }
                  alt="Preview"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "contain",
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
                  <FaEdit className="text-white " />
                </div>
              </div>
            </Form.Group>
          )}

          {fields.map((field) => (
            <div key={field.name} className="mb-3">
              <label className="form-label">{field.label}</label>
              <input
                type={field.type || "text"}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={(e) =>
                  setFormData({ ...formData, [field.name]: e.target.value })
                }
                className="form-control"
                disabled={field.disabled || false} // <- 🔑 DISABLE if flag is true
              />
            </div>
          ))}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UniversalEditModal;

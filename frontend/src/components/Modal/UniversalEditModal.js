import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const UniversalEditModal = ({
  show,
  handleClose,
  handleSave,
  formData,
  setFormData,
  fields,
  title = "Edit Data",
  includeImage = true,
}) => {
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        setFormData((prev) => ({
          ...prev,
          image: file,
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
            <Form.Group className="mb-3 text-center">
              <img
                src={
                  formData.imagePreview ||
                  (typeof formData.image === "string"
                    ? formData.image
                    : "")
                }
                alt="Preview"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #ccc",
                }}
              />
              <Form.Control
                type="file"
                name="image"
                className="mt-2"
                onChange={handleChange}
                accept="image/*"
              />
            </Form.Group>
          )}

          {fields.map((field) => (
            <Form.Group key={field.name} className="mb-3">
              <Form.Label>{field.label}</Form.Label>
              <Form.Control
                type={field.type || "text"}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                placeholder={field.placeholder || ""}
              />
            </Form.Group>
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

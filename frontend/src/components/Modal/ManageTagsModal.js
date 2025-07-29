import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ManageTagsModal = ({ show, onHide, title, initialTags, onSave }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setTags(initialTags || []);
  }, [initialTags]);

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && e.target.value.trim()) {
      e.preventDefault();
      const newTag = e.target.value.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      e.target.value = "";
    }
  };

  const removeTag = (tag) => {
    if (tags.length > 1) {
      setTags(tags.filter(t => t !== tag));
    } else {
      alert("At least one entry is required!");
    }
  };

  const handleSave = () => {
    onSave(tags);
    onHide();
  };
  

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Manage {title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label>Enter Tags</Form.Label>
        <div className="border p-2 rounded d-flex flex-wrap" style={{ minHeight: "60px" }}>
          {tags.map((tag, idx) => (
            <span key={idx} className="badge bg-secondary m-1">
              {tag}
              <button
                type="button"
                className="btn-close btn-close-white btn-sm ms-2"
                onClick={() => removeTag(tag)}
              ></button>
            </span>
          ))}
          <input
            type="text"
            className="form-control border-0 shadow-none flex-grow-1"
            placeholder="Type and press Enter"
            onKeyDown={handleKeyDown}
            style={{ minWidth: "120px" }}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="success" onClick={handleSave}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ManageTagsModal;

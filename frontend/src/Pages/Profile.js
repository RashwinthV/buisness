import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Image_default from "../Assets/Images/Default.png"; // ✅ import default image

const Profile = () => {
  const [editMode, setEditMode] = useState(false);

  const [user, setUser] = useState({
    image: "", // base64 or url
    name: "",
    email: "",
    mobile: "",
    password: "",
    address1: "",
    address2: "",
    city: "",
    district: "",
    pincode: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setUser((prev) => ({
        ...prev,
        image: reader.result, // base64 for preview
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Profile</h4>
        <Button variant="outline-secondary" size="sm" onClick={() => setEditMode(!editMode)}>
          {editMode ? "Cancel" : <i className="bi bi-pencil-square"></i>}
        </Button>
      </div>

      <Row className="mb-4">
        <Col xs={12} md={4} className="text-center mb-3">
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
              src={user.image || Image_default}
              alt="User"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => (e.target.src = Image_default)}
            />
          </div>

          {editMode && (
            <div className="mt-2">
              <input
                type="file"
                accept="image/*"
                className="form-control form-control-sm"
                onChange={handleImageChange}
              />
            </div>
          )}
        </Col>

        <Col xs={12} md={8}>
          <Row className="gy-3">
            {[
              ["name", "Name"],
              ["email", "Email"],
              ["mobile", "Mobile Number"],
              ["password", "Password", "password"],
              ["address1", "Address Line 1"],
              ["address2", "Address Line 2"],
              ["city", "City"],
              ["district", "District"],
              ["pincode", "Pincode"],
            ].map(([field, label, type = "text"]) => (
              <Col md={field === "address1" || field === "address2" ? 12 : 4} key={field}>
                <label>{label}</label>
                {editMode ? (
                  <input
                    className="form-control"
                    name={field}
                    type={type}
                    value={user[field]}
                    onChange={handleInputChange}
                    placeholder={`Enter ${label.toLowerCase()}`}
                  />
                ) : (
                  <div>{field === "password" && user[field] ? "••••••••" : user[field] || "-"}</div>
                )}
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {editMode && (
        <div className="text-end">
          <Button variant="primary" onClick={() => setEditMode(false)}>
            Update
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Profile;

import React from "react";
import { Row, Col } from "react-bootstrap";
import Image_default from "../Assets/Images/Default.png";
import "../Styles/BusinessBanner.css"; // Assuming you have some styles for the banner
import { FaEdit } from "react-icons/fa"; // Make sure react-icons is installed

const BusinessBanner = ({ business }) => {
  if (!business) return null;

  return (
    <Row
      className="align-items-center mb-4 text-white justify-content-between"
      style={{
        backgroundImage: `url(${business.logo?.imageUrl || Image_default})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "20px",
        position: "relative",
        overflow: "hidden",
        minHeight: "200px",
      }}
    >
      {/* Overlay blur */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 1,
        }}
      />

      {/* Business Info */}
      <Col xs={12} md={8} className="text-start" style={{ zIndex: 2 }}>
        <h1 className="mb-2 fw-bold">{business.businessName || "-"}</h1>
        <p className="mb-1">
          <i className="bi bi-envelope-fill me-1" />
          {business.businessEmail || "N/A"}
        </p>
        {business.googleMapLink && (
          <a
            href={business.googleMapLink}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline-light btn-sm mt-2"
          >
            <i className="bi bi-geo-alt-fill me-1" />
            View on Map
          </a>
        )}
      </Col>

      {/* Business Logo */}
      {/* <Col xs={12} md={3} className="text-md-end text-center mt-3 mt-md-0" style={{ zIndex: 2 }}>
    <img
      src={business.logo?.imageUrl || Image_default}
      alt="Business Logo"
      style={{
        width: "100%",
        maxWidth: "130px",
        height: "130px",
        objectFit: "contain",
        borderRadius: "100px",
        border: "2px solid #ccc",
        backgroundColor: "#fff",
      }}
    />
  </Col> */}

      {/* test banner logo */}

      <Col
        xs={12}
        md={3}
        className="text-md-end text-center mt-3 mt-md-0"
        style={{ zIndex: 2, position: "relative" }}
      >
        <input
          type="file"
          accept="image/*"
          id="logoUpload"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              // handle file upload logic here
              console.log("Selected file:", file);
            }
          }}
        />

        <label
          htmlFor="logoUpload"
          style={{
            position: "relative",
            display: "inline-block",
            cursor: "pointer",
          }}
        >
          <img className="border border-secondary border-5"
            src={business.logo?.imageUrl || Image_default}
            alt="Business Logo"
            style={{
              width: "100%",
              maxWidth: "130px",
              height: "130px",
              objectFit: "contain",
              borderRadius: "100px",
            }}
          />

          <FaEdit className="text-white bg-secondary"
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              borderRadius: "40%",
              padding: "6px",
              fontSize: "35px",
              border: "1px solid #ccc",
              zIndex: 3,
            }}
          />
        </label>
      </Col>
    </Row>
  );
};

export default BusinessBanner;

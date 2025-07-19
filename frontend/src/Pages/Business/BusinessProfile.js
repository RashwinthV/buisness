import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Image_default from "../../Assets/Images/Default.png"; // Replace with your actual image path
import {
  getVerificationStatus,
  VerificationModal,
} from "../../Utils/VerifyStatus.js"; // adjust path
import { useBusiness } from "../../context/BussinessContext.js";
import { useUser } from "../../context/userContext.js";
import { toast } from "react-toastify";
import { useBusinessImageUpload } from "../../Utils/BussinessImageUploader.js";
import { useParams } from "react-router-dom";

const cleanValue = (val) => (val === "Unknown" ? "" : val);

const BusinessProfile = () => {
  const { user, token } = useUser();
  const { allbusinesses, selectedBusinessId } = useBusiness();
  const baseUrl = process.env.REACT_APP_BACKEND_URI;
  const currentUserId = user?.id;
  const { businessId: paramBusinessId } = useParams();

  const [editMode, setEditMode] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verifyType, setVerifyType] = useState("");
  const [verifyValue, setVerifyValue] = useState("");
  const submittedRef = useRef(false);

  const [business, setBusiness] = useState({
    _id: "",
    ownerId: "",
    logo: null,
    startedOn: "",
    businessName: "",
    businessEmail: "",
    emailVerified: false,
    description: "",
    addressLine1: "",
    addressLine2: "",
    businessCity: "",
    businessDistrict: "",
    businessState: "",
    businessCountry: "",
    businessZipCode: "",
    googleMapLink: "",
    ownerContact: "",
    officeContact: "",
    numberVerified: false,
    gstnumber: "",
    ownedBy: "",
  });

  useEffect(() => {
    if (!allbusinesses || allbusinesses.length === 0) return;
    const businessId = parseInt(paramBusinessId);

    const selected = allbusinesses.find((b) =>
      paramBusinessId
        ? b.businessId === businessId
        : b.businessId === selectedBusinessId
    );

    if (selected) {
      setBusiness({
        _id: selected._id,
        ownerId: selected.ownerId || user?.id || "",
        logo: selected.logo || null,
        startedOn: cleanValue(selected.startedOn),
        businessName: cleanValue(selected.businessName),
        businessEmail: cleanValue(selected.businessEmail),
        emailVerified: selected.emailVerified || false,
        description: cleanValue(selected.description),
        addressLine1: cleanValue(selected.addressLine1),
        addressLine2: cleanValue(selected.addressLine2),
        businessCity: cleanValue(selected.businessCity),
        businessDistrict: cleanValue(selected.businessDistrict),
        businessState: cleanValue(selected.businessState),
        businessCountry: cleanValue(selected.businessCountry),
        businessZipCode: cleanValue(selected.businessZipCode),
        googleMapLink: cleanValue(selected.googleMapLink),
        ownerContact: cleanValue(selected.ownerContact),
        officeContact: cleanValue(selected.officeContact),
        numberVerified: selected.numberVerified || false,
        gstnumber: cleanValue(selected.gstnumber),
        ownedBy: selected.ownedBy || "",
      });
    }
  }, [allbusinesses, selectedBusinessId, user?.id, paramBusinessId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBusiness((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoDelete = async () => {
    try {
      const res = await fetch(
        `${baseUrl}/v3/bussinessimage/deleteimage/${user?.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ public_id: business.logo?.publicId }),
        }
      );

      if (res.ok) {
        toast.success("Image deleted!");
        setBusiness((prev) => ({ ...prev, logo: null }));
      } else {
        const result = await res.json();
        toast.error(result.message || "Failed to delete image.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Error deleting image.");
    }
  };

  const { handleImageUpload } = useBusinessImageUpload({
    userId: user?.id,
    token,
    publicId: business.logo?.publicId,
    submittedRef,
    setImageData: (logo) => setBusiness((prev) => ({ ...prev, logo })),
    baseUrl,
  });

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    handleImageUpload(file);
  };

  const handleOpenVerify = (type, value) => {
    setVerifyType(type);
    setVerifyValue(value);
    setShowVerifyModal(true);
  };

  const handleVerificationSuccess = () => {
    if (verifyType === "email") {
      setBusiness((prev) => ({ ...prev, emailVerified: true }));
    } else if (verifyType === "phone") {
      setBusiness((prev) => ({ ...prev, numberVerified: true }));
    }
  };

  const formatDateForInput = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(
        `${baseUrl}/v2/bussiness/${user?.id}/updatebusiness/${business?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(business),
        }
      );

      const result = await res.json();
      if (res.ok) {
        submittedRef.current = true;
        toast.success("Business Profile updated successfully");
        setBusiness(result.business || business);
        setEditMode(false);
        window.location.reload();
      } else {
        toast.error(result.message || "Failed to update business");
      }
    } catch (error) {
      console.error("Business update error:", error);
      toast.error("Error updating business profile");
    }
  };

  return (
    <Container className="py-4">
      <h4 className="mb-2  text-center">Business Profile</h4>
      <div className="d-flex justify-content-end align-items-center mb-4">
        {currentUserId === business.ownedBy && (
          <Button
            variant="outline-primary"
            className="me-2"
            size="sm"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? "Cancel" : <i className="bi bi-pencil-square"></i>}
          </Button>
        )}

        {currentUserId === business.ownedBy && (
          <Button variant="outline-danger" size="sm" onClick={() => "/home"}>
            <i className="bi bi-trash3-fill"></i>
          </Button>
        )}
      </div>

      <Row className="mb-4">
        <Col xs={12} md={4} className="text-center mb-3">
          <div
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "20%",
              overflow: "hidden",
              margin: "0 auto",
              border: "2px solid #ddd",
            }}
          >
            <img
              src={
                business?.bussinessLogo ||
                business?.logo?.imageUrl ||
                Image_default
              }
              alt="Business Logo"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
              onError={(e) => (e.target.src = Image_default)}
            />
          </div>

          {editMode && (
            <div className="mt-2">
              <button
                className="btn btn-sm btn-outline-danger mb-3"
                onClick={handleLogoDelete}
              >
                <i className="bi bi-trash3"></i> Delete Logo
              </button>
              <input
                type="file"
                accept="image/*"
                className="form-control form-control-sm"
                onChange={handleLogoChange}
              />
            </div>
          )}
        </Col>

        <Col xs={12} md={8}>
          <Row className="gy-3">
            <Col md={6}>
              <label>Started On</label>
              {editMode ? (
                <input
                  type="date"
                  className="form-control"
                  name="startedOn"
                  value={formatDateForInput(business.startedOn)}
                  onChange={handleInputChange}
                />
              ) : (
                <div>
                  {new Date(business.startedOn).toLocaleDateString("en-gb") ||
                    "-"}
                </div>
              )}
            </Col>

            <Col md={6}>
              <label>Name</label>
              {editMode ? (
                <input
                  type="text"
                  className="form-control"
                  name="businessName"
                  value={business.businessName}
                  onChange={handleInputChange}
                  placeholder="Business Name"
                />
              ) : (
                <div>{business.businessName || "-"}</div>
              )}
            </Col>

            <Col md={6}>
              <label>
                Email{" "}
                {currentUserId === business.ownedBy &&
                  getVerificationStatus(business.emailVerified, "email", () =>
                    handleOpenVerify("email", business.businessEmail)
                  )}
              </label>
              {editMode ? (
                <input
                  type="email"
                  className="form-control"
                  name="businessEmail"
                  value={business.businessEmail}
                  onChange={handleInputChange}
                  placeholder="Email"
                />
              ) : (
                <div>{business.businessEmail || "-"}</div>
              )}
            </Col>

            <Col md={12}>
              <label>Description</label>
              {editMode ? (
                <textarea
                  className="form-control"
                  name="description"
                  rows={3}
                  value={business.description}
                  onChange={handleInputChange}
                  placeholder="Business description"
                />
              ) : (
                <div>{business.description || "-"}</div>
              )}
            </Col>

            <Col md={12}>
              <label>Address Line 1</label>
              {editMode ? (
                <input
                  className="form-control"
                  name="addressLine1"
                  value={business.addressLine1}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{business.addressLine1 || "-"}</div>
              )}
            </Col>

            <Col md={12}>
              <label>Address Line 2</label>
              {editMode ? (
                <input
                  className="form-control"
                  name="addressLine2"
                  value={business.addressLine2}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{business.addressLine2 || "-"}</div>
              )}
            </Col>

            <Col md={4}>
              <label>City</label>
              {editMode ? (
                <input
                  name="businessCity"
                  value={business.businessCity}
                  onChange={handleInputChange}
                  className="form-control"
                />
              ) : (
                <div>{business.businessCity || "-"}</div>
              )}
            </Col>

            <Col md={4}>
              <label>District</label>
              {editMode ? (
                <input
                  className="form-control"
                  name="businessDistrict"
                  value={business.businessDistrict}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{business.businessDistrict || "-"}</div>
              )}
            </Col>
            <Col md={4}>
              <label>State</label>
              {editMode ? (
                <input
                  className="form-control"
                  name="businessState"
                  value={business.businessState}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{business.businessState || "-"}</div>
              )}
            </Col>

            <Col md={4}>
              <label>Country</label>
              {editMode ? (
                <input
                  className="form-control"
                  name="businessCountry"
                  value={business.businessCountry}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{business.businessCountry || "-"}</div>
              )}
            </Col>

            <Col md={4}>
              <label>Pincode</label>
              {editMode ? (
                <input
                  className="form-control"
                  name="businessZipCode"
                  value={business.businessZipCode}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{business.businessZipCode || "-"}</div>
              )}
            </Col>

            <Col md={12}>
              <label>Google Map Link</label>
              <br />
              {editMode ? (
                <input
                  type="url"
                  className="form-control"
                  name="googleMapLink"
                  value={business.googleMapLink}
                  onChange={handleInputChange}
                  placeholder="Google Maps URL"
                />
              ) : business.googleMapLink ? (
                <a
                  href={business.googleMapLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  {`Directions to ${business.businessName}`}
                </a>
              ) : (
                <div>-</div>
              )}
            </Col>

            <Col md={6}>
              <label>
                Contact (Owner){" "}
                 {currentUserId === business.ownedBy&&getVerificationStatus(business.numberVerified, "phone", () =>
                  handleOpenVerify("phone", business.ownerContact)
                )}
              </label>
              {editMode ? (
                <input
                  className="form-control"
                  name="ownerContact"
                  value={business.ownerContact}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{business.ownerContact || "-"}</div>
              )}
            </Col>

            <Col md={6}>
              <label>Contact (Office)</label>
              {editMode ? (
                <input
                  className="form-control"
                  name="officeContact"
                  value={business.officeContact}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{business.officeContact || "-"}</div>
              )}
            </Col>

            <Col md={6}>
              <label>GST Number</label>
              {editMode ? (
                <input
                  className="form-control"
                  name="gstnumber"
                  value={business.gstnumber}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{business.gstnumber || "-"}</div>
              )}
            </Col>
          </Row>
        </Col>
      </Row>

      {editMode && (
        <div className="text-end">
          <Button variant="primary" onClick={handleSubmit}>
            Update
          </Button>
        </div>
      )}

      {/* ✅ Verification Modal */}
      <VerificationModal
        show={showVerifyModal}
        onHide={() => setShowVerifyModal(false)}
        type={verifyType}
        value={verifyValue}
        onVerify={handleVerificationSuccess}
      />
    </Container>
  );
};

export default BusinessProfile;

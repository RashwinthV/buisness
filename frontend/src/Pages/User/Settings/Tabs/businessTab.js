import { useEffect, useState } from "react";
import {  Spinner, Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { useBusiness } from "../../../../context/BussinessContext";
import Image_default from "../../../../Assets/Images/Default.png"; // Update to your default image path
import { useUser } from "../../../../context/userContext";

const BusinessTab = ({ businessId }) => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const { baseUrl, token, user } = useUser();
  const { businesses, selectedBusinessId, settingsBusiness } = useBusiness();

  const selectedBusiness = businesses.find(
    (b) => b.businessId === selectedBusinessId
  );

  const activeBusinesses = settingsBusiness?.active || [];
  const inactiveBusinesses = settingsBusiness?.inactive || [];

  // const statusOptions = ["active", "inactive"];

  useEffect(() => {
    if (selectedBusiness) {
      setStatus(selectedBusiness.status || "");
    }
  }, [selectedBusiness]);

  const handleStatusChange = async (newStatus, businessIdOverride = null) => {
    const targetBusinessId = businessIdOverride || businessId;
    setLoading(true);

    try {
      const res = await fetch(
        `${baseUrl}/v2/bussiness/${user?.id}/status/${targetBusinessId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const result = await res.json();

      if (res.ok) {
        toast.success(`Business status updated to ${newStatus}`);
        window.location.reload();
      } else {
        toast.error(result?.message || "Status update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while updating status");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (file) => {
    // implement logo upload logic
    toast.info("Image upload logic not implemented.");
  };

  return (
    <>
      <div className="container">
        <h4 className="mt-3 text-primary">Active Businesses</h4>
        <div className="row">
          {activeBusinesses.map((business) => (
            <div className="col-12 col-md-6 col-lg-4" key={business._id}>
              <BusinessCard
                business={business}
                editLogo={business.businessId === selectedBusinessId}
                handleImageUpload={handleImageUpload}
                loading={loading}
                onStatusChange={handleStatusChange}
              />
            </div>
          ))}
        </div>
        <h4 className="mt-4 text-primary">Inactive Businesses</h4>

        {inactiveBusinesses.length > 0 ? (
          <>
            <div className="row">
              {inactiveBusinesses.map((business) => (
                <div className="col-12 col-md-6 col-lg-4" key={business._id}>
                  <BusinessCard
                    business={business}
                    isInactive
                    editLogo={business.businessId === selectedBusinessId}
                    handleImageUpload={handleImageUpload}
                    loading={loading}
                    onStatusChange={handleStatusChange}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <h6>
            If your business not found here please contact us through our E-mail
          </h6>
        )}
      </div>

      {loading && <Spinner animation="border" size="sm" className="mt-2" />}
    </>
  );
};

// Reusable Banner/Card Component
const BusinessCard = ({
  business,
  isInactive = false,
  editLogo = false,
  handleImageUpload,
  onStatusChange,
  loading,
}) => {
  return (
    <div
      className="position-relative text-white rounded mb-4"
      style={{
        backgroundImage: `url(${
          business?.backgroundImageUrl ||
          business?.logo?.imageUrl ||
          Image_default
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "230px",
        overflow: "hidden",
      }}
    >
      {/* Blur Overlay */}
      <div
        style={{
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          zIndex: 1,
        }}
      />

      <Row
        className="align-items-center justify-content-between position-relative"
        style={{ zIndex: 2, padding: "1.5rem" }}
      >
        <Col xs={12} md={12}>
          <h4 className="fw-bold mb-2">{business.businessName || "-"}</h4>
          <p className="">
            <i className="bi bi-envelope-fill me-1" />
            {business.businessEmail || "N/A"}
          </p>
          <div className="d-flex justify-content-center align-items-center">
            {business.googleMapLink && (
              <a
                href={business.googleMapLink}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-light btn-sm mt-2 mb-0"
              >
                <i className="bi bi-geo-alt-fill me-1 mb-0" />
                View on Map
              </a>
            )}

            {/* Show "Activate" button if business is inactive */}
            {isInactive && (
              <Button
                variant="success"
                size="sm"
                className="mt-2 mx-2"
                onClick={() => onStatusChange("active", business._id)}
                disabled={loading}
              >
                {loading ? "Activating..." : "Activate Business"}
              </Button>
            )}
          </div>
        </Col>

        <Col xs={12} md={8} className="text-md-end text-center mt-3 mt-md-3">
          <div
            className="d-inline-flex justify-content-center align-items-center bg-white rounded-circle position-relative shadow"
            style={{
              width: "130px",
              height: "130px",
              overflow: "hidden",
            }}
          >
            {editLogo ? (
              <>
                <input
                  type="file"
                  accept="image/*"
                  id={`logoUpload-${business._id}`}
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) handleImageUpload(file);
                  }}
                />
                <label
                  htmlFor={`logoUpload-${business._id}`}
                  style={{ cursor: "pointer", width: "100%", height: "100%" }}
                >
                  <img
                    src={business?.logo?.imageUrl || Image_default}
                    alt="Business Logo"
                    className="w-100 h-100"
                    style={{ objectFit: "cover", borderRadius: "50%" }}
                  />
                </label>
                <FaEdit
                  className="position-absolute bg-secondary text-white"
                  style={{
                    top: "6px",
                    right: "4px",
                    fontSize: "20px",
                    padding: "6px",
                    borderRadius: "50%",
                    border: "1px solid white",
                    zIndex: 1,
                  }}
                />
              </>
            ) : (
              <img
                src={business?.logo?.imageUrl || Image_default}
                alt="Business Logo"
                className="w-100 h-100"
                style={{ objectFit: "contain", borderRadius: "50%" }}
              />
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BusinessTab;

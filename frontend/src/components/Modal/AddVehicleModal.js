import { useState } from "react";
import { toast } from "react-toastify";
import { Modal, Button, Spinner } from "react-bootstrap";
import Image_default from "../../Assets/Images/Default.png";
import moment from "moment";
import { VechileImageUpload } from "../../Utils/BussinessImageUploader";
import { useUser } from "../../context/userContext";
import { useBusiness } from "../../context/BussinessContext";
import { useParams } from "react-router-dom";

const AddVehicleModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    image: { imageUrl: "", publicId: "" },
    name: "",
    model: "",
    brand: "",
    registrationNumber: "",
    registeredOwnerName: "",
    rtoDetails: "",
    registrationDate: "",
    ownership: "",
    insuranceValidTill: moment().format("YYYY-MM-DD"),
    fcValidTill: moment().format("YYYY-MM-DD"),
  });
  const { user, token } = useUser();
  const { businesses } = useBusiness();
  const { businessId } = useParams();
  const SelectedBusiness = businesses.find(
    (b) => String(b.businessId) === businessId
  );
  const selectedBusinessId = SelectedBusiness?._id;
  const userId = user?.id;
  const baseUrl = process.env.REACT_APP_BACKEND_URI;

  const [imageUploading, setImageUploading] = useState(false);

  const { handleImageUpload } = VechileImageUpload({
    userId,
    token,
    publicId: formData.image.publicId,
    setImageData: (img) =>
      setFormData((prev) => ({
        ...prev,
        image: img, // ✅ imageUrl and publicId directly
      })),
    baseUrl,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      if (!file) return;

      setImageUploading(true);
      handleImageUpload(file)
        .catch(() => toast.error("Image upload failed"))
        .finally(() => setImageUploading(false));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
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

    try {
      const response = await fetch(
        `${baseUrl}/v2/bussiness/vechile/${userId}/registervechile/${selectedBusinessId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...formData, businessId: selectedBusinessId }),
        }
      );
if (!response.ok) {
  const errorData = await response.json();
  toast.error(errorData.message || "Vehicle registration failed");
  return;
}

      toast.success("Vehicle registered successfully!");
      handleClose();
    } catch (err) {
      toast.error(err.message || "Error occurred");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Register New Vehicle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center mb-3">
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
              src={formData.image?.imageUrl || Image_default}
              alt="Vehicle"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/120?text=Vehicle")
              }
            />
          </div>
          {imageUploading && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(255,255,255,0.7)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spinner animation="border" variant="primary" size="md" />
            </div>
          )}
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
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Register Vehicle
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddVehicleModal;

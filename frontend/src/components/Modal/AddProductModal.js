import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Image_default from "../../Assets/Images/Default.png";
import { useProductImageUpload } from "../../Utils/Image/ImageUploader";
import { useUser } from "../../context/userContext";
import { useBusiness } from "../../context/BussinessContext";
import { FaEdit } from "react-icons/fa";

const AddProductModal = ({ show, handleClose }) => {
  const baseUrl = process.env.REACT_APP_BACKEND_URI;
  const { user, token } = useUser();
  const userId = user?.id;

  const { businesses, selectedBusinessId } = useBusiness();
  const businessId = selectedBusinessId;
  const selectedbusiness = businesses.find(
    (b) => String(b.businessId) === String(businessId)
  );

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    rate: "",
    type: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [imageData, setImageData] = useState({
    imageUrl: "",
    publicId: "",
  });

  const { handleImageUpload } = useProductImageUpload({
    userId,
    token,
    publicId: imageData.publicId,
    bussinessId: selectedbusiness?._id,
    setImageData,
    baseUrl,
  });

  const handleChange = async (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      if (file) {
        setImagePreview(URL.createObjectURL(file));
        await handleImageUpload(file);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    const requiredFields = ["name", "description", "type"];
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.warning(`Please fill the ${field} field.`);
        return;
      }
    }

    if (!imageData.imageUrl || !imageData.publicId) {
      toast.warning("Please upload a product image.");
      return;
    }

    const payload = {
      productName: formData.name,
      description: formData.description,
      productType: formData.type,
      rate: formData.rate || 0,
      imageUrl: imageData.imageUrl,
      public_id: imageData.publicId,
    };

    try {
      const res = await fetch(
        `${baseUrl}/v2/bussiness/product/${userId}/registerProduct/${selectedbusiness._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();

      if (res.ok) {
        toast.success("Product added successfully!");
        handleClose();
        setTimeout(() => window.location.reload(), 1500);
      } else {
        toast.error(result.message || "Failed to add product.");
      }
    } catch (err) {
      toast.error("Server error. Try again later.");
      console.error(err);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Add New Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center mb-4" style={{ position: "relative" }}>
          {/* Image Container */}
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "20%",
              overflow: "hidden",
              margin: "0 auto",
              border: "5px solid #ccc",
              position: "relative",
              cursor: "pointer",
            }}
            onClick={() => window.imageUploadInput?.click()}
          >
            {/* Preview Image */}
            <img
              src={
                imagePreview ||
                (typeof formData?.image?.imageUrl === "string"
                  ? formData.image.imageUrl
                  : Image_default)
              }
              alt="Product"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
              onError={(e) => (e.target.src = Image_default)}
            />

            {/* Hidden File Input */}
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImagePreview(URL.createObjectURL(file)); // update preview
                  handleImageUpload(file); // pass actual file object
                }
              }}
              style={{ display: "none" }}
              ref={(ref) => (window.imageUploadInput = ref)}
            />
          </div>

          {/* FaEdit Icon Positioned Overlapping the Bottom-Right */}
          <div
            onClick={() => window.imageUploadInput?.click()}
            style={{
              position: "absolute",
              bottom: "100px",
              left: "51%",
              transform: "translateX(30px)",
              backgroundColor: "#ccc",
              borderRadius: "50%",
              padding: "6px",
              border: "1px solid #ccc",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              zIndex: 10,
            }}
          >
            <FaEdit style={{ color: "#333", fontSize: "14px" }} />
          </div>
        </div>

        <h6 className="text-danger">Product Information</h6>
        <div className="row gy-3">
          <div className="col-md-6">
            <label>Product Name *</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label>Product Type *</label>
            <select
              className="form-select"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="">Choose</option>
              <option value="raw_material">Raw Material</option>
              <option value="finished_product">Finished Product</option>
            </select>
          </div>

          <div className="col-md-6">
            <label>Rate (Optional)</label>
            <input
              type="number"
              name="rate"
              className="form-control"
              value={formData.rate}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-12">
            <label>Description *</label>
            <textarea
              name="description"
              className="form-control"
              rows={3}
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Add Product
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProductModal;

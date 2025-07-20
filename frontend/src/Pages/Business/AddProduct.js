import { useState } from "react";
import { toast } from "react-toastify";
import Image_default from "../../Assets/Images/Default.png";
import { useProductImageUpload } from "../../Utils/BussinessImageUploader"; // adjust path as needed
import { useUser } from "../../context/userContext";
import { useBusiness } from "../../context/BussinessContext";

const AddProduct = () => {
  const baseUrl = process.env.REACT_APP_BACKEND_URI;

  // TODO: Replace with actual user data from auth
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
    bussinessId: businessId,
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
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error(result.message || "Failed to add product.");
      }
    } catch (err) {
      toast.error("Server error. Try again later.");
      console.error(err);
    }
  };

  return (
    <div className="container py-2">
      <h4 className="mb-2 text-center">Add New Product</h4>

      {/* Image Upload & Preview */}
      <div className="row mb-4 justify-content-center">
        <div className="col-12 text-center mb-3">
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "12px",
              overflow: "hidden",
              margin: "0 auto",
              border: "2px solid #ddd",
            }}
          >
            <img
              src={imagePreview || Image_default}
              alt="Product"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => (e.target.src = Image_default)}
            />
          </div>

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
            rows={4}
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
      </div>

      <div className="text-end mt-4">
        <button className="btn btn-success" onClick={handleSubmit}>
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;

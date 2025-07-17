
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Image_default from "../../Assets/Images/Default.png"; // Replace with your default image path

const AddProduct = () => {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BACKEND_URI;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    rate: "",
    type: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
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

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      const res = await fetch(`${baseUrl}/v1/products/add`, {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      if (res.ok) {
        toast.success("Product added successfully!");
        navigate("/products");
      } else {
        toast.error(result.message || "Failed to add product.");
      }
    } catch (err) {
      toast.error("Server error. Try again later.");
    }
  };

  return (
    <div className="container py-4">
      <h4 className="mb-4 text-center">Add New Product</h4>

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
              src={
                formData.image
                  ? URL.createObjectURL(formData.image)
                  : Image_default
              }
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

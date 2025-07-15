import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddProduct() {
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
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.type) {
      toast.warning("Please fill all required fields.");
      return;
    }

    const productData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) productData.append(key, value);
    });

    try {
      const res = await fetch(`${baseUrl}/v1/products/add`, {
        method: "POST",
        body: productData,
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Product added successfully!");
        navigate("/products");
      } else {
        toast.error(result.message || "Failed to add product.");
      }
    } catch (err) {
      console.error("Error adding product:", err);
      toast.error("Server error. Try again later.");
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="text-center mb-4">Add Product</h4>

              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                  <label className="form-label">
                    Product Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Description <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Rate (Optional)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="rate"
                      value={formData.rate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3 col-md-6">
                    <label className="form-label">
                      Product Type <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Choose</option>
                      <option value="raw_material">Your Product </option>
                      <option value="finished_product">Raw Material</option>
                    </select>
                  </div>


                </div>
                  <div className="mb-3">
                    <label className="form-label">Image (Optional)</label>
                    <input
                      type="file"
                      className="form-control"
                      name="image"
                      accept="image/*"
                      onChange={handleChange}
                    />
                  </div>
                <button
                  type="submit"
                  onClick={() => navigate("/products")}
                  className="btn btn-success w-100"
                >
                  Add Product
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;

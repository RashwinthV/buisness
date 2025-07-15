import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddTrader() {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BACKEND_URI;

  const [formData, setFormData] = useState({
    name: "",
    traderType: "",
    product: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    district: "",
    pincode: "",
    contact: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.traderType || !formData.product || !formData.addressLine1 || !formData.city || !formData.district || !formData.pincode || !formData.contact) {
      toast.warning("Please fill all required fields.");
      return;
    }

    const traderData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) traderData.append(key, value);
    });

    try {
      const res = await fetch(`${baseUrl}/v1/traders/add`, {
        method: "POST",
        body: traderData,
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Trader added successfully!");
        navigate("/traders");
      } else {
        toast.error(result.message || "Failed to add trader.");
      }
    } catch (err) {
      console.error("Error adding trader:", err);
      toast.error("Server error. Try again later.");
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="text-center mb-4">Add Trader</h4>

              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                  <label className="form-label">Name <span className="text-danger">*</span></label>
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
                  <label className="form-label">Trader Type <span className="text-danger">*</span></label>
                  <select
                    className="form-select"
                    name="traderType"
                    value={formData.traderType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose</option>
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Product <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Address Line 1 <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Address Line 2</label>
                  <input
                    type="text"
                    className="form-control"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleChange}
                  />
                </div>

                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">City <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">District <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Pincode <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Contact Number <span className="text-danger">*</span></label>
                    <input
                      type="tel"
                      className="form-control"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      required
                    />
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

                <button type="submit" className="btn btn-success w-100">
                  Add Trader
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTrader;

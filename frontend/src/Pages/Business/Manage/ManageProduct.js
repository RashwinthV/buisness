import { useEffect, useState } from "react";
import Image_default from "../../../Assets/Images/Default.png";
import { useProduct } from "../../../context/ProductContext";
import AddProductModal from "../../../components/Modal/AddProductModal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import UniversalEditModal from "../../../components/Modal/UniversalEditModal";

const ManageProduct = () => {
  const { product } = useProduct();
  const [productList, setProductList] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { businessId } = useParams();

  useEffect(() => {
    if (product && Array.isArray(product)) {
      setProductList(product);
    }
  }, [product]);

  const openAddModal = () => {
    navigate(`/managebusiness/${businessId}/manageproducts/Add_Product`, {
      state: { backgroundLocation: location },
    });
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleEdit = (product) => {
    setEditData({
      ...product,
      imagePreview: product?.image?.imageUrl || Image_default,
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    const updatedList = productList.map((item) =>
      item.productId === editData.productId ? editData : item
    );
    setProductList(updatedList);
    setShowEditModal(false);
  };

  const handleDelete = (product) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${product.productName}"?`
      )
    ) {
      const updatedList = productList.filter(
        (item) => item.productId !== product.productId
      );
      setProductList(updatedList);
    }
  };
  return (
    <div className="container py-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold">Manage Products</h4>
        <button
          className="btn btn-success"
          onClick={openAddModal}
        >
          <i className="bi bi-plus-circle me-2"></i> Add Product
        </button>
      </div>

      {productList.length === 0 ? (
        <p className="text-center text-muted">No products found.</p>
      ) : (
        <div className="row g-4">
          {productList.map((prod, index) => (
            <div className="col-md-6 col-lg-4" key={index}>
              <div
                className="card border-0 shadow-sm h-100 position-relative product-card hover-shadow rounded-4"
                style={{ backgroundColor: "#51ff0021" }}
              >
                <div className="position-absolute top-0 end-0 m-2 d-flex gap-2">
                  <button
                    className="btn btn-light btn-sm shadow-sm rounded-circle"
                    title="Edit"
                    onClick={() => handleEdit(prod)}
                  >
                    <i className="bi bi-pencil-fill text-primary"></i>
                  </button>
                  <button
                    className="btn btn-light btn-sm shadow-sm rounded-circle"
                    title="Delete"
                    onClick={() => handleDelete(prod)}
                  >
                    <i className="bi bi-trash-fill text-danger"></i>
                  </button>
                </div>
                <div className="card-body d-flex flex-column align-items-center text-center">
                  <img
                    src={prod?.image?.imageUrl || Image_default}
                    alt={prod?.productName || "Product"}
                    className="mb-3"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "15px",
                      border: "2px solid #eee",
                    }}
                  />

                  <h5 className="fw-semibold mb-1 text-dark">
                    {prod?.productName}
                  </h5>
                  <p className="mb-1">
                    <span className="badge bg-info-subtle text-dark">
                      {prod?.productType === "raw_material"
                        ? "Raw Material"
                        : "Finished Product"}
                    </span>
                  </p>
                  <p className="small text-muted mb-2">
                    ID: <span className="text-dark">{prod?.productId}</span>
                  </p>

                  <div className="w-100 border-top pt-2">
                    <p className="mb-0">
                      <strong>Rate:</strong>{" "}
                      <span className="text-success fw-medium">
                        {prod?.rate !== null ? `₹${prod.rate}` : "N/A"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Product Modal */}
      <AddProductModal
        show={showProductModal}
        handleClose={() => setShowProductModal(false)}
      />

      <UniversalEditModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        handleSave={handleSaveEdit}
        formData={editData || {}}
        setFormData={setEditData}
        title="Edit Product"
        fields={[
          { label: "Product Name", name: "productName" },
          { label: "Product ID", name: "productId", type: "text" },
          { label: "Rate", name: "rate", type: "number" },
          {
            label: "Product Type",
            name: "productType",
            type: "text", // or use a dropdown if needed
          },
        ]}
        includeImage={true}
      />
    </div>
  );
};

export default ManageProduct;

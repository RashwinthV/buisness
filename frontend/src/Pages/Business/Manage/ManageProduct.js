import  { useEffect, useState } from "react";
import Image_default from "../../../Assets/Images/Default.png";
import { useProduct } from "../../../context/ProductContext";
import AddProductModal from "../../../components/Modal/AddProductModal";

const ManageProduct = () => {
  const { product } = useProduct();
  const [productList, setProductList] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);

  useEffect(() => {
    if (product && Array.isArray(product)) {
      setProductList(product);
    }
  }, [product]);

  return (
    <div className="container py-2">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Your Products</h4>
        <button
          className="btn btn-success"
          onClick={() => setShowProductModal(true)}
        >
          <i className="bi bi-plus-circle me-1"></i> Add Product
        </button>
      </div>
      {productList.length === 0 ? (
        <p className="text-center">No products found.</p>
      ) : (
        <div className="row g-4">
          
          {productList.map((prod, index) => (
            <div className="col-md-4" key={index}>
              <div className="card h-100 shadow-sm">
                                  <button
                    className="btn btn-sm btn-outline-primary position-absolute top-0 end-0 m-2"

                  >
                    <i className="bi bi-pencil-square me-1"></i>
                  </button>
                <div className="card-body text-center">
                  
                  <img
                    src={prod?.image?.imageUrl || Image_default}
                    alt={prod?.productName || "Product"}
                    className="mb-3"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                  <h5 className="card-title">{prod?.productName}</h5>
                  <p className="card-text">
                    <strong>ID:</strong> {prod?.productId} <br />
                    <strong>Type:</strong>{" "}
                    {prod?.productType === "raw_material"
                      ? "Raw Material"
                      : "Finished Product"}
                    <br />
                    <strong>Rate:</strong>{" "}
                    {prod?.rate !== null ? `₹${prod.rate}` : "N/A"}
                  </p>


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
    </div>
  );
};

export default ManageProduct;

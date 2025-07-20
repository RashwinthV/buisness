import React, { useEffect, useState } from "react";
import Image_default from "../../../Assets/Images/Default.png";
import { useProduct } from "../../../context/ProductContext";

const Product = () => {
  const { product } = useProduct();
  const [productList, setProductList] = useState([]); // ✅ default to empty array

  useEffect(() => {
    if (product && Array.isArray(product)) {
      setProductList(product);
    }
  }, [product]);

  return (
    <div className="container py-2">
      <h4 className="mb-4 text-center">Products</h4>

      {productList.length === 0 ? (
        <p className="text-center">No products found.</p>
      ) : (
        <div className="row g-4">
          {productList.map((prod, index) => (
            <div className="col-md-4" key={index}>
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <img
                    src={prod?.image?.imageUrl || Image_default} // ✅ corrected
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
    </div>
  );
};

export default Product;

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
    <div className="container">
      <h4 className="mb-2 text-center">Products</h4>

<hr></hr>
      
      {productList.length === 0 ? (
        <p className="text-center">No products found.</p>
      ) : (
       <div className="row mt-2 g-4">
  {productList.map((prod, index) => (
    <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3" key={index}>
      <div className="card h-100 shadow-sm border-2 rounded-4 text-center p-3">
        <img
          src={prod?.image?.imageUrl || Image_default}
          alt={prod?.productName || "Product"}
          className="img-fluid rounded-4 mb-3"
          style={{ height: "150px", objectFit: "contain", width: "100%" }}
        />

        <hr />

        <h6 className="fw-bold mb-2">{prod?.productName}</h6>

        <h6 className="text-success fw-semibold mb-2">
          ₹{prod?.rate !== null ? prod.rate : "N/A"}
        </h6>

        <div className="d-flex justify-content-center gap-2 mb-3">
          <span className="badge bg-warning text-dark">
            {prod?.productType}
          </span>
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

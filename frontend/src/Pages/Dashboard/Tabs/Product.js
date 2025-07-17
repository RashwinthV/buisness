import React from "react";
import Image_default from "../../../Assets/Images/Default.png"; // Replace with your actual image path

const Product = () => {
  const productList = [
    {
      id: "PROD001",
      name: "Steel Rod",
      type: "raw_material",
      rate: 120,
      image: Image_default,
    },
    {
      id: "PROD002",
      name: "Wooden Chair",
      type: "finished_product",
      rate: null,
      image: Image_default,
    },
    {
      id: "PROD003",
      name: "Plastic Granules",
      type: "raw_material",
      rate: 85,
      image: Image_default,
    },
  ];

  return (
    <div className="container py-2">
      <h4 className="mb-4 text-center">Products</h4>
      <div className="row g-4">
        {productList.map((prod, index) => (
          <div className="col-md-4" key={index}>
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <img
                  src={prod.image || Image_default}
                  alt={prod.name}
                  className="mb-3"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
                <h5 className="card-title">{prod.name}</h5>
                <p className="card-text">
                  <strong>ID:</strong> {prod.id} <br />
                  <strong>Type:</strong>{" "}
                  {prod.type === "raw_material" ? "Raw Material" : "Finished Product"} <br />
                  <strong>Rate:</strong> {prod.rate !== null ? `₹${prod.rate}` : "N/A"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;

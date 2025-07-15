import React from "react";
import { useNavigate } from "react-router-dom"
const BusinessDashboard = () => {
     const navigate = useNavigate();
  return (
    <div className="container-fluid py-5">
      <div className="row ">
        <div className="col-12 col-md-8 col-lg-6  ">
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            <button
              className="btn btn-primary mb-3"
              onClick={() => navigate("/addproduct")}
            >
              Add Product
            </button>

            <button
              className="btn btn-primary mb-3"
              onClick={() => navigate("/addemployee")}
            >
              Add Employee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;

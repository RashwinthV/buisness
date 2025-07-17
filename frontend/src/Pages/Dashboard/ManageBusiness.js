import { useState } from "react";
import AddProduct from "../Business/AddProduct";
import AddEmployee from "../Business/AddEmployee";
import AddTradeParty from "../Business/AddTradeParty";
import { useBusiness } from "../../context/BussinessContext";
import BusinessProfile from "../Business/BusinessProfile";
import Image_default from "../../Assets/Images/Default.png";
import AddVehicle from "../Business/AddVehicle";
const ManageBusiness = () => {
  const [selectedForm, setSelectedForm] = useState(null); // form type: 'product', 'employee', etc.
  const { selectedBusinessId, businesses } = useBusiness();
  const selectedBusiness = businesses?.find(
    (b) => b.businessId === selectedBusinessId
  );
  return (

    <div className="container-fluid py-2">
      {/* Business Info Card */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <div className="text-center mb-4">
            <img
              src={
                selectedBusiness?.bussinessLogo ||
                selectedBusiness?.logo.imageUrl ||
                Image_default
              }
              alt="Business Logo"
              className="mb-2 img-fluid"
              style={{
                maxHeight: "100px",
                objectFit: "contain",
              }}
            />
            <h3 className="fw-bold text-primary mb-0">
              {selectedBusiness?.name}
            </h3>
            <small className="text-muted">
              Manage business operations from the panel below
            </small>
          </div>

          {/* Action Buttons */}
          <div className="row justify-content-center g-3">
            <div className="col-12 col-sm-6 col-md-3 col-lg-2">
              <button
                className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center"
                onClick={() => setSelectedForm("businessedit")}
              >
                <i className="bi bi-pencil-square me-2"></i> Edit Business
              </button>
            </div>
            <div className="col-12 col-sm-6 col-md-3 col-lg-2">
              <button
                className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center"
                onClick={() => setSelectedForm("product")}
              >
                <i className="bi bi-plus-circle-fill me-2"></i> Add Product
              </button>
            </div>

            <div className="col-12 col-sm-6 col-md-3 col-lg-2">
              <button
                className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center"
                onClick={() => setSelectedForm("employee")}
              >
                <i className="bi bi-person-add me-2"></i> Add Employee
              </button>
            </div>

            <div className="col-12 col-sm-6 col-md-3 col-lg-2">
              <button
                className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center"
                onClick={() => setSelectedForm("vehicle")}
              >
                <i className="bi bi-truck me-2"></i> Add Vehicle
              </button>
            </div>

            <div className="col-12 col-sm-6 col-md-3 col-lg-2">
              <button
                className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center"
                onClick={() => setSelectedForm("trader")}
              >
                <i className="bi bi-tags-fill me-2"></i> Add Trade Party
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="row justify-content-center mt-4">
        {selectedForm === "businessedit" && <BusinessProfile />}

        {selectedForm === "product" && <AddProduct />}
        {selectedForm === "employee" && <AddEmployee />}
        {selectedForm === "vehicle" && <AddVehicle />}

        {selectedForm === "trader" && <AddTradeParty />}
      </div>
    </div>
  );
};

export default ManageBusiness;

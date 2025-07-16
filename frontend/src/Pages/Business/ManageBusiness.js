import { useState } from "react";
import AddProduct from "./AddProduct";
import AddEmployee from "./AddEmployee";
import AddTradeParty from "./AddTradeParty";


const ManageBusiness = () => {
  const [selectedForm, setSelectedForm] = useState(null); // form type: 'product', 'employee', etc.

  return (
    <div className="container-fluid py-2">
      {/* Buttons Section */}
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="row gy-2 justify-content-center">
            <div className="col-auto">
              <button
                className="btn btn-primary w-100"
                onClick={() => setSelectedForm("product")}
              >
                <i className="bi bi-plus-circle-fill fs-6 me-2"></i> Add Product
              </button>
            </div>
            <div className="col-auto">
              <button
                className="btn btn-primary w-100"
                onClick={() => setSelectedForm("employee")}
              >
                <i className="bi bi-person-add fs-6 me-2"></i> Add Employee
              </button>
            </div>
           
            <div className="col-auto">
              <button
                className="btn btn-primary w-100"
                onClick={() => setSelectedForm("trader")}
              >
                <i className="bi bi-tags-fill fs-6 me-2"></i> Add Trade Party
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section - Render based on button clicked */}
      <div className="row justify-content-center mt-4">

          {selectedForm === "product" && <AddProduct />}
          {selectedForm === "employee" && <AddEmployee />}
          {selectedForm === "trader" && <AddTradeParty />}
        </div>
      </div>

  );
};

export default ManageBusiness;

import { useState } from "react";
import AddProduct from "./AddProduct";
import AddEmployee from "./AddEmployee";
import AddTradeParty from "./AddTradeParty";
import { useBusiness } from "../../context/BussinessContext";

const ManageBusiness = () => {
  const [selectedForm, setSelectedForm] = useState(null); // form type: 'product', 'employee', etc.
  const { selectedBusinessId, businesses } = useBusiness();
  const selectedBusiness = businesses?.find((b) => b.id === selectedBusinessId);
  return (
    // <div className="container-fluid py-2">
    //   {/* Buttons Section */}
    //   <div className="row justify-content-center">

    //     <h3 className="text-center mb-5">
    //       <strong>{selectedBusiness?.name} </strong>
    //     </h3>
    //     <div className="col-12">

    //       <div className="row gy-2 justify-content-center">
    //         <div className="col-auto">
    //           <button
    //             className="btn btn-primary w-100"
    //             onClick={() => setSelectedForm("product")}
    //           >
    //             <i className="bi bi-plus-circle-fill fs-6 me-2"></i> Add Product
    //           </button>
    //         </div>
    //         <div className="col-auto">
    //           <button
    //             className="btn btn-primary w-100"
    //             onClick={() => setSelectedForm("employee")}
    //           >
    //             <i className="bi bi-person-add fs-6 me-2"></i> Add Employee
    //           </button>
    //         </div>

    //         <div className="col-auto">
    //           <button
    //             className="btn btn-primary w-100"
    //             onClick={() => setSelectedForm("trader")}
    //           >
    //             <i className="bi bi-tags-fill fs-6 me-2"></i> Add Trade Party
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Form Section - Render based on button clicked */}
    //   <div className="row justify-content-center mt-4">
    //     {selectedForm === "product" && <AddProduct />}
    //     {selectedForm === "employee" && <AddEmployee />}
    //     {selectedForm === "trader" && <AddTradeParty />}
    //   </div>
    // </div>
    <div className="container my-4">
      {/* Business Info Card */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <div className="text-center mb-4">
            <h3 className="fw-bold text-primary mb-0">
              {selectedBusiness?.name}
            </h3>
            <small className="text-muted">
              Manage business operations from the panel below
            </small>
          </div>

          {/* Action Buttons */}
          <div className="row justify-content-center g-3">
            <div className="col-12 col-sm-6 col-md-4 col-lg-3">
              <button
                className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center"
                onClick={() => setSelectedForm("businessedit")}
              >
                <i class="bi bi-pencil-square"></i> Edit Business
              </button>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-3">
              <button
                className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center"
                onClick={() => setSelectedForm("product")}
              >
                <i className="bi bi-plus-circle-fill me-2"></i> Add Product
              </button>
            </div>

            <div className="col-12 col-sm-6 col-md-4 col-lg-3">
              <button
                className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center"
                onClick={() => setSelectedForm("employee")}
              >
                <i className="bi bi-person-add me-2"></i> Add Employee
              </button>
            </div>

            <div className="col-12 col-sm-6 col-md-4 col-lg-3">
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
        {/* {selectedForm === "businessedit" && <AddBusiness />} */}

        {selectedForm === "product" && <AddProduct />}
        {selectedForm === "employee" && <AddEmployee />}
        {selectedForm === "trader" && <AddTradeParty />}
      </div>
    </div>
  );
};

export default ManageBusiness;

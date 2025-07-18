// import { useState } from "react";
// import AddProduct from "../Business/AddProduct";
// import AddEmployee from "../Business/AddEmployee";
// import AddTradeParty from "../Business/AddTradeParty";
// import { useBusiness } from "../../context/BussinessContext";
// import BusinessProfile from "../Business/BusinessProfile";
// import Image_default from "../../Assets/Images/Default.png";
// import AddVehicle from "../Business/AddVehicle";
// const ManageBusiness = () => {
//   const [selectedForm, setSelectedForm] = useState("businessedit"); // default is business profile
//   const { selectedBusinessId, businesses } = useBusiness();

//   const selectedBusiness = businesses?.find(
//     (b) => b.businessId === selectedBusinessId
//   );
//   const tabs = [
//     { key: "businessedit", label: "Edit Business", icon: "bi-pencil-square" },
//     { key: "product", label: "Add Product", icon: "bi-plus-circle-fill" },
//     { key: "employee", label: "Add Employee", icon: "bi-person-add" },
//     { key: "vehicle", label: "Add Vehicle", icon: "bi-truck" },
//     { key: "trader", label: "Add Trade Party", icon: "bi-tags-fill" },
//   ];

//   return (

//     <div className="container-fluid py-2">
//       {/* Business Info Card */}
//       <div className="card shadow-sm border-0 mb-4">
//         <div className="card-body">
//           <div className="text-center mb-4">
//             <img
//               src={
//                 selectedBusiness?.logo.imageUrl ||
//                 Image_default
//               }
//               alt="Business Logo"
//               className="mb-2 img-fluid"
//               style={{
//                 maxHeight: "80px",
//                 objectFit: "contain",
//               }}
//             />
//             <h4 className="fw-bold text-primary mb-0">
//               {selectedBusiness?.businessName}
//             </h4>
//             <small className="text-muted">
//               Manage business operations from the panel below
//             </small>
//           </div>

//           {/* Action Buttons */}
//           {/* <div className="row justify-content-center g-3">
//             <div className="col-12 col-sm-6 col-md-3 col-lg-2">
//               <button
//                 className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center"
//                 onClick={() => setSelectedForm("businessedit")}
//               >
//                 <i className="bi bi-pencil-square me-2"></i> Edit Business
//               </button>
//             </div>
//             <div className="col-12 col-sm-6 col-md-3 col-lg-2">
//               <button
//                 className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center"
//                 onClick={() => setSelectedForm("product")}
//               >
//                 <i className="bi bi-plus-circle-fill me-2"></i> Add Product
//               </button>
//             </div>

//             <div className="col-12 col-sm-6 col-md-3 col-lg-2">
//               <button
//                 className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center"
//                 onClick={() => setSelectedForm("employee")}
//               >
//                 <i className="bi bi-person-add me-2"></i> Add Employee
//               </button>
//             </div>

//             <div className="col-12 col-sm-6 col-md-3 col-lg-2">
//               <button
//                 className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center"
//                 onClick={() => setSelectedForm("vehicle")}
//               >
//                 <i className="bi bi-truck me-2"></i> Add Vehicle
//               </button>
//             </div>

//             <div className="col-12 col-sm-6 col-md-3 col-lg-2">
//               <button
//                 className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center"
//                 onClick={() => setSelectedForm("trader")}
//               >
//                 <i className="bi bi-tags-fill me-2"></i> Add Trade Party
//               </button>
//             </div>
//           </div> */}
//         </div>
//       </div>
//           <div className="row  g-2">
//             {tabs.map((tab) => (
//               <div key={tab.key} className="d-flex flex-wrap gap-2 mb-3">
                
//                 <button
//                   className={`btn w-100 d-flex align-items-center justify-content-center ${
//                     selectedForm === tab.key
//                       ? "btn-primary"
//                       : "btn-outline-primary"
//                   }`}
//                   onClick={() => setSelectedForm(tab.key)}
//                 >
//                   <i className={`bi ${tab.icon} me-2`}></i> {tab.label}
//                 </button>
//               </div>
//             ))}
//           </div>
//       {/* Form Section */}
//       <div className="row justify-content-center mt-4">
//         {selectedForm === "businessedit" && <BusinessProfile />}

//         {selectedForm === "product" && <AddProduct />}
//         {selectedForm === "employee" && <AddEmployee />}
//         {selectedForm === "vehicle" && <AddVehicle />}

//         {selectedForm === "trader" && <AddTradeParty />}
//       </div>
//     </div>
//   );
// };

// export default ManageBusiness;
import { useState } from "react";
import AddProduct from "../Business/AddProduct";
import AddEmployee from "../Business/AddEmployee";
import AddTradeParty from "../Business/AddTradeParty";
import AddVehicle from "../Business/AddVehicle";
import BusinessProfile from "../Business/BusinessProfile";
import { useBusiness } from "../../context/BussinessContext";
import Image_default from "../../Assets/Images/Default.png";

const ManageBusiness = () => {
  const { selectedBusinessId, businesses } = useBusiness();
  const selectedBusiness = businesses?.find(
    (b) => b.businessId === selectedBusinessId
  );

  const [activeTab, setActiveTab] = useState("Edit Business");

  const tabs = [
    { label: "Edit Business", component: <BusinessProfile /> },
    { label: "Add Product", component: <AddProduct /> },
    { label: "Add Employee", component: <AddEmployee /> },
    { label: "Add Vehicle", component: <AddVehicle /> },
    { label: "Add Trade Party", component: <AddTradeParty /> },
  ];

  const renderTabContent = () => {
    const selected = tabs.find((tab) => tab.label === activeTab);
    return selected ? selected.component : null;
  };

  return (
    <div className="container-fluid py-2">
      {/* Business Info */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body text-center">
          <img
            src={selectedBusiness?.logo.imageUrl || Image_default}
            alt="Business Logo"
            className="mb-2 img-fluid"
            style={{ maxHeight: "80px", objectFit: "contain" }}
          />
          <h4 className="text-center mb-2 fw-bold text-primary">
            {selectedBusiness?.businessName}
          </h4>
          <small className="text-muted">
            Manage business operations using the tabs below
          </small>
        </div>
      </div>

      {/* Tab Buttons */}
      <div className="container mt-3">
        <div className="d-flex flex-wrap gap-2 mb-3 ">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              className={`btn ${
                activeTab === tab.label ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setActiveTab(tab.label)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Area */}
        <div className="container p-3 rounded shadow-sm bg-white">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default ManageBusiness;

import { useState } from "react";

import { useBusiness } from "../../context/BussinessContext";
import Image_default from "../../Assets/Images/Default.png";
import Analytics from "./Tabs/Analytics";
import Products from "./Tabs/Product";
import Employees from "./Tabs/Employee";
import Vehicles from "./Tabs/Vehicle";
import TradeParties from "./Tabs/TradeParty";
const BusinessDashboard = () => {
  const { selectedBusinessId, businesses } = useBusiness();
  const selectedBusiness = businesses?.find(
    (b) => b.businessId === selectedBusinessId
  );

  const [activeTab, setActiveTab] = useState("Analytics");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Analytics":
        return <Analytics />;
      case "Products":
        return <Products />;
      case "Employees":
        return <Employees />;
      case "Vehicles":
        return <Vehicles />;
      case "Trade Parties":
        return <TradeParties />;
      default:
        return null;
    }
  };

  const tabs = [
    "Analytics",
    "Products",
    "Employees",
    "Vehicles",
    "Trade Parties",
  ];

  return (
    <div className="container-fluid py-2">
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body text-center">
          <img
            src={selectedBusiness?.logo.imageUrl || Image_default}
            alt="Business Logo"
            className="mb-2 img-fluid"
            style={{
              maxHeight: "80px",
              objectFit: "contain",
            }}
          />
          <h4 className="text-center mb-3">
            <strong>{selectedBusiness?.businessName} </strong>
          </h4>
        </div>
      </div>

      <div className="container mt-4">
        <div className="d-flex flex-wrap gap-2 mb-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`btn ${
                activeTab === tab ? "btn-primary" : "btn-outline-primary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Shared content display div */}
        <div className="container p-3 rounded shadow-sm">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;

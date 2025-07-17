import React from "react";
import Image_default from "../../../Assets/Images/Default.png"; // Replace with actual path if different

const TradeParty = () => {
  const partyList = [
    {
      id: "TP001",
      name: "Kumar Agencies",
      type: "buyer",
      contact: "9876543210",
      city: "Coimbatore",
      image: Image_default,
    },
    {
      id: "TP002",
      name: "Sri Suppliers",
      type: "supplier",
      contact: "9444412345",
      city: "Chennai",
      image: Image_default,
    },
    {
      id: "TP003",
      name: "Elite Traders",
      type: "both",
      contact: "9003004005",
      city: "Madurai",
      image: Image_default,
    },
  ];

  // Optional: Capitalize party type
  const formatType = (type) => {
    if (type === "buyer") return "Buyer";
    if (type === "supplier") return "Supplier";
    return "Buyer & Supplier";
  };

  return (
    <div className="container py-2">
      <h4 className="mb-4 text-center">Trade Parties</h4>
      <div className="row g-4">
        {partyList.map((party, index) => (
          <div className="col-md-4" key={index}>
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <img
                  src={party.image}
                  alt={party.name}
                  className="rounded-circle mb-3"
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
                <h5 className="card-title">{party.name}</h5>
                <p className="card-text">
                  <strong>Party Type:</strong> {formatType(party.type)} <br />
                  <strong>Contact:</strong> {party.contact} <br />
                  <strong>City:</strong> {party.city}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradeParty;

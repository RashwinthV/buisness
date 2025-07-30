import React from "react";
import Image_default from "../../../Assets/Images/Default.png"; // Replace with actual path if different
import '../../../Styles/ManageUi.css'

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
    <div className="container">
   
 <div className="row g-4">
  {partyList.map((party, index) => (
    <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3" key={index}>
      <div className="card manage-cards card-Tradeparty h-100 shadow-lg rounded-4 text-center  d-flex flex-column position-relative">
        
        <div className="p-3"> 
        <div className='justify-content-center'>
        <img
          src={party.image}
          alt={party.name}
          className="img-fluid mb-3"
          style={{
            height: "130px",
            objectFit: "cover",
            width: "130px",
            borderRadius: "12px",
            border: "2px solid #eee",
          }}
        />
        </div>

        <hr />

        <h6 className="fw-bold mb-2">{party.name}</h6>

        <h6 className="text-success fw-semibold mb-2">
          ID: {party.id || "N/A"}
        </h6>

        <div className="d-flex justify-content-center gap-2 mb-3">
          <span className="badge bg-warning text-dark">
            {formatType(party.type) || "No Type"}
          </span>
        </div>

        <div className="d-flex justify-content-center flex-column small text-muted mb-3">
          <span><strong>Contact:</strong> {party.contact || "N/A"}</span>
          <span><strong>City:</strong> {party.city || "N/A"}</span>
        </div>

</div>
        
      </div>
    </div>
  ))}
</div>
    </div>
  );
};

export default TradeParty;

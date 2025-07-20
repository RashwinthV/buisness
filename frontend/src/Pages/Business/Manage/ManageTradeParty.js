import React, { useState } from "react";
import Image_default from "../../../Assets/Images/Default.png";
import AddTradePartyModal from "../../../components/Modal/AddTradePartyModal";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const ManageTradeParty = () => {
  const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
  const location = useLocation();
  const { businessId } = useParams();

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

  const formatType = (type) => {
    if (type === "buyer") return "Buyer";
    if (type === "supplier") return "Supplier";
    return "Buyer & Supplier";
  };

   const openAddModal = () => {
    navigate(`/managebusiness/${businessId}/managetradeparties/Add_Trader`, {
      state: { backgroundLocation: location },
    });
  };

  return (
    <div className="container py-2">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Trade Parties</h4>
        <button className="btn btn-success" onClick={openAddModal}>
          + Add Trade Party
        </button>
      </div>

      <div className="row g-4">
        {partyList.map((party, index) => (
          <div className="col-md-4" key={index}>
            <div className="card h-100 shadow-sm position-relative">
              <button className="btn btn-sm btn-outline-primary position-absolute top-0 end-0 m-2">
                <i className="bi bi-pencil-square me-1"></i>
              </button>
              {/* Edit icon can be added later here */}
              <div className="card-body text-center">
                <img
                  src={party.image}
                  alt={party.name}
                  className="rounded-circle mb-3"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
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

      <AddTradePartyModal
        show={showModal}
        handleClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default ManageTradeParty;

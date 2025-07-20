import { useState } from "react";
import Image_default from "../../../Assets/Images/Default.png";
import AddTradePartyModal from "../../../components/Modal/AddTradePartyModal";
import UniversalEditModal from "../../../components/Modal/UniversalEditModal";

const ManageTradeParty = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [partyList, setPartyList] = useState([
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
  ]);

  const formatType = (type) => {
    if (type === "buyer") return "Buyer";
    if (type === "supplier") return "Supplier";
    return "Buyer & Supplier";
  };

  const handleEdit = (party) => {
    setEditData({
      ...party,
      imagePreview: party?.image || Image_default,
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    const updated = partyList.map((item) =>
      item.id === editData.id ? editData : item
    );
    setPartyList(updated);
    setShowEditModal(false);
  };

  const handleDelete = (party) => {
    if (window.confirm(`Are you sure you want to delete "${party.name}"?`)) {
      const updated = partyList.filter((item) => item.id !== party.id);
      setPartyList(updated);
    }
  };
  return (
    <div className="container py-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold">Manage Trade Parties</h4>
        <button
          className="btn btn-success px-3"
          onClick={() => setShowModal(true)}
        >
          <i className="bi bi-plus-circle me-2"></i> Add Trade Party
        </button>
      </div>

      {partyList.length === 0 ? (
        <p className="text-center text-muted">No trade parties found.</p>
      ) : (
        <div className="row g-4">
          {partyList.map((party, index) => (
            <div className="col-md-6 col-lg-4" key={index}>
              <div
                className="card border-0 shadow-sm h-100 position-relative party-card hover-shadow rounded-4"
                style={{ backgroundColor: "#51ff0021" }}
              >
 
                            <div className="position-absolute top-0 end-0 m-2 d-flex gap-2">
               <button
                  className="btn btn-light btn-sm shadow-sm rounded-circle"
                  title="Edit"
                  onClick={() => handleEdit(party)}
                >
                  <i className="bi bi-pencil-fill text-primary"></i>
                </button>
                <button
                  className="btn btn-light btn-sm shadow-sm rounded-circle"
                  title="Delete"
                  onClick={() => handleDelete(party)}
                >
                  <i className="bi bi-trash-fill text-danger"></i>
                </button>
              </div>
                <div className="card-body d-flex flex-column align-items-center text-center">
                  <img
                    src={party.image}
                    alt={party.name}
                    className="mb-3"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "15px",
                      border: "2px solid #eee",
                    }}
                  />
                  <h5 className="fw-semibold mb-1 text-dark">{party.name}</h5>
                  <p className="mb-1">
                    <span className="badge bg-primary-subtle text-dark">
                      {formatType(party.type)}
                    </span>
                  </p>
                  <p className="small text-muted mb-2">
                    ID: <span className="text-dark">{party.id}</span>
                  </p>
                  <div className="w-100 border-top pt-2">
                    <p className="mb-1">
                      <strong>Contact:</strong>{" "}
                      <span className="text-muted">{party.contact}</span>
                    </p>
                    <p className="mb-0">
                      <strong>City:</strong>{" "}
                      <span className="text-muted">{party.city}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      <AddTradePartyModal
        show={showModal}
        handleClose={() => setShowModal(false)}
      />

      {/* Edit Modal */}
      <UniversalEditModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        handleSave={handleSaveEdit}
        formData={editData || {}}
        setFormData={setEditData}
        title="Edit Trade Party"
        fields={[
          { label: "Party Name", name: "name" },
          { label: "Party ID", name: "id", readonly: true },
          { label: "Contact", name: "contact", type: "text" },
          { label: "City", name: "city", type: "text" },
          {
            label: "Party Type",
            name: "type",
            type: "text", // You can change to select if needed
          },
        ]}
        includeImage={true}
      />
    </div>
  );
};

export default ManageTradeParty;

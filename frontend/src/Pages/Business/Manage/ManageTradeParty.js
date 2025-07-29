import { useState } from "react";
import Image_default from "../../../Assets/Images/Default.png";
import AddTradePartyModal from "../../../components/Modal/AddTradePartyModal";
import UniversalEditModal from "../../../components/Modal/UniversalEditModal";
import ManageTagsModal from "../../../components/Modal/ManageTagsModal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import '../../../Styles/ManageUi.css'

const DEFAULT_PARTY_TYPES = ["buyer", "supplier", "both"];

const ManageTradeParty = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const [partyTypes, setPartyTypes] = useState([...DEFAULT_PARTY_TYPES]);
  const [showTagsModal, setShowTagsModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalData, setModalData] = useState([]);

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

  const navigate = useNavigate();
  const location = useLocation();
  const { businessId } = useParams();

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

  const openManageModal = () => {
    setModalTitle("Party Types");
    setModalData(partyTypes);
    setShowTagsModal(true);
  };

  const handleSaveTags = (updated) => {
    setPartyTypes(updated);
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
    <div className="container rounded shadow-sm py-3">
<div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
  <h4 className="mb-2 mb-md-0 me-auto">Trade Parties</h4>

  <div className="d-flex flex-wrap align-items-center justify-content-center gap-2">
    <button className="btn btn-sm btn-primary" onClick={openManageModal}>
      <i className="bi bi-pencil-square me-2"></i> Manage Party Types
    </button>
    <button className="btn btn-sm btn-success" onClick={openAddModal}>
      <i className="bi bi-plus-circle me-2"></i> Add Trade Party
    </button>
  </div>
</div>

<hr></hr>
      {partyList.length === 0 ? (
        <p className="text-center text-muted">No trade parties found.</p>
      ) : (
        // <div className="row g-4">
        //   {partyList.map((party, index) => (
        //     <div className="col-md-6 col-lg-4" key={index}>
        //       <div
        //         className="card border-0 shadow-sm h-100 position-relative party-card hover-shadow rounded-4"
        //         style={{ backgroundColor: "#51ff0021" }}
        //       >
        //         <div className="position-absolute top-0 end-0 m-2 d-flex gap-2">
        //           <button
        //             className="btn btn-light btn-sm shadow-sm rounded-circle"
        //             title="Edit"
        //             onClick={() => handleEdit(party)}
        //           >
        //             <i className="bi bi-pencil-fill text-primary"></i>
        //           </button>
        //           <button
        //             className="btn btn-light btn-sm shadow-sm rounded-circle"
        //             title="Delete"
        //             onClick={() => handleDelete(party)}
        //           >
        //             <i className="bi bi-trash-fill text-danger"></i>
        //           </button>
        //         </div>
        //         <div className="card-body d-flex flex-column align-items-center text-center">
        //           <img
        //             src={party.image}
        //             alt={party.name}
        //             className="mb-3"
        //             style={{
        //               width: "100px",
        //               height: "100px",
        //               objectFit: "cover",
        //               borderRadius: "15px",
        //               border: "2px solid #eee",
        //             }}
        //           />
        //           <h5 className="fw-semibold mb-1 text-dark">{party.name}</h5>
        //           <p className="mb-1">
        //             <span className="badge bg-primary-subtle text-dark">
        //               {formatType(party.type)}
        //             </span>
        //           </p>
        //           <p className="small text-muted mb-2">
        //             ID: <span className="text-dark">{party.id}</span>
        //           </p>
        //           <div className="w-100 border-top pt-2">
        //             <p className="mb-1">
        //               <strong>Contact:</strong>{" "}
        //               <span className="text-muted">{party.contact}</span>
        //             </p>
        //             <p className="mb-0">
        //               <strong>City:</strong>{" "}
        //               <span className="text-muted">{party.city}</span>
        //             </p>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   ))}
        // </div>
<div className="row g-4">
  {partyList.map((party, index) => (
    <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3" key={index}>
      <div className="card manage-cards h-100 shadow-sm border-2 rounded-4 text-center p-3 d-flex flex-column position-relative">
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

        {/* Action buttons at bottom */}
        <div className="d-flex justify-content-center gap-2 mt-auto">
          <button
            className="btn btn-outline-primary btn-sm rounded-pill"
            title="Edit"
            onClick={() => handleEdit(party)}
          >
            <i className="bi bi-pencil-fill"></i>
          </button>
          <button
            className="btn btn-outline-danger btn-sm rounded-pill"
            title="Delete"
            onClick={() => handleDelete(party)}
          >
            <i className="bi bi-trash-fill"></i>
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

        
      )}

      {/* Add Modal */}
      <AddTradePartyModal show={showModal} handleClose={() => setShowModal(false)} />

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
            type: "select",
            options: partyTypes,
          },
        ]}
        includeImage={true}
      />

      {/* Manage Party Type Modal */}
      <ManageTagsModal
        show={showTagsModal}
        onHide={() => setShowTagsModal(false)}
        title={modalTitle}
        initialTags={modalData}
        onSave={handleSaveTags}
      />
    </div>
  );
};

export default ManageTradeParty;

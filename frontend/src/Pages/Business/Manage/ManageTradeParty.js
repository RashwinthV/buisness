import { useState } from "react";
import Image_default from "../../../Assets/Images/Default.png";
import AddTradePartyModal from "../../../components/Modal/AddTradePartyModal";
import UniversalEditModal from "../../../components/Modal/UniversalEditModal";
import ManageTagsModal from "../../../components/Modal/ManageTagsModal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import '../../../Styles/ManageUi.css'
import { useUser } from "../../../context/userContext";
import { useBusiness } from "../../../context/BussinessContext";
import { toast } from "react-toastify";
import { useEffect } from "react";

const DEFAULT_PARTY_TYPES = ["buyer", "supplier", "both"];

const ManageTradeParty = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState(null);
const [selectedPartyType, setSelectedPartyType] = useState("");

  const [partyTypes, setPartyTypes] = useState([...DEFAULT_PARTY_TYPES]);
  const [showTagsModal, setShowTagsModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalData, setModalData] = useState([]);
    const { businessId } = useParams();

    const { user, token, baseUrl } = useUser();
    const { businesses } = useBusiness();
    const selectedbusiness = businesses.find(
      (b) => String(b.businessId) === businessId
    );
  
    useEffect(()=>{
    if (selectedbusiness) {
      setPartyTypes(selectedbusiness?.tradePartyTypes || [...DEFAULT_PARTY_TYPES]);
    }
    },[selectedbusiness,selectedbusiness?.tradePartyTypes])

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

 const handleSaveTags = async (updatedTags) => {
    const type = "trade";
    try {
      const res = await fetch(
        `${baseUrl}/v2/bussiness/${user?.id}/tags/${selectedbusiness?._id}/${type}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ tags: updatedTags }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        setPartyTypes(data.tags || []);
      } else {
        console.error("Failed to update tags", data?.error);
      }
    } catch (err) {
      console.error("Error updating tags", err);
    }
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
<div className="mb-4">
  <select
    className="form-select w-auto"
    value={selectedPartyType}
    onChange={(e) => setSelectedPartyType(e.target.value)}
  >
    <option value="">All Party Types</option>
    {[...new Set(partyList.map((p) => p.type))].map((type, idx) => (
      <option key={idx} value={type}>
        {formatType(type)}
      </option>
    ))}
  </select>
</div>
      {partyList.length === 0 ? (
        <p className="text-center text-muted">No trade parties found.</p>
      ) : (
        
<div className="row g-4">
  {partyList
  .filter((party) =>
    selectedPartyType ? party.type === selectedPartyType : true
  )
  .map((party, index) => (
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

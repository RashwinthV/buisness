import React, { useState } from "react";
import Image_default from "../../../Assets/Images/Default.png";
import AddVehicleModal from "../../../components/Modal/AddVehicleModal";
import UniversalEditModal from "../../../components/Modal/UniversalEditModal"; // ✅ Import missing
import { useLocation, useNavigate, useParams } from "react-router-dom";

const ManageVehicle = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // ✅ Define state
  const [editData, setEditData] = useState(null);             // ✅ Define state
   const navigate = useNavigate();
  const location = useLocation();
  const { businessId } = useParams();

  const vehicleList = [
    {
      id: "VEH001",
      name: "Eiecher Truck",
      type: "Goods Transport",
      registrationNumber: "TN 38 AA 1234",
      image: Image_default,
    },
    {
      id: "VEH002",
      name: "Hyundai Creta",
      type: "Office",
      registrationNumber: "TN 66 BB 5678",
      image: Image_default,
    },
    {
      id: "VEH003",
      name: "Force Traveller",
      type: "Staff Transport",
      registrationNumber: "TN 07 CC 9999",
      image: Image_default,
    },
  ];

  // ✅ Handle Edit
  const handleEdit = (vehicle) => {
    setEditData(vehicle);
    setShowEditModal(true);
  };

  // ✅ Handle Save (for demo)
  const handleSaveEdit = () => {
    console.log("Edited Data:", editData);
    setShowEditModal(false);
  };

  // ✅ Handle Delete (for demo)
  const handleDelete = (vehicle) => {
    if (window.confirm(`Delete vehicle "${vehicle.name}"?`)) {
      console.log("Deleted:", vehicle);
      // delete logic here
    }
  };

    const openAddModal = () => {
    navigate(`/managebusiness/${businessId}/manageproducts/Add_Product`, {
      state: { backgroundLocation: location },
    });
  };

  return (
    <div className="container py-2">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Vehicles</h4>
        <button className="btn btn-success" onClick={openAddModal}>
          + Register Vehicle
        </button>
      </div>

      {vehicleList.length === 0 ? (
        <p className="text-center text-muted">No vehicles found.</p>
      ) : (
        <div className="row g-4">
          {vehicleList.map((vehicle, index) => (
            <div className="col-md-6 col-lg-4" key={index}>
              <div
                className="card border-0 shadow-sm h-100 position-relative product-card hover-shadow rounded-4"
                style={{ backgroundColor: "#51ff0021" }}
              >
                <div className="position-absolute top-0 end-0 m-2 d-flex gap-2">
                  <button
                    className="btn btn-light btn-sm shadow-sm rounded-circle"
                    title="Edit"
                    onClick={() => handleEdit(vehicle)}
                  >
                    <i className="bi bi-pencil-fill text-primary"></i>
                  </button>
                  <button
                    className="btn btn-light btn-sm shadow-sm rounded-circle"
                    title="Delete"
                    onClick={() => handleDelete(vehicle)}
                  >
                    <i className="bi bi-trash-fill text-danger"></i>
                  </button>
                </div>

                <div className="card-body d-flex flex-column align-items-center text-center">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="mb-3"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "15px",
                      border: "2px solid #eee",
                    }}
                  />
                  <h5 className="fw-semibold mb-1 text-dark">{vehicle.name}</h5>
                  <p className="mb-1">
                    <span className="badge bg-info-subtle text-dark">
                      {vehicle.type}
                    </span>
                  </p>
                  <p className="small text-muted mb-2">
                    Vehicle ID: <span className="text-dark">{vehicle.id}</span>
                  </p>

                  <div className="w-100 border-top pt-2">
                    <p className="mb-2">
                      <strong>Reg. Number:</strong>{" "}
                      <span className="text-muted">{vehicle.registrationNumber}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      <AddVehicleModal show={showModal} handleClose={() => setShowModal(false)} />

      {/* Edit Modal */}
      <UniversalEditModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        handleSave={handleSaveEdit}
        formData={editData || {}}
        setFormData={setEditData}
        title="Edit Vehicle"
        includeImage={true}
        fields={[
          { label: "Vehicle Name", name: "name" },
          { label: "Vehicle ID", name: "id", readonly: true },
          { label: "Vehicle Type", name: "type" },
          { label: "Registration Number", name: "registrationNumber" },
        ]}
      />
    </div>
  );
};

export default ManageVehicle;

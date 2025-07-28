import React, { useEffect, useState } from "react";
import Image_default from "../../../Assets/Images/Default.png";
import AddVehicleModal from "../../../components/Modal/AddVehicleModal";
import UniversalEditModal from "../../../components/Modal/UniversalEditModal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useVehicle } from "../../../context/vehicleContext";
import { useUser } from "../../../context/userContext";
import { VechileImageEditor } from "../../../Utils/Image/EditImage";

const ManageVehicle = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const { user, token, baseUrl } = useUser();

  const navigate = useNavigate();
  const location = useLocation();
  const { businessId } = useParams();
  const { vehicle } = useVehicle();

  const [vehicleList, setvehicleList] = useState([]);
  useEffect(() => {
    if (vehicle && Array.isArray(vehicle)) {
      setvehicleList(vehicle);
    }
  }, [setvehicleList, vehicle]);

  const handleEdit = (vehicle) => {
    setEditData(vehicle);
    setShowEditModal(true);
  };

  const { handleImageUpload } = VechileImageEditor({
    userId: user?.id,
    token,
    publicId: editData?.image?.publicId,
    baseUrl,
    businessId,
  });

  const handleImageChange = async (file) => {
    const imageUrl = URL.createObjectURL(file); // For preview
    setEditData((prevData) => ({
      ...prevData,
      imagePreview: imageUrl,
    }));

    const uploaded = await handleImageUpload(file);
    if (uploaded?.imageUrl && uploaded?.publicId) {
      setEditData((prevData) => ({
        ...prevData,
        image: {
          imageUrl: uploaded.imageUrl,
          publicId: uploaded.publicId,
        },
        imagePreview: uploaded.imageUrl,
      }));
    }
  };

  // ✅ Handle Save (for demo)
  const handleSaveEdit = async (editData) => {
    try {
      const res = await fetch(
        `${baseUrl}/v2/bussiness/vechile/${user?.id}/updateVehicle/${editData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editData),
        }
      );

      const data = await res.json();
      if (res.ok) {
        const updatedList = vehicleList.map((v) =>
          v._id === data._id ? data : v
        );
        setvehicleList(updatedList);
        setShowEditModal(false);
      } else {
        console.error("Failed to update vehicle", data?.error);
      }
    } catch (err) {
      console.error("Error updating vehicle", err);
    }
  };

  // ✅ Handle Delete (for demo)
  const handleDelete = (vehicle) => {
    if (window.confirm(`Delete vehicle "${vehicle.name}"?`)) {
      console.log("Deleted:", vehicle);
      // delete logic here
    }
  };

  const openAddModal = () => {
    navigate(`/managebusiness/${businessId}/managevehicles/Add_Vechile`, {
      state: { backgroundLocation: location },
    });
  };

  return (
    <div className="container py-2">
      <div className="d-flex justify-content-between align-items-center mb-3 p-1 ">
        <h4 className="mb-0 me-4">Vehicles</h4>
        <button className="btn btn-success " onClick={openAddModal}>
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
                    src={vehicle.image?.imageUrl || Image_default}
                    alt={vehicle.name}
                    className="mb-3"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "contain",
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
                    Vehicle ID:{" "}
                    <span className="text-dark">{vehicle.vehicleId}</span>
                  </p>

                  <div className="w-100 border-top pt-2">
                    <p className="mb-2">
                      <strong>Reg. Number:</strong>{" "}
                      <span className="text-muted">
                        {vehicle.registrationNumber}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      <AddVehicleModal
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
        title="Edit Vehicle"
        includeImage={true}
        onImageChange={handleImageChange}
        fields={[
          { label: "Vehicle Name", name: "name" },
          { label: "Model", name: "model", readonly: true },
          { label: "Brand Name", name: "brand" },
          { label: "Owner", name: "registeredOwnerName" },
          { label: "RTO Details", name: "rtoDetails" },

          { label: "Registration Number", name: "registrationNumber" },
        ]}
      />
    </div>
  );
};

export default ManageVehicle;

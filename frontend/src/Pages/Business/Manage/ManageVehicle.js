// import React, { useEffect, useState } from "react";
// import Image_default from "../../../Assets/Images/Default.png";
// import AddVehicleModal from "../../../components/Modal/AddVehicleModal";
// import UniversalEditModal from "../../../components/Modal/UniversalEditModal";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { useVehicle } from "../../../context/vehicleContext";
// import { useUser } from "../../../context/userContext";
// import { VechileImageEditor } from "../../../Utils/Image/EditImage";

// const ManageVehicle = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editData, setEditData] = useState(null);
//   const { user, token, baseUrl } = useUser();

//   const navigate = useNavigate();
//   const location = useLocation();
//   const { businessId } = useParams();
//   const { vehicle } = useVehicle();

//   const [vehicleList, setvehicleList] = useState([]);
//   useEffect(() => {
//     if (vehicle && Array.isArray(vehicle)) {
//       setvehicleList(vehicle);
//     }
//   }, [setvehicleList, vehicle]);

//   const handleEdit = (vehicle) => {
//     setEditData(vehicle);
//     setShowEditModal(true);
//   };

//   const { handleImageUpload } = VechileImageEditor({
//     userId: user?.id,
//     token,
//     publicId: editData?.image?.publicId,
//     baseUrl,
//     businessId,
//   });

//   const handleImageChange = async (file) => {
//     const imageUrl = URL.createObjectURL(file); // For preview
//     setEditData((prevData) => ({
//       ...prevData,
//       imagePreview: imageUrl,
//     }));

//     const uploaded = await handleImageUpload(file);
//     if (uploaded?.imageUrl && uploaded?.publicId) {
//       setEditData((prevData) => ({
//         ...prevData,
//         image: {
//           imageUrl: uploaded.imageUrl,
//           publicId: uploaded.publicId,
//         },
//         imagePreview: uploaded.imageUrl,
//       }));
//     }
//   };

//   // ✅ Handle Save (for demo)
//   const handleSaveEdit = async (editData) => {
//     try {
//       const res = await fetch(
//         `${baseUrl}/v2/bussiness/vechile/${user?.id}/updateVehicle/${editData._id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(editData),
//         }
//       );

//       const data = await res.json();
//       if (res.ok) {
//         const updatedList = vehicleList.map((v) =>
//           v._id === data._id ? data : v
//         );
//         setvehicleList(updatedList);
//         setShowEditModal(false);
//       } else {
//         console.error("Failed to update vehicle", data?.error);
//       }
//     } catch (err) {
//       console.error("Error updating vehicle", err);
//     }
//   };

//   // ✅ Handle Delete (for demo)
//   const handleDelete = (vehicle) => {
//     if (window.confirm(`Delete vehicle "${vehicle.name}"?`)) {
//       console.log("Deleted:", vehicle);
//       // delete logic here
//     }
//   };

//   const openAddModal = () => {
//     navigate(`/managebusiness/${businessId}/managevehicles/Add_Vechile`, {
//       state: { backgroundLocation: location },
//     });
//   };

//   return (
//     <div className="container rounded shadow-sm py-3">
//       <div className="d-flex justify-content-between align-items-center mb-3 p-1 ">
//         <h4 className="mb-0 me-4">Vehicles</h4>
//           <div className="d-flex flex-wrap align-items-center justify-content-center gap-2">
//     <button className="btn btn-sm btn-primary">
//       <i className="bi bi-pencil-square me-2"></i> Manage Vehicle Types
//     </button>
//     <button className="btn btn-sm btn-success" onClick={openAddModal}>
//       <i className="bi bi-plus-circle me-2"></i> Add Vehicle
//     </button>
//   </div>

//       </div>
//  <hr></hr>
//       {vehicleList.length === 0 ? (
//         <p className="text-center text-muted">No vehicles found.</p>
//       ) : (
// <div className="row g-4">
//   {vehicleList.map((vehicle, index) => (
//     <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3" key={index}>
//       <div className="card h-100 shadow-sm border-2 rounded-4 text-center p-3 d-flex flex-column position-relative">
        
//         <img
//           src={vehicle.image?.imageUrl || Image_default}
//           alt={vehicle.name}
//           className="img-fluid mb-3"
//           style={{
//             height: "100%",
//             objectFit: "contain",
//             width: "100%",
//             borderRadius: "12px",
//             border: "2px solid #eee",
//           }}
//         />

//         <hr />

//         <h6 className="fw-bold mb-2">{vehicle.name}</h6>

//         <h6 className="text-success fw-semibold mb-2">
//           Vehicle ID: {vehicle.vehicleId || "N/A"}
//         </h6>

//         <div className="d-flex justify-content-center gap-2 mb-3">
//           <span className="badge bg-warning text-dark">
//             {vehicle.type || "No Type"}
//           </span>
//         </div>

//         <div className="small text-muted mb-3">
//           <strong>Reg. Number:</strong>{" "}
//           {vehicle.registrationNumber || "N/A"}
//         </div>

//         {/* Buttons at the bottom */}
//         <div className="d-flex justify-content-center gap-2 mt-auto">
//           <button
//             className="btn btn-outline-primary btn-sm rounded-pill"
//             title="Edit"
//             onClick={() => handleEdit(vehicle)}
//           >
//             <i className="bi bi-pencil-fill"></i>
//           </button>
//           <button
//             className="btn btn-outline-danger btn-sm rounded-pill"
//             title="Delete"
//             onClick={() => handleDelete(vehicle)}
//           >
//             <i className="bi bi-trash-fill"></i>
//           </button>
//         </div>
//       </div>
//     </div>
//   ))}
// </div>

//       )}

//       {/* Add Modal */}
//       <AddVehicleModal
//         show={showModal}
//         handleClose={() => setShowModal(false)}
//       />

//       {/* Edit Modal */}
//       <UniversalEditModal
//         show={showEditModal}
//         handleClose={() => setShowEditModal(false)}
//         handleSave={handleSaveEdit}
//         formData={editData || {}}
//         setFormData={setEditData}
//         title="Edit Vehicle"
//         includeImage={true}
//         onImageChange={handleImageChange}
//         fields={[
//           { label: "Vehicle Name", name: "name" },
//           { label: "Model", name: "model", readonly: true },
//           { label: "Brand Name", name: "brand" },
//           { label: "Owner", name: "registeredOwnerName" },
//           { label: "RTO Details", name: "rtoDetails" },

//           { label: "Registration Number", name: "registrationNumber" },
//         ]}
//       />
//     </div>
//   );
// };

// export default ManageVehicle;
import React, { useEffect, useState } from "react";
import Image_default from "../../../Assets/Images/Default.png";
import AddVehicleModal from "../../../components/Modal/AddVehicleModal";
import UniversalEditModal from "../../../components/Modal/UniversalEditModal";
import ManageTagsModal from "../../../components/Modal/ManageTagsModal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useVehicle } from "../../../context/vehicleContext";
import { useUser } from "../../../context/userContext";
import { VechileImageEditor } from "../../../Utils/Image/EditImage";
import '../../../Styles/ManageUi.css'
const DEFAULT_VEHICLE_TYPES = ["OFFICE", "TRANSPORT"];

const ManageVehicle = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const [vehicleTypes, setVehicleTypes] = useState([...DEFAULT_VEHICLE_TYPES]);
  const [showTagsModal, setShowTagsModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalData, setModalData] = useState([]);

  const [vehicleList, setVehicleList] = useState([]);

  const { user, token, baseUrl } = useUser();
  const { vehicle } = useVehicle();

  const navigate = useNavigate();
  const location = useLocation();
  const { businessId } = useParams();

  useEffect(() => {
    if (vehicle && Array.isArray(vehicle)) {
      setVehicleList(vehicle);
    }
  }, [vehicle]);

  const openAddModal = () => {
    navigate(`/managebusiness/${businessId}/managevehicles/Add_Vechile`, {
      state: { backgroundLocation: location },
    });
  };

  const openManageModal = () => {
    setModalTitle("Vehicle Types");
    setModalData(vehicleTypes);
    setShowTagsModal(true);
  };

  const handleSaveTags = (updatedTags) => {
    setVehicleTypes(updatedTags);
    setShowTagsModal(false);
  };

  const handleEdit = (vehicle) => {
    setEditData({
      ...vehicle,
      imagePreview: vehicle?.image?.imageUrl || Image_default,
    });
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
    const imageUrl = URL.createObjectURL(file); // preview
    setEditData((prev) => ({
      ...prev,
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

  const handleSaveEdit = async (updated) => {
    try {
      const res = await fetch(
        `${baseUrl}/v2/bussiness/vechile/${user?.id}/updateVehicle/${updated._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updated),
        }
      );

      const data = await res.json();
      if (res.ok) {
        const newList = vehicleList.map((v) =>
          v._id === data._id ? data : v
        );
        setVehicleList(newList);
        setShowEditModal(false);
      } else {
        console.error("Failed to update vehicle", data?.error);
      }
    } catch (err) {
      console.error("Error updating vehicle", err);
    }
  };

  const handleDelete = (vehicle) => {
    if (window.confirm(`Delete vehicle "${vehicle.name}"?`)) {
      const updated = vehicleList.filter((v) => v._id !== vehicle._id);
      setVehicleList(updated);
    }
  };

  return (
    <div className="container rounded shadow-sm py-3">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <h4 className="mb-2 mb-md-0 me-auto">Vehicles</h4>
        <div className="d-flex flex-wrap align-items-center justify-content-center gap-2">
          <button className="btn btn-sm btn-primary" onClick={openManageModal}>
            <i className="bi bi-pencil-square me-2"></i> Manage Vehicle Types
          </button>
          <button className="btn btn-sm btn-success" onClick={openAddModal}>
            <i className="bi bi-plus-circle me-2"></i> Add Vehicle
          </button>
        </div>
      </div>

      <hr />

      {vehicleList.length === 0 ? (
        <p className="text-center text-muted">No vehicles found.</p>
      ) : (
        <div className="row g-4">
          {vehicleList.map((vehicle, index) => (
            <div
              className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3"
              key={index}
            >
              <div className="card manage-cards h-100 shadow-sm border-2 rounded-4 text-center p-3 d-flex flex-column position-relative">
                <img
                  src={vehicle.image?.imageUrl || Image_default}
                  alt={vehicle.name}
                  className="img-fluid mb-3"
                  style={{
                    height: "130px",
                    objectFit: "contain",
                    width: "100%",
                    borderRadius: "12px",
                    border: "2px solid #eee",
                  }}
                />

                <hr />

                <h6 className="fw-bold mb-2">{vehicle.name}</h6>

                <h6 className="text-success fw-semibold mb-2">
                  Vehicle ID: {vehicle.vehicleId || "N/A"}
                </h6>

                <div className="d-flex justify-content-center gap-2 mb-3">
                  <span className="badge bg-warning text-dark">
                    {vehicle.type || "No Type"}
                  </span>
                </div>

                <div className="small text-muted mb-3">
                  <strong>Reg. Number:</strong>{" "}
                  {vehicle.registrationNumber || "N/A"}
                </div>

                <div className="d-flex justify-content-center gap-2 mt-auto">
                  <button
                    className="btn btn-outline-primary btn-sm rounded-pill"
                    title="Edit"
                    onClick={() => handleEdit(vehicle)}
                  >
                    <i className="bi bi-pencil-fill"></i>
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm rounded-pill"
                    title="Delete"
                    onClick={() => handleDelete(vehicle)}
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
        onImageChange={handleImageChange}
        fields={[
  { label: "Vehicle Name", name: "name" },
  {
    label: "Vehicle Type",
    name: "type",
    type: "select",
    options: vehicleTypes, // assumed to be declared above
  },
  { label: "Vehicle ID", name: "vehicleId", readonly: true },
  { label: "Brand", name: "brand" },
  { label: "Model", name: "model" },
  { label: "Registration Number", name: "registrationNumber" },
  { label: "Registered Owner Name", name: "registeredOwnerName" },
  { label: "RTO Details", name: "rtoDetails" },
  {
    label: "Registration Date",
    name: "registrationDate",
    type: "date",
  },
  {
    label: "Ownership",
    name: "ownership",
    type: "select",
    options: [
      { label: "First", value: "first" },
      { label: "Second", value: "second" },
      { label: "Third", value: "third" },
      { label: "Others", value: "others" },
    ],
  },
  {
    label: "Insurance Valid Till",
    name: "insuranceValidTill",
    type: "date",
  },
  {
    label: "FC Valid Till",
    name: "fcValidTill",
    type: "date",
  },
]}

      />

      {/* Manage Vehicle Types Modal */}
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

export default ManageVehicle;

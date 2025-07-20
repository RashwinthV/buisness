import React, { useState } from "react";
import Image_default from "../../../Assets/Images/Default.png";
import AddVehicleModal from "../../../components/Modal/AddVehicleModal";

const ManageVehicle = () => {
  const [showModal, setShowModal] = useState(false);

  const vehicleList = [
    {
      id: "VEH001",
      name: "Honda Activa",
      registrationNumber: "TN 38 AA 1234",
      image: Image_default,
    },
    {
      id: "VEH002",
      name: "Hyundai Creta",
      registrationNumber: "TN 66 BB 5678",
      image: Image_default,
    },
    {
      id: "VEH003",
      name: "Bajaj Pulsar",
      registrationNumber: "KL 07 CC 9999",
      image: Image_default,
    },
  ];

  return (
    <div className="container py-2">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Vehicles</h4>
        <button className="btn btn-success" onClick={() => setShowModal(true)}>
          + Register Vehicle
        </button>
      </div>
      <div className="row g-4">
        {vehicleList.map((vehicle, index) => (
          <div className="col-md-4" key={index}>
            <div className="card h-100 shadow-sm">
                                                <button
                    className="btn btn-sm btn-outline-primary position-absolute top-0 end-0 m-2"

                  >
                    <i className="bi bi-pencil-square me-1"></i>
                  </button>
              <div className="card-body text-center">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="mb-3"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
                <h5 className="card-title">{vehicle.name}</h5>
                <p className="card-text">
                  <strong>Vehicle ID:</strong> {vehicle.id} <br />
                  <strong>Reg Number:</strong> {vehicle.registrationNumber}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <AddVehicleModal show={showModal} handleClose={() => setShowModal(false)} />
    </div>
  );
};

export default ManageVehicle;

import React from "react";
import Image_default from "../../../Assets/Images/Default.png"; // Replace with your path

const Vehicle = () => {
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
      <h4 className="mb-4 text-center">Vehicles</h4>
      <div className="row g-4">
        {vehicleList.map((vehicle, index) => (
          <div className="col-md-4" key={index}>
            <div className="card h-100 shadow-sm">
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
    </div>
  );
};

export default Vehicle;

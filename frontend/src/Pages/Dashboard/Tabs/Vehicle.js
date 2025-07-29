import React, { useEffect, useState } from "react";
import Image_default from "../../../Assets/Images/Default.png"; // Replace with your path
import { useVehicle } from "../../../context/vehicleContext";

const Vehicle = () => {
  const { vehicle } = useVehicle();
  const [vehicleList,setvehicleList]=useState([])
  useEffect(()=>{
    if(vehicle&& Array.isArray(vehicle)){
      setvehicleList(vehicle)
    }
  },[setvehicleList,vehicle])
 
  

  return (
    <div className="container">
      
      <h4 className="mb-2 text-center">Vehicles</h4>

<hr></hr>
      <div className="row mt-2 g-4">
        {vehicleList.map((vehicle, index) => (
          <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3" key={index}>
            <div className="card h-100 shadow-sm border-2 rounded-4 text-center p-3 d-flex flex-column position-relative">
              
              <img
                src={vehicle.image?.imageUrl || Image_default}
                alt={vehicle.name}
                className="img-fluid mb-3"
                style={{
                  height: "100%",
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
      
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vehicle;

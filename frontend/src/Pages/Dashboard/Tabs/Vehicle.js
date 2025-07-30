import React, { useEffect, useState } from "react";
import Image_default from "../../../Assets/Images/Default.png"; // Replace with your path
import { useVehicle } from "../../../context/vehicleContext";
import '../../../Styles/ManageUi.css'

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
      
    
      <div className="row g-4">
        {vehicleList.map((vehicle, index) => (
<div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3" key={index}>
  <div className="card manage-cards card-vehicle shadow-lg  rounded-4 text-center h-100 d-flex flex-column position-relative">
    <div className="p-3 d-flex flex-column align-items-center">
      
      <img
        src={vehicle.image?.imageUrl || Image_default}
        alt={vehicle.name}
          className="rounded mb-3"
          style={{
            width: "150px",
            height: "100px",
            objectFit: "cover",
        }}
      />

      <hr className="w-100 my-3" />

      <h6 className="fw-bold mb-2 text-primary">{vehicle.name}</h6>

      <h6 className="text-success fw-semibold mb-2">
        Vehicle ID: {vehicle.vehicleId || "N/A"}
      </h6>

      <div className="d-flex justify-content-center gap-2 mb-3">
        <span className="badge bg-warning text-dark">
          {vehicle.type || "No Type"}
        </span>
      </div>

      <div className="small text-muted mb-2">
        <strong>Reg. Number:</strong> {vehicle.registrationNumber || "N/A"}
      </div>
    </div>
  </div>
</div>

        ))}
      </div>
    </div>
  );
};

export default Vehicle;

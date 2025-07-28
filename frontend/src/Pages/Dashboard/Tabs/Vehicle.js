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
    <div className="container py-2 ">
      <h4 className="mb-4 text-center">Vehicles</h4>
      <div className="row g-4">
        {vehicleList.map((vehicle, index) => (
          <div className="col-md-4" key={index}>
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <img
                  src={vehicle?.image?.imageUrl||Image_default}
                  alt={vehicle.name}
                  className="mb-3"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "contain",
                    borderRadius: "10px",
                  }}
                />
                <h5 className="card-title">{vehicle.name}</h5>

                <p className="card-text">
                  <strong>Vehicle ID:</strong> {vehicle?.vehicleId} <br />
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

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Image_default from '../../../Assets/Images/Default.png'; // Default image for employees
const Employee = () => {
  const employeeList = [
    {
      id: "EMP001",
      name: "Ravi Kumar",
      age: 29,
      field: "Software Development",
      image: Image_default,
    },
    {
      id: "EMP002",
      name: "Priya Sharma",
      age: 26,
      field: "UI/UX Design",
      image: Image_default,
    },
    {
      id: "EMP003",
      name: "Amit Patel",
      age: 35,
      field: "Data Analytics",
      image: Image_default,
    },
  ];

  return (
    <div className="container py-2">
      <h4 className="mb-4 text-center">Employees</h4>
      <div className="row g-4">
        {employeeList.map((emp, index) => (
          <div className="col-md-4" key={index}>
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <img
                  src={emp.image}
                  alt={emp.name}
                  className="rounded-circle mb-3"
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
                <h5 className="card-title">{emp.name}</h5>
                <p className="card-text">
                  <strong>Emp ID:</strong> {emp.id} <br />
                  <strong>Age:</strong> {emp.age} <br />
                  <strong>Field of Work:</strong> {emp.field}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Employee;

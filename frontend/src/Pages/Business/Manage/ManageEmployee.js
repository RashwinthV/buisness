import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AddEmployeeModal from "../../../components/Modal/AddEmployeeModal"; // Adjust path as needed
import Image_default from "../../../Assets/Images/Default.png"; // Adjust path as needed
import { useLocation, useNavigate, useParams } from "react-router-dom";
const ManageEmployee = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { businessId } = useParams();

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
  const openAddModal = () => {
    navigate(`/managebusiness/${businessId}/manageemployees/Add_Employee`, {
      state: { backgroundLocation: location },
    });
  };
  return (
    <div className="container py-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold">Manage Employees</h4>
        <button className="btn btn-success" onClick={openAddModal}>
          <i className="bi bi-plus-circle me-2"></i> Add Employee
        </button>
      </div>

      <div className="row g-4">
        {employeeList.map((emp, index) => (
          <div className="col-md-4" key={index}>
            <div className="card h-100 shadow-sm position-relative">
              {/* Edit Button */}
              <button
                className="btn btn-sm btn-outline-primary position-absolute top-0 end-0 m-2"
                title="Edit Employee"
                onClick={() => alert(`Edit ${emp.name}`)} // replace with modal logic
              >
                <i className="bi bi-pencil-square"></i>
              </button>

              <div className="card-body d-flex flex-column align-items-center text-center">
                <img
                  src={emp.image}
                  alt={emp.name}
                  className="rounded-circle mb-3"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />

                <h5 className="fw-semibold mb-1 text-dark">{emp.name}</h5>
                <p className="mb-1">
                  <span className="badge bg-info-subtle text-dark">
                    {emp.field}
                  </span>
                </p>
                <p className="small text-muted mb-2">Employee ID: {emp.id}</p>

                <div className="w-100 border-top pt-2">
                  <p className="mb-1">
                    <strong>Age:</strong> {emp.age}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Employee Modal */}
      <AddEmployeeModal
        show={showModal}
        handleClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default ManageEmployee;

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AddEmployeeModal from "../../../components/Modal/AddEmployeeModal";
import UniversalEditModal from "../../../components/Modal/UniversalEditModal";
import Image_default from "../../../Assets/Images/Default.png";

const ManageEmployee = () => {
  const [showModal, setShowModal] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editData, setEditData] = useState({});
  const [employeeList, setEmployeeList] = useState([
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
  ]);

  const employeeFields = [
    { name: "name", label: "Full Name" },
    { name: "id", label: "Employee ID" },
    { name: "age", label: "Age", type: "number" },
    { name: "field", label: "Field of Work" },
  ];

  const handleEditClick = (emp) => {
    setEditData({ ...emp, imagePreview: emp.image || Image_default });
    setEditModalShow(true);
  };

  const handleSaveEdit = () => {
    const updatedList = employeeList.map((emp) =>
      emp.id === editData.id ? editData : emp
    );
    setEmployeeList(updatedList);
    setEditModalShow(false);
  };

  const handleDelete = (employee) => {
    if (window.confirm(`Are you sure you want to delete "${employee.name}"?`)) {
      const updatedList = employeeList.filter((v) => v.id !== employee.id);
      setEmployeeList(updatedList);
    }
  };

  return (
    <div className="container py-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold">Manage Employees</h4>
        <button
          className="btn btn-success px-3"
          onClick={() => setShowModal(true)}
        >
          <i className="bi bi-plus-circle me-2"></i> Add Employee
        </button>
      </div>

      <div className="row g-4">
        {employeeList.map((emp, index) => (
          <div className="col-md-6 col-lg-4" key={index}>
            <div
              className="card border-0 shadow-sm h-100 position-relative rounded-4 employee-card hover-shadow"
              style={{ backgroundColor: "#51ff0021" }}
            >
              <div className="position-absolute top-0 end-0 m-2 d-flex gap-2">
                <button
                  className="btn btn-light btn-sm shadow-sm rounded-circle"
                  title="Edit Employee"
                  onClick={() => handleEditClick(emp)}
                >
                  <i className="bi bi-pencil-fill text-primary"></i>
                </button>
                <button
                  className="btn btn-light btn-sm shadow-sm rounded-circle"
                  title="Delete"
                  onClick={() => handleDelete(emp)}
                >
                  <i className="bi bi-trash-fill text-danger"></i>
                </button>
              </div>

              <div className="card-body d-flex flex-column align-items-center text-center">
                <img
                  src={emp.image}
                  alt={emp.name}
                  className="mb-3"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "50%",
                    border: "2px solid #eee",
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

      {/* ✅ Reusable Edit Modal */}
      <UniversalEditModal
        show={editModalShow}
        handleClose={() => setEditModalShow(false)}
        handleSave={handleSaveEdit}
        formData={editData}
        setFormData={setEditData}
        fields={employeeFields}
        title="Edit Employee"
      />
    </div>
  );
};

export default ManageEmployee;

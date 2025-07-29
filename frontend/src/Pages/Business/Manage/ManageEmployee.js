import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AddEmployeeModal from "../../../components/Modal/AddEmployeeModal";
import UniversalEditModal from "../../../components/Modal/UniversalEditModal";
import Image_default from "../../../Assets/Images/Default.png";
import { useParams } from "react-router-dom";
import { useEmployee } from "../../../context/EmployeeContext";
import { EmployeeImageEditor } from "../../../Utils/Image/EditImage";
import { useUser } from "../../../context/userContext";
import ManageTagsModal from "../../../components/Modal/ManageTagsModal";

import "../../../Styles/ManageUi.css";
import { useBusiness } from "../../../context/BussinessContext";
import { toast } from "react-toastify";

// Constant array of default categories
const DEFAULT_EMPLOYEE_CATEGORIES = ["Driver", "Technician", "Cleaner"];

const ManageEmployee = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [employeeCategories, setEmployeeCategories] = useState([
    ...DEFAULT_EMPLOYEE_CATEGORIES,
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showTagsModal, setShowTagsModal] = useState(false);

  const [editData, setEditData] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [modalData, setModalData] = useState([]);

  const { user, token, baseUrl } = useUser();
  const { businessId } = useParams();
  const { Employee } = useEmployee();
  const { businesses } = useBusiness();
  const selectedbusiness = businesses.find(
    (b) => String(b.businessId) === businessId
  );

  // Load employee list
  useEffect(() => {
    if (Array.isArray(Employee)) {
      setEmployeeList(Employee);
      setEmployeeCategories(
        selectedbusiness?.employeeFieldsOfWork || [...DEFAULT_EMPLOYEE_CATEGORIES]
      );
    }
  }, [Employee,selectedbusiness?.employeeFieldsOfWork]);

  // Open modals
  const openAddModal = () => {
    setShowAddModal(true);
  };

  const handleEditClick = (emp) => {
    setEditData(emp);
    setShowEditModal(true);
  };

  const openManageModal = (title) => {
    setModalTitle(title);
    setModalData(employeeCategories);
    setShowTagsModal(true);
  };

  const handleSaveTags = async (updatedTags) => {
    const type = "employee";
    try {
      const res = await fetch(
        `${baseUrl}/v2/bussiness/${user?.id}/tags/${selectedbusiness?._id}/${type}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ tags: updatedTags }),
        }
      );

      const data = await res.json();
      if (res.ok) {
                toast.success(data.message)
        
        setEmployeeCategories(data.tags || []);
      } else {
        console.error("Failed to update tags", data?.error);
      }
    } catch (err) {
      console.error("Error updating tags", err);
    }
  };

  const handleSaveEdit = async (updatedData) => {
    try {
      const res = await fetch(
        `${baseUrl}/v2/bussiness/employee/${user?.id}/UpdateEmployee/${updatedData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      const data = await res.json();
      if (res.ok) {
        const updatedList = employeeList.map((emp) =>
          emp._id === data._id ? data : emp
        );
        setEmployeeList(updatedList);
        setShowEditModal(false);
      } else {
        console.error("Failed to update employee", data?.error);
      }
    } catch (err) {
      console.error("Error updating employee", err);
    }
  };

  const { handleImageUpload } = EmployeeImageEditor({
    userId: user?.id,
    token,
    publicId: editData?.profilepic?.publicId,
    baseUrl,
    businessId,
  });

  const handleImageChange = async (file) => {
    const imageUrl = URL.createObjectURL(file);
    setEditData((prevData) => ({
      ...prevData,
      imagePreview: imageUrl,
    }));

    const uploaded = await handleImageUpload(file);
    if (uploaded?.imageUrl && uploaded?.publicId) {
      setEditData((prevData) => ({
        ...prevData,
        profilepic: {
          imageUrl: uploaded.imageUrl,
          publicId: uploaded.publicId,
        },
        imagePreview: uploaded.imageUrl,
      }));
    }
  };
  const handleDelete = (product) => {
    window.confirm(`Are you sure you want to delete "${product.productName}"?`);
  };
  return (
    <div className="container rounded shadow-sm py-3">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-2 mb-md-0 me-auto">Manage Employees</h4>

        <div className="d-flex flex-wrap align-items-center justify-content-center gap-2">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => openManageModal("Employee Categories")}
          >
            <i className="bi bi-pencil-square me-2"></i> Manage Categories
          </button>

          <button className="btn btn-sm btn-success" onClick={openAddModal}>
            <i className="bi bi-plus-circle me-2"></i> Add Employee
          </button>
        </div>
      </div>
      <hr></hr>

      {/* <div className="row g-4">
        {employeeList.map((emp, index) => (
          <div className="col-md-4" key={index}>
            <div className="card h-100 shadow-sm position-relative">
              <button
                className="btn btn-sm btn-outline-primary position-absolute top-0 end-0 m-2"
                title="Edit Employee"
                onClick={() => handleEditClick(emp)}
              >
                <i className="bi bi-pencil-square"></i>
              </button>

              <div className="card-body d-flex flex-column align-items-center text-center">
                <img
                  src={emp.profilepic?.imageUrl || Image_default}
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
                <p className="small text-muted mb-2">
                  Employee ID: {emp.employeeId}
                </p>
                <div className="w-100 border-top pt-2">
                  <p className="mb-1">
                    <strong>Age:</strong> {emp.Age}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div> */}
      <div className="row g-4">
        {employeeList.map((emp, index) => (
          <div
            className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3"
            key={index}
          >
            <div className="card manage-cards h-100 shadow-sm border-2 rounded-4 text-center p-3 d-flex flex-column">
              <div className="justify-content-center">
                <img
                  src={emp.profilepic?.imageUrl || Image_default}
                  alt={emp.name}
                  className="img-fluid rounded-circle mb-3"
                  style={{
                    height: "130px",
                    objectFit: "cover",
                    width: "130px",
                  }}
                />
              </div>
              <hr />

              <h6 className="fw-bold mb-2">{emp.name}</h6>

              <h6 className="text-success fw-semibold mb-2">
                ID: {emp.employeeId || "N/A"}
              </h6>

              <div className="d-flex justify-content-center gap-2 mb-3">
                <span className="badge bg-warning text-dark">
                  {emp.field || "No Field"}
                </span>
              </div>

              <div className="d-flex justify-content-center gap-2 mb-3">
                <span className="small text-muted">
                  <strong>Age:</strong> {emp.Age || "N/A"}
                </span>
              </div>

              {/* Buttons at the bottom */}
              <div className="d-flex justify-content-center gap-2 mt-auto">
                <button
                  className="btn btn-outline-primary btn-sm rounded-pill"
                  onClick={() => handleEditClick(emp)}
                  title="Edit"
                >
                  <i className="bi bi-pencil-fill"></i>
                </button>
                <button
                  className="btn btn-outline-danger btn-sm rounded-pill"
                  onClick={() => handleDelete(emp)}
                  title="Delete"
                >
                  <i className="bi bi-trash-fill"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      <AddEmployeeModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
      />

      {/* Edit Modal */}
      <UniversalEditModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        handleSave={handleSaveEdit}
        formData={editData || {}}
        setFormData={setEditData}
        title="Edit Employee"
        fields={[
          { label: "Name", name: "name" },
          {
            label: "Employee ID",
            name: "employeeId",
            type: "text",
            disabled: true,
          },
          { label: "Contact", name: "contact" },
          { label: "Salary", name: "salary", type: "number" },
          {
            label: "Field of Work",
            name: "workField",
            type: "select",
            options: employeeCategories,
          },
          { label: "ID Proof Type", name: "idProof" },
          { label: "ID Number", name: "idNumber" },
          { label: "Date of Birth", name: "dateOfBirth", type: "date" },
          { label: "Date of Joining", name: "dateOfJoining", type: "date" },
          { label: "Address Line 1", name: "addressLine1" },
          { label: "Address Line 2", name: "addressLine2" },
          { label: "City", name: "city" },
          { label: "District", name: "district" },
          { label: "Pincode", name: "pincode", type: "number" },
        ]}
        includeImage={true}
        onImageChange={handleImageChange}
      />

      {/* Tag Edit Modal */}
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

export default ManageEmployee;

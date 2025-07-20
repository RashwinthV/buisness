import { useNavigate, useLocation, useParams } from "react-router-dom";
import Image_default from "../../../Assets/Images/Default.png";

const ManageEmployee = () => {
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
    <div className="container py-2">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Employees</h4>
        <button
          className="btn btn-success" onClick={openAddModal}
        >
          + Add Employee
        </button>
      </div>

      <div className="row g-4">
        {employeeList.map((emp, index) => (
          <div className="col-md-4" key={index}>
            <div className="card h-100 shadow-sm position-relative">
              <button
                className="btn btn-sm btn-outline-primary position-absolute top-0 end-0 m-2"
                onClick={() => alert(`Edit ${emp.name}`)}
              >
                <i className="bi bi-pencil-square"></i>
              </button>

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

export default ManageEmployee;

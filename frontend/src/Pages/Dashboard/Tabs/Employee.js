import "bootstrap/dist/css/bootstrap.min.css";
import Image_default from "../../../Assets/Images/Default.png";
import { useEmployee } from "../../../context/EmployeeContext";
import { useEffect, useState } from "react";
const Employee = () => {
  const { Employee } = useEmployee();

const [employeeList, setemployeeList] = useState([]);
  useEffect(() => {
    if (Employee && Array.isArray(Employee)) {
      setemployeeList(Employee);
    }
  }, [Employee]);

  return (
    <div className="container py-2">
      <h4 className="mb-4 text-center">Employees</h4>
      <div className="row g-4">
        {employeeList.map((emp, index) => (
          <div className="col-md-4" key={index}>
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <img
                  src={emp.profilepic?.imageUrl}
                  alt={emp.name}
                  className="rounded-circle mb-3"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <h5 className="card-title">{emp.name}</h5>
                <p className="card-text">
                  <strong>Emp ID:</strong> {emp.employeeId} <br />
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

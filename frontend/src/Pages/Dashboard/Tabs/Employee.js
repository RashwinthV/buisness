import "bootstrap/dist/css/bootstrap.min.css";
import Image_default from "../../../Assets/Images/Default.png";
import { useEmployee } from "../../../context/EmployeeContext";
import { useEffect, useState } from "react";
import '../../../Styles/ManageUi.css'

const Employee = () => {
  const { Employee } = useEmployee();

const [employeeList, setemployeeList] = useState([]);
  useEffect(() => {
    if (Employee && Array.isArray(Employee)) {
      setemployeeList(Employee);
    }
  }, [Employee]);

  return (
    <div className="container">
      <h4 className="mb-2 text-center">Employees</h4>

<hr></hr>
      <div className="row mt-2 g-4">
  {employeeList.map((emp, index) => (
    <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3" key={index}>
      <div className="card manage-cards h-100 shadow-sm border-2 rounded-4 text-center p-3 d-flex flex-column">
        <div className="justify-content-center">
        <img
          src={emp.profilepic?.imageUrl || Image_default}
          alt={emp.name}
          className="rounded-circle mb-3"
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
          }}
        /> </div>

        <hr />

        <h6 className="fw-bold mb-2">{emp.name}</h6>

        <div className="small text-muted mb-3">
          <p className="mb-1"><strong>Emp ID:</strong> {emp.employeeId || "N/A"}</p>
          <p className="mb-1"><strong>Age:</strong> {emp.age || "N/A"}</p>
          <p className="mb-0"><strong>Field of Work:</strong> {emp.field || "N/A"}</p>
        </div>



      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default Employee;

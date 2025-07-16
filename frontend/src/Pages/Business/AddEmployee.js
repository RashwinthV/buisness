// import { useState } from "react";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// function AddEmployee() {
//   const navigate = useNavigate();
//   const baseUrl = process.env.REACT_APP_BACKEND_URI;

//   const [formData, setFormData] = useState({
//     name: "",
//     contact: "",
//     workField: "",
//     dob: "",
//     doj: "",
//     addressLine1: "",
//     addressLine2: "",
//     city: "",
//     district: "",
//     zipCode: "",
//     idProof: "",
//     idNumber: "",
//     photo: null,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     if (type === "file") {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: files[0],
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Required field validation
//     const requiredFields = [
//       "name",
//       "contact",
//       "workField",
//       "dob",
//       "doj",
//       "salary",
//       "addressLine1",
//       "city",
//       "district",
//       "zipCode",
//       "idProof",
//       "idNumber",
//     ];

//     for (const field of requiredFields) {
//       if (!formData[field]) {
//         toast.warning(`Please fill the ${field} field.`);
//         return;
//       }
//     }

//     // If driver, driving license is mandatory
//     if (
//       formData.workField === "driver" &&
//       formData.idProof !== "driving_license"
//     ) {
//       toast.error("For Drivers the ID proof must be thier Driving License.");
//       return;
//     }

//     const employeeData = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       if (value) employeeData.append(key, value);
//     });

//     try {
//       const res = await fetch(`${baseUrl}/v1/employees/add`, {
//         method: "POST",
//         body: employeeData,
//       });

//       const result = await res.json();

//       if (res.ok) {
//         toast.success("Employee added successfully!");
//         navigate("/employees");
//       } else {
//         toast.error(result.message || "Failed to add employee.");
//       }
//     } catch (err) {
//       console.error("Error adding employee:", err);
//       toast.error("Server error. Try again later.");
//     }
//   };

//   return (
//     <div className="container my-5">
//       <div className="row justify-content-center">
//         <div className="col-12 col-md-8 col-lg-6">
//           <div className="card shadow-sm">
//             <div className="card-body">
//               <h4 className="text-center mb-4">Add Employee</h4>

//               <form onSubmit={handleSubmit} encType="multipart/form-data">
//                 <div className="row">
//                   <div className="mb-3 col-md-6">
//                     <label className="form-label">
//                       Name <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="mb-3 col-md-6">
//                     <label className="form-label">
//                       Contact <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       type="tel"
//                       className="form-control"
//                       name="contact"
//                       value={formData.contact}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="row">
//                   <div className="mb-3 col-md-6">
//                     <label className="form-label">
//                       Field of Work <span className="text-danger">*</span>
//                     </label>
//                     <select
//                       className="form-select"
//                       name="workField"
//                       value={formData.workField}
//                       onChange={handleChange}
//                       required
//                     >
//                       <option value="">Choose</option>
//                       <option value="driver">Driver</option>
//                       <option value="factory_worker">Factory Worker</option>
//                       <option value="others">Others</option>
//                     </select>
//                   </div>
//                   <div className="mb-3 col-md-6">
//                     <label className="form-label">
//                       DOB <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       type="date"
//                       className="form-control"
//                       name="dob"
//                       value={formData.dob}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="row">
//                   <div className="mb-3 col-md-6">
//                     <label className="form-label">
//                       Date of Joining (DOJ){" "}
//                       <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       type="date"
//                       className="form-control"
//                       name="doj"
//                       value={formData.doj}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                                     <div className="mb-3 col-md-6">
//                     <label className="form-label">
//                       Salary
//                       <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       type="number"
//                       className="form-control"
//                       name="salary"
//                       value={formData.salary}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="row">
//                   <div className="mb-3 col-md-6">
//                     <label className="form-label">
//                       Address Line 1 <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="addressLine1"
//                       value={formData.addressLine1}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="mb-3 col-md-6">
//                     <label className="form-label">Address Line 2</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="addressLine2"
//                       value={formData.addressLine2}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>

//                 <div className="row">
//                   <div className="mb-3 col-md-4">
//                     <label className="form-label">
//                       City <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="city"
//                       value={formData.city}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="mb-3 col-md-4">
//                     <label className="form-label">
//                       District <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="district"
//                       value={formData.district}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="mb-3 col-md-4">
//                     <label className="form-label">
//                       Zip Code <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="zipCode"
//                       value={formData.zipCode}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="row">
//                   <div className="mb-3 col-md-6">
//                     <label className="form-label">
//                       ID Proof <span className="text-danger">*</span>
//                     </label>
//                     <select
//                       className="form-select"
//                       name="idProof"
//                       value={formData.idProof}
//                       onChange={handleChange}
//                       required
//                     >
//                       <option value="">Select Proof</option>
//                       <option value="aadhar">Aadhar</option>
//                       <option value="voter_id">Voter ID</option>
//                       <option value="pan">PAN</option>
//                       <option value="passport">Passport</option>
//                       <option value="driving_license">Driving License</option>
//                     </select>
//                   </div>

//                   <div className="mb-3 col-md-6">
//                     <label className="form-label">
//                       ID Number <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="idNumber"
//                       value={formData.idNumber}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="mb-3">
//                   <label className="form-label">Photo (Optional)</label>
//                   <input
//                     type="file"
//                     className="form-control"
//                     name="photo"
//                     accept="image/*"
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <button type="submit" className="btn btn-success w-100">
//                   Add Employee
//                 </button>
//               </form>


//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddEmployee;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Image_default from "../../Assets/Images/Default.png"; // Replace with your actual image path

const AddEmployee = () => {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BACKEND_URI;

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    workField: "",
    dob: "",
    doj: "",
    salary: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    district: "",
    zipCode: "",
    idProof: "",
    idNumber: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    const requiredFields = [
      "name", "contact", "workField", "dob", "doj", "salary",
      "addressLine1", "city", "district", "zipCode", "idProof", "idNumber",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.warning(`Please fill the ${field} field.`);
        return;
      }
    }

    if (
      formData.workField === "driver" &&
      formData.idProof !== "driving_license"
    ) {
      toast.error("For Drivers, the ID proof must be their Driving License.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      const res = await fetch(`${baseUrl}/v1/employees/add`, {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      if (res.ok) {
        toast.success("Employee added successfully!");
        navigate("/employees");
      } else {
        toast.error(result.message || "Failed to add employee.");
      }
    } catch (err) {
      toast.error("Server error. Try again later.");
    }
  };

  return (
    <div className="container py-4">
      <h4 className="mb-4 text-center">Add New Employee</h4>

      <div className="row mb-4 justify-content-center">
        <div className="col-12 text-center mb-3">
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              overflow: "hidden",
              margin: "0 auto",
              border: "2px solid #ddd",
            }}
          >
            <img
              src={
                formData.photo
                  ? URL.createObjectURL(formData.photo)
                  : Image_default
              }
              alt="Employee"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => (e.target.src = Image_default)}
            />
          </div>

          <div className="mt-2">
            <input
              type="file"
              accept="image/*"
              className="form-control form-control-sm w-50 mx-auto"
              name="photo"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
<h6 className="text-danger">Personal Details</h6>
      <div className="row gy-3">
        <div className="col-md-4">
          <label>Name *</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label>Contact *</label>
          <input
            type="tel"
            name="contact"
            className="form-control"
            value={formData.contact}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4">
          <label>Date of Birth *</label>
          <input
            type="date"
            name="dob"
            className="form-control"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>

                <div className="col-md-4">
          <label>Address Line 1 *</label>
          <input
            type="text"
            name="addressLine1"
            className="form-control"
            value={formData.addressLine1}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label>Address Line 2</label>
          <input
            type="text"
            name="addressLine2"
            className="form-control"
            value={formData.addressLine2}
            onChange={handleChange}
          />
        </div>
                <div className="col-md-4">
          <label>City *</label>
          <input
            type="text"
            name="city"
            className="form-control"
            value={formData.city}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label>District *</label>
          <input
            type="text"
            name="district"
            className="form-control"
            value={formData.district}
            onChange={handleChange}
          />
        </div>
        
        <div className="col-md-4">
          <label>Zip Code *</label>
          <input
            type="text"
            name="zipCode"
            className="form-control"
            value={formData.zipCode}
            onChange={handleChange}
          />
        </div>
        <hr className="mt-5"></hr>
        <h6 className="text-danger">Work Details</h6>
        <div className="col-md-4">
          <label>Date of Joining *</label>
          <input
            type="date"
            name="doj"
            className="form-control"
            value={formData.doj}
            onChange={handleChange}
          />
        </div>

                <div className="col-md-4">
          <label>Field of Work *</label>
          <select
            className="form-select"
            name="workField"
            value={formData.workField}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="driver">Driver</option>
            <option value="factory_worker">Factory Worker</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div className="col-md-4">
          <label>Salary *</label>
          <input
            type="number"
            name="salary"
            className="form-control"
            value={formData.salary}
            onChange={handleChange}
          />
        </div>





        <div className="col-md-4">
          <label>ID Proof *</label>
          <select
            className="form-select"
            name="idProof"
            value={formData.idProof}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="aadhar">Aadhar</option>
            <option value="voter_id">Voter ID</option>
            <option value="pan">PAN</option>
            <option value="passport">Passport</option>
            <option value="driving_license">Driving License</option>
          </select>
        </div>
        <div className="col-md-4">
          <label>ID Number *</label>
          <input
            type="text"
            name="idNumber"
            className="form-control"
            value={formData.idNumber}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="text-end mt-4">
        <button className="btn btn-success" onClick={handleSubmit}>
          Add Employee
        </button>
      </div>
    </div>
  );
};

export default AddEmployee;

import { useState } from "react";
import { toast } from "react-toastify";
import Image_default from "../../Assets/Images/Default.png";
import moment from "moment";
import { Modal, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { userImageUpload } from "../../Utils/Image/ImageUploader";
import { useUser } from "../../context/userContext";
import { useBusiness } from "../../context/BussinessContext";

const AddEmployeeModal = ({ show, handleClose }) => {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BACKEND_URI;
  const { token, user } = useUser();
  const { businesses } = useBusiness();
  const userId = user?.id;
  const { businessId } = useParams();
  const selectedBusiness = businesses.find(
    (b) => String(b.businessId) === businessId
  );


  const [imageData, setImageData] = useState({ imageUrl: "", publicId: "" });
  //test ok
  const { handleImageUpload } = userImageUpload({
    userId,
    token,
    publicId: imageData.publicId,
    setImageData,
    baseUrl,
  });

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    workField: "",
    dob: moment().format("YYYY-MM-DD"),
    doj: moment().format("YYYY-MM-DD"),
    salary: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    district: "",
    state: "",
    country: "",
    zipCode: "",
    idProof: "",
    idNumber: "",
    photo: null, // raw file for preview
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file" && name === "photo") {
      const file = files[0];
      if (file) {
        setFormData((prev) => ({ ...prev, photo: file }));
        handleImageUpload(file);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

const handleSubmit = async () => {
  const requiredFields = [
    "name",
    "contact",
    "workField",
    "dob",
    "doj",
    "salary",
    "addressLine1",
    "city",
    "district",
    "zipCode",
    "idProof",
    "idNumber",
  ];

  // Validate required fields
  for (const field of requiredFields) {
    if (!formData[field]) {
      toast.warning(`Please fill the ${field} field.`);
      return;
    }
  }

  // Extra validation for driver
  if (
    formData.workField === "driver" &&
    formData.idProof !== "driving_license"
  ) {
    toast.error("For Drivers, the ID proof must be their Driving License.");
    return;
  }

  // Map frontend keys to backend keys
  const fieldMappings = {
    dob: "dateOfBirth",
    doj: "dateOfJoining",
    workField: "fieldOfWork",
    zipCode: "pincode",
  };

  // Build plain JSON object
  const data = {};

  Object.entries(formData).forEach(([key, value]) => {
    if (
      key !== "photo" &&
      value !== undefined &&
      value !== null &&
      value !== ""
    ) {
      const backendKey = fieldMappings[key] || key;
      data[backendKey] = value;
    }
  });

  // Attach image info from Cloudinary
  if (imageData.imageUrl) {
    data.profilepic = {
      imageUrl: imageData.imageUrl,
      publicId: imageData.publicId,
    };
  }

  // Attach business ID
  data.businessId = selectedBusiness?._id;



  try {
    const res = await fetch(
      `${baseUrl}/v2/bussiness/employee/registeremployee/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // 🛠️ Required for JSON POST
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data), // 👈 Now this is valid
      }
    );

    const result = await res.json();
    if (res.ok) {
      toast.success("Employee added successfully!");
      handleClose();
      navigate("/employees");
    } else {
      toast.error(result.message || "Failed to add employee.");
    }
  } catch (err) {
    toast.error("Server error. Try again later.");
    console.error("Submission error:", err);
  }
};

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="xl"
      centered
      scrollable
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Add New Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
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
                      : imageData.imageUrl || Image_default
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
            {/* Personal Fields */}
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
              <label>State *</label>
              <input
                type="text"
                name="state"
                className="form-control"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label>Country *</label>
              <input
                type="text"
                name="country"
                className="form-control"
                value={formData.country}
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

            <hr className="mt-5" />
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
<option value="machine_operator">Machine Operator</option>
<option value="supervisor">Supervisor</option>
<option value="technician">Technician</option>
<option value="warehouse_staff">Warehouse Staff</option>
<option value="quality_inspector">Quality Inspector</option>
<option value="maintenance_staff">Maintenance Staff</option>
<option value="packer">Packer</option>
<option value="security_guard">Security Guard</option>
<option value="cashier">Cashier</option>
<option value="admin_staff">Admin Staff</option>
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
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Add Employee
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEmployeeModal;

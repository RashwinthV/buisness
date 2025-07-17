// import React, { useState } from "react";
// import { Container, Row, Col, Button } from "react-bootstrap";
// import Image_default from "../Assets/Images/Default.png";

// const Profile = () => {
//   const [editMode, setEditMode] = useState(false);
//   const [showPasswordFields, setShowPasswordFields] = useState(false);

//   const [user, setUser] = useState({
//     image: "",
//     name: "",
//     email: "",
//     mobile: "",
//     address1: "",
//     address2: "",
//     city: "",
//     district: "",
//     pincode: "",
//   });

//   const [passwords, setPasswords] = useState({
//     current: "",
//     newPass: "",
//     confirmNew: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUser((prev) => ({ ...prev, [name]: value }));
//   };

//   const handlePasswordChange = (e) => {
//     const { name, value } = e.target;
//     setPasswords((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setUser((prev) => ({
//         ...prev,
//         image: reader.result,
//       }));
//     };
//     reader.readAsDataURL(file);
//   };

//   return (
//     <Container className="py-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h4 className="mb-0">Profile</h4>
//         <Button variant="outline-secondary" size="sm" onClick={() => setEditMode(!editMode)}>
//           {editMode ? "Cancel" : <i className="bi bi-pencil-square"></i>}
//         </Button>
//       </div>

//       <Row className="mb-4">
//         <Col xs={12} md={4} className="text-center mb-3">
//           <div
//             style={{
//               width: "120px",
//               height: "120px",
//               borderRadius: "50%",
//               overflow: "hidden",
//               margin: "0 auto",
//               border: "2px solid #ddd",
//             }}
//           >
//             <img
//               src={user.image || Image_default}
//               alt="User"
//               style={{ width: "100%", height: "100%", objectFit: "cover" }}
//               onError={(e) => (e.target.src = Image_default)}
//             />
//           </div>

//           {editMode && (
//             <div className="mt-2">
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="form-control form-control-sm"
//                 onChange={handleImageChange}
//               />
//             </div>
//           )}
//         </Col>

//         <Col xs={12} md={8}>
//           <Row className="gy-3">
//             {[
//               ["name", "Name"],
//               ["email", "Email"],
//               ["mobile", "Mobile Number"],
//               ["address1", "Address Line 1"],
//               ["address2", "Address Line 2"],
//               ["city", "City"],
//               ["district", "District"],
//               ["pincode", "Pincode"],
//             ].map(([field, label]) => (
//               <Col md={field === "address1" || field === "address2" ? 12 : 4} key={field}>
//                 <label>{label}
                  
//                 </label>
//                 {editMode ? (
//                   <input
//                     className="form-control"
//                     name={field}
//                     value={user[field]}
//                     onChange={handleInputChange}
//                     placeholder={`Enter ${label.toLowerCase()}`}
//                   />
//                 ) : (
//                   <div>{user[field] || "-"}</div>
//                 )}
//               </Col>
//             ))}
//           </Row>
//         </Col>
//       </Row>

//       {editMode && (
//         <div className="text-end mb-4">
//           <Button variant="primary" onClick={() => setEditMode(false)}>
//             Update
//           </Button>
//         </div>
//       )}

//       {/* Password Update Section */}
//       <hr />
//       <div className="mb-3">
//         <h5>Change Password</h5>
//         {!showPasswordFields ? (
//           <Button variant="outline-primary" onClick={() => setShowPasswordFields(true)}>
//             Change Password
//           </Button>
//         ) : (
//           <Row className="gy-3">
//             <Col md={4}>
//               <label>Current Password</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 name="current"
//                 value={passwords.current}
//                 onChange={handlePasswordChange}
//                 placeholder="Enter current password"
//               />
//             </Col>
//             <Col md={4}>
//               <label>New Password</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 name="newPass"
//                 value={passwords.newPass}
//                 onChange={handlePasswordChange}
//                 placeholder="Enter new password"
//               />
//             </Col>
//             <Col md={4}>
//               <label>Confirm New Password</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 name="confirmNew"
//                 value={passwords.confirmNew}
//                 onChange={handlePasswordChange}
//                 placeholder="Confirm new password"
//               />
//             </Col>
//             <Col xs={12} className="text-end">
//               <Button variant="success" className="me-2">
//                 Update Password
//               </Button>
//               <Button
//                 variant="outline-secondary"
//                 onClick={() => {
//                   setShowPasswordFields(false);
//                   setPasswords({ current: "", newPass: "", confirmNew: "" });
//                 }}
//               >
//                 Cancel
//               </Button>
//             </Col>
//           </Row>
//         )}
//       </div>
//     </Container>
//   );
// };

// export default Profile;
import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Image_default from "../Assets/Images/Default.png";
import {
  useVerificationStatus,
  getVerificationStatus,
  VerificationModal,
} from "../Utils/VerifyStatus";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // 'email' or 'phone'
  const [modalValue, setModalValue] = useState("");

  const userId = "user_123"; // 🔁 Replace with actual user ID from auth context

  const [user, setUser] = useState({
    image: "",
    name: "",
    email: "user@example.com",
    mobile: "9876543210",
    address1: "",
    address2: "",
    city: "",
    district: "",
    pincode: "",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirmNew: "",
  });

  const status = useVerificationStatus(userId);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setUser((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleVerifyClick = (type, value) => {
    setModalType(type);
    setModalValue(value);
    setShowModal(true);
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Profile</h4>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? "Cancel" : <i className="bi bi-pencil-square"></i>}
        </Button>
      </div>

      <Row className="mb-4">
        <Col xs={12} md={4} className="text-center mb-3">
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
              src={user.image || Image_default}
              alt="User"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => (e.target.src = Image_default)}
            />
          </div>

          {editMode && (
            <div className="mt-2">
              <input
                type="file"
                accept="image/*"
                className="form-control form-control-sm"
                onChange={handleImageChange}
              />
            </div>
          )}
        </Col>

        <Col xs={12} md={8}>
          <Row className="gy-3">
            {[
              ["name", "Name"],
              ["email", "Email"],
              ["mobile", "Mobile Number"],
              ["address1", "Address Line 1"],
              ["address2", "Address Line 2"],
              ["city", "City"],
              ["district", "District"],
              ["pincode", "Pincode"],
            ].map(([field, label]) => (
              <Col
                md={field === "address1" || field === "address2" ? 12 : 4}
                key={field}
              >
                <label className="form-label">
                  {label}{" "}
                  {field === "email" &&
                    getVerificationStatus(
                      status.emailVerified,
                      "email",
                      () => handleVerifyClick("email", user.email)
                    )}
                  {field === "mobile" &&
                    getVerificationStatus(
                      status.numberVerified,
                      "phone",
                      () => handleVerifyClick("phone", user.mobile)
                    )}
                </label>
                {editMode ? (
                  <input
                    className="form-control"
                    name={field}
                    value={user[field]}
                    onChange={handleInputChange}
                    placeholder={`Enter ${label.toLowerCase()}`}
                  />
                ) : (
                  <div>{user[field] || "-"}</div>
                )}
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {editMode && (
        <div className="text-end mb-4">
          <Button variant="primary" onClick={() => setEditMode(false)}>
            Update
          </Button>
        </div>
      )}

      {/* Password Update Section */}
      <hr />
      <div className="mb-3">
        <h5>Change Password</h5>
        {!showPasswordFields ? (
          <Button
            variant="outline-primary"
            onClick={() => setShowPasswordFields(true)}
          >
            Change Password
          </Button>
        ) : (
          <Row className="gy-3">
            <Col md={4}>
              <label>Current Password</label>
              <input
                type="password"
                className="form-control"
                name="current"
                value={passwords.current}
                onChange={handlePasswordChange}
                placeholder="Enter current password"
              />
            </Col>
            <Col md={4}>
              <label>New Password</label>
              <input
                type="password"
                className="form-control"
                name="newPass"
                value={passwords.newPass}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
              />
            </Col>
            <Col md={4}>
              <label>Confirm New Password</label>
              <input
                type="password"
                className="form-control"
                name="confirmNew"
                value={passwords.confirmNew}
                onChange={handlePasswordChange}
                placeholder="Confirm new password"
              />
            </Col>
            <Col xs={12} className="text-end">
              <Button variant="success" className="me-2">
                Update Password
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => {
                  setShowPasswordFields(false);
                  setPasswords({
                    current: "",
                    newPass: "",
                    confirmNew: "",
                  });
                }}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        )}
      </div>

      {/* ✅ Verification Modal */}
      <VerificationModal
        show={showModal}
        onHide={() => setShowModal(false)}
        type={modalType}
        value={modalValue}
        onVerify={() => window.location.reload()}
      />
    </Container>
  );
};

export default Profile;

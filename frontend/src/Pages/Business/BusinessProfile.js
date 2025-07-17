import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Image_default from "../../Assets/Images/Default.png"; // Replace with your actual image path
import { getVerificationStatus, VerificationModal } from '../../Utils/VerifyStatus.js'; // adjust path

// const BusinessProfile = () => {
//   const currentUserId = "user123"; // Replace with auth context or prop

//   const [editMode, setEditMode] = useState(false);

//   const [business, setBusiness] = useState({
//     ownerId: "user123", // From DB per business
//     logo: "",
//     startedOn: "",
//     name: "",
//     email: "",
//     description: "",
//     address1: "",
//     address2: "",
//     city: "",
//     district: "",
//     pincode: "",
//     mapLink: "",
//     contactOwner: "",
//     contactOffice: "",
//     gst: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setBusiness((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleLogoChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setBusiness((prev) => ({
//         ...prev,
//         logo: reader.result,
//       }));
//     };
//     reader.readAsDataURL(file);
//   };

//   return (
//     <Container className="py-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h4 className="mb-0">Business Profile</h4>
//         {currentUserId === business.ownerId && (
//           <Button variant="outline-secondary" size="sm" onClick={() => setEditMode(!editMode)}>
//             {editMode ? "Cancel" : <i className="bi bi-pencil-square"></i>}
//           </Button>
//         )}
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
//               src={business.logo || Image_default}
//               alt="Business Logo"
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
//                 onChange={handleLogoChange}
//               />
//             </div>
//           )}
//         </Col>

//         <Col xs={12} md={8}>
//           <Row className="gy-3">
//             <Col md={6}>
//               <label>Started On</label>
//               {editMode ? (
//                 <input
//                   type="date"
//                   className="form-control"
//                   name="startedOn"
//                   value={business.startedOn}
//                   onChange={handleInputChange}
//                 />
//               ) : (
//                 <div>{business.startedOn || "-"}</div>
//               )}
//             </Col>

//             <Col md={6}>
//               <label>Name</label>
//               {editMode ? (
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="name"
//                   value={business.name}
//                   onChange={handleInputChange}
//                   placeholder="Business Name"
//                 />
//               ) : (
//                 <div>{business.name || "-"}</div>
//               )}
//             </Col>

//             <Col md={6}>
//               <label>Email</label>
//               {editMode ? (
//                 <input
//                   type="email"
//                   className="form-control"
//                   name="email"
//                   value={business.email}
//                   onChange={handleInputChange}
//                   placeholder="Email"
//                 />
//               ) : (
//                 <div>{business.email || "-"}</div>
//               )}
//             </Col>

//             <Col md={12}>
//               <label>Description</label>
//               {editMode ? (
//                 <textarea
//                   className="form-control"
//                   name="description"
//                   rows={3}
//                   value={business.description}
//                   onChange={handleInputChange}
//                   placeholder="Business description"
//                 />
//               ) : (
//                 <div>{business.description || "-"}</div>
//               )}
//             </Col>

//             <Col md={12}>
//               <label>Address Line 1</label>
//               {editMode ? (
//                 <input
//                   className="form-control"
//                   name="address1"
//                   value={business.address1}
//                   onChange={handleInputChange}
//                 />
//               ) : (
//                 <div>{business.address1 || "-"}</div>
//               )}
//             </Col>

//             <Col md={12}>
//               <label>Address Line 2</label>
//               {editMode ? (
//                 <input
//                   className="form-control"
//                   name="address2"
//                   value={business.address2}
//                   onChange={handleInputChange}
//                 />
//               ) : (
//                 <div>{business.address2 || "-"}</div>
//               )}
//             </Col>

//             <Col md={4}>
//               <label>City</label>
//               {editMode ? (
//                 <input
//                   className="form-control"
//                   name="city"
//                   value={business.city}
//                   onChange={handleInputChange}
//                 />
//               ) : (
//                 <div>{business.city || "-"}</div>
//               )}
//             </Col>

//             <Col md={4}>
//               <label>District</label>
//               {editMode ? (
//                 <input
//                   className="form-control"
//                   name="district"
//                   value={business.district}
//                   onChange={handleInputChange}
//                 />
//               ) : (
//                 <div>{business.district || "-"}</div>
//               )}
//             </Col>

//             <Col md={4}>
//               <label>Pincode</label>
//               {editMode ? (
//                 <input
//                   className="form-control"
//                   name="pincode"
//                   value={business.pincode}
//                   onChange={handleInputChange}
//                 />
//               ) : (
//                 <div>{business.pincode || "-"}</div>
//               )}
//             </Col>

//             <Col md={12}>
//               <label>Google Map Link</label>
//               {editMode ? (
//                 <input
//                   type="url"
//                   className="form-control"
//                   name="mapLink"
//                   value={business.mapLink}
//                   onChange={handleInputChange}
//                   placeholder="Google Maps URL"
//                 />
//               ) : (
//                 business.mapLink ? (
//                   <a href={business.mapLink} target="_blank" rel="noreferrer">
//                     {business.mapLink}
//                   </a>
//                 ) : (
//                   <div>-</div>
//                 )
//               )}
//             </Col>

//             <Col md={6}>
//               <label>Contact (Owner)</label>
//               {editMode ? (
//                 <input
//                   className="form-control"
//                   name="contactOwner"
//                   value={business.contactOwner}
//                   onChange={handleInputChange}
//                 />
//               ) : (
//                 <div>{business.contactOwner || "-"}</div>
//               )}
//             </Col>

//             <Col md={6}>
//               <label>Contact (Office)</label>
//               {editMode ? (
//                 <input
//                   className="form-control"
//                   name="contactOffice"
//                   value={business.contactOffice}
//                   onChange={handleInputChange}
//                 />
//               ) : (
//                 <div>{business.contactOffice || "-"}</div>
//               )}
//             </Col>

//             <Col md={6}>
//               <label>GST Number</label>
//               {editMode ? (
//                 <input
//                   className="form-control"
//                   name="gst"
//                   value={business.gst}
//                   onChange={handleInputChange}
//                 />
//               ) : (
//                 <div>{business.gst || "-"}</div>
//               )}
//             </Col>
//           </Row>
//         </Col>
//       </Row>

//       {editMode && (
//         <div className="text-end">
//           <Button variant="primary" onClick={() => setEditMode(false)}>
//             Update
//           </Button>
//         </div>
//       )}
//     </Container>
//   );
// };

// export default BusinessProfile;
// const BusinessProfile = () => {
//   const currentUserId = "user123";

//   const [editMode, setEditMode] = useState(false);

//   const [business, setBusiness] = useState({
//     ownerId: "user123",
//     logo: "",
//     startedOn: "",
//     name: "",
//     email: "",
//     emailVerified: false,
//     description: "",
//     address1: "",
//     address2: "",
//     city: "",
//     district: "",
//     pincode: "",
//     mapLink: "",
//     contactOwner: "",
//     numberVerified: false,
//     contactOffice: "",
//     gst: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setBusiness((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleLogoChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setBusiness((prev) => ({
//         ...prev,
//         logo: reader.result,
//       }));
//     };
//     reader.readAsDataURL(file);
//   };

//   return (
//     <Container className="py-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h4 className="mb-0">Business Profile</h4>
//         {currentUserId === business.ownerId && (
//           <Button
//             variant="outline-secondary"
//             size="sm"
//             onClick={() => setEditMode(!editMode)}
//           >
//             {editMode ? "Cancel" : <i className="bi bi-pencil-square"></i>}
//           </Button>
//         )}
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
//               src={business.logo || Image_default}
//               alt="Business Logo"
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
//                 onChange={handleLogoChange}
//               />
//             </div>
//           )}
//         </Col>

//         <Col xs={12} md={8}>
//           <Row className="gy-3">
//             <Col md={6}>
//               <label>Started On</label>
//               {editMode ? (
//                 <input
//                   type="date"
//                   className="form-control"
//                   name="startedOn"
//                   value={business.startedOn}
//                   onChange={handleInputChange}
//                 />
//               ) : (
//                 <div>{business.startedOn || "-"}</div>
//               )}
//             </Col>

//             <Col md={6}>
//               <label>Name</label>
//               {editMode ? (
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="name"
//                   value={business.name}
//                   onChange={handleInputChange}
//                   placeholder="Business Name"
//                 />
//               ) : (
//                 <div>{business.name || "-"}</div>
//               )}
//             </Col>

//             <Col md={6}>
//               <label>
//                 Email {getVerificationStatus(business.emailVerified, "email", business.email)}
//               </label>
//               {editMode ? (
//                 <input
//                   type="email"
//                   className="form-control"
//                   name="email"
//                   value={business.email}
//                   onChange={handleInputChange}
//                   placeholder="Email"
//                 />
//               ) : (
//                 <div>{business.email || "-"}</div>
//               )}
//             </Col>

//             <Col md={12}>
//               <label>Description</label>
//               {editMode ? (
//                 <textarea
//                   className="form-control"
//                   name="description"
//                   rows={3}
//                   value={business.description}
//                   onChange={handleInputChange}
//                   placeholder="Business description"
//                 />
//               ) : (
//                 <div>{business.description || "-"}</div>
//               )}
//             </Col>

//             <Col md={12}>
//               <label>Address Line 1</label>
//               {editMode ? (
//                 <input
//                   className="form-control"
//                   name="address1"
//                   value={business.address1}
//                   onChange={handleInputChange}
//                 />
//               ) : (
//                 <div>{business.address1 || "-"}</div>
//               )}
//             </Col>

//             <Col md={12}>
//               <label>Address Line 2</label>
//               {editMode ? (
//                 <input
//                   className="form-control"
//                   name="address2"
//                   value={business.address2}
//                   onChange={handleInputChange}
//                 />
//               ) : (
//                 <div>{business.address2 || "-"}</div>
//               )}
//             </Col>

//             <Col md={4}>
//               <label>City</label>
//               {editMode ? (
//                 <input
//                   className="form-control"
//                   name="city"
//                   value={business.city}
//                   onChange={handleInputChange}
//                 />
//               ) : (
//                 <div>{business.city || "-"}</div>
//               )}
//             </Col>

//             <Col md={4}>
//               <label>District</label>
//               {editMode ? (
//                 <input
//                   className="form-control"
//                   name="district"
//                   value={business.district}
//                   onChange={handleInputChange}
//                 />
//               ) : (
//                 <div>{business.district || "-"}</div>
//               )}
//             </Col>

//             <Col md={4}>
//               <label>Pincode</label>
//               {editMode ? (
//                 <input
//                   className="form-control"
//                   name="pincode"
//                   value={business.pincode}
//                   onChange={handleInputChange}
//                 />
//               ) : (
//                 <div>{business.pincode || "-"}</div>
//               )}
//             </Col>

//             <Col md={12}>
//               <label>Google Map Link</label>
//               {editMode ? (
//                 <input
//                   type="url"
//                   className="form-control"
//                   name="mapLink"
//                   value={business.mapLink}
//                   onChange={handleInputChange}
//                   placeholder="Google Maps URL"
//                 />
//               ) : business.mapLink ? (
//                 <a href={business.mapLink} target="_blank" rel="noreferrer">
//                   {business.mapLink}
//                 </a>
//               ) : (
//                 <div>-</div>
//               )}
//             </Col>

//             <Col md={6}>
//               <label>
//                 Contact (Owner) {getVerificationStatus(business.numberVerified, "phone", business.contactOwner)}
//               </label>
//               {editMode ? (
//                 <input
//                   className="form-control"
//                   name="contactOwner"
//                   value={business.contactOwner}
//                   onChange={handleInputChange}
//                 />
//               ) : (
//                 <div>{business.contactOwner || "-"}</div>
//               )}
//             </Col>

//             <Col md={6}>
//               <label>Contact (Office)</label>
//               {editMode ? (
//                 <input
//                   className="form-control"
//                   name="contactOffice"
//                   value={business.contactOffice}
//                   onChange={handleInputChange}
//                 />
//               ) : (
//                 <div>{business.contactOffice || "-"}</div>
//               )}
//             </Col>

//             <Col md={6}>
//               <label>GST Number</label>
//               {editMode ? (
//                 <input
//                   className="form-control"
//                   name="gst"
//                   value={business.gst}
//                   onChange={handleInputChange}
//                 />
//               ) : (
//                 <div>{business.gst || "-"}</div>
//               )}
//             </Col>
//           </Row>
//         </Col>
//       </Row>

//       {editMode && (
//         <div className="text-end">
//           <Button variant="primary" onClick={() => setEditMode(false)}>
//             Update
//           </Button>
//         </div>
//       )}
//     </Container>
//   );
// };

const BusinessProfile = () => {
  const currentUserId = "user123";

  const [editMode, setEditMode] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verifyType, setVerifyType] = useState("");
  const [verifyValue, setVerifyValue] = useState("");

  const [business, setBusiness] = useState({
    ownerId: "user123",
    logo: "",
    startedOn: "",
    name: "",
    email: "",
    emailVerified: false,
    description: "",
    address1: "",
    address2: "",
    city: "",
    district: "",
    pincode: "",
    mapLink: "",
    contactOwner: "",
    numberVerified: false,
    contactOffice: "",
    gst: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBusiness((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setBusiness((prev) => ({
        ...prev,
        logo: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleOpenVerify = (type, value) => {
    setVerifyType(type);
    setVerifyValue(value);
    setShowVerifyModal(true);
  };

  const handleVerificationSuccess = () => {
    if (verifyType === "email") {
      setBusiness((prev) => ({ ...prev, emailVerified: true }));
    } else if (verifyType === "phone") {
      setBusiness((prev) => ({ ...prev, numberVerified: true }));
    }
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Business Profile</h4>
        {currentUserId === business.ownerId && (
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? "Cancel" : <i className="bi bi-pencil-square"></i>}
          </Button>
        )}
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
              src={business.logo || Image_default}
              alt="Business Logo"
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
                onChange={handleLogoChange}
              />
            </div>
          )}
        </Col>

        <Col xs={12} md={8}>
          <Row className="gy-3">
            <Col md={6}>
              <label>Started On</label>
              {editMode ? (
                <input
                  type="date"
                  className="form-control"
                  name="startedOn"
                  value={business.startedOn}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{business.startedOn || "-"}</div>
              )}
            </Col>

            <Col md={6}>
              <label>Name</label>
              {editMode ? (
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={business.name}
                  onChange={handleInputChange}
                  placeholder="Business Name"
                />
              ) : (
                <div>{business.name || "-"}</div>
              )}
            </Col>

            <Col md={6}>
<label>
  Email{" "}
  {getVerificationStatus(
    business.emailVerified,
    "email",
    () => handleOpenVerify("email", business.email)
  )}
</label>
              {editMode ? (
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={business.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                />
              ) : (
                <div>{business.email || "-"}</div>
              )}
            </Col>

            <Col md={12}>
              <label>Description</label>
              {editMode ? (
                <textarea
                  className="form-control"
                  name="description"
                  rows={3}
                  value={business.description}
                  onChange={handleInputChange}
                  placeholder="Business description"
                />
              ) : (
                <div>{business.description || "-"}</div>
              )}
            </Col>

            <Col md={12}>
              <label>Address Line 1</label>
              {editMode ? (
                <input
                  className="form-control"
                  name="address1"
                  value={business.address1}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{business.address1 || "-"}</div>
              )}
            </Col>

            <Col md={12}>
              <label>Address Line 2</label>
              {editMode ? (
                <input
                  className="form-control"
                  name="address2"
                  value={business.address2}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{business.address2 || "-"}</div>
              )}
            </Col>

            <Col md={4}>
              <label>City</label>
              {editMode ? (
                <input
                  className="form-control"
                  name="city"
                  value={business.city}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{business.city || "-"}</div>
              )}
            </Col>

            <Col md={4}>
              <label>District</label>
              {editMode ? (
                <input
                  className="form-control"
                  name="district"
                  value={business.district}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{business.district || "-"}</div>
              )}
            </Col>

            <Col md={4}>
              <label>Pincode</label>
              {editMode ? (
                <input
                  className="form-control"
                  name="pincode"
                  value={business.pincode}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{business.pincode || "-"}</div>
              )}
            </Col>

            <Col md={12}>
              <label>Google Map Link</label>
              {editMode ? (
                <input
                  type="url"
                  className="form-control"
                  name="mapLink"
                  value={business.mapLink}
                  onChange={handleInputChange}
                  placeholder="Google Maps URL"
                />
              ) : business.mapLink ? (
                <a href={business.mapLink} target="_blank" rel="noreferrer">
                  {business.mapLink}
                </a>
              ) : (
                <div>-</div>
              )}
            </Col>

            <Col md={6}>
 <label>
  Contact (Owner){" "}
  {getVerificationStatus(
    business.numberVerified,
    "phone",
    () => handleOpenVerify("phone", business.contactOwner)
  )}
</label>
              {editMode ? (
                <input
                  className="form-control"
                  name="contactOwner"
                  value={business.contactOwner}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{business.contactOwner || "-"}</div>
              )}
            </Col>

            <Col md={6}>
              <label>Contact (Office)</label>
              {editMode ? (
                <input
                  className="form-control"
                  name="contactOffice"
                  value={business.contactOffice}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{business.contactOffice || "-"}</div>
              )}
            </Col>

            <Col md={6}>
              <label>GST Number</label>
              {editMode ? (
                <input
                  className="form-control"
                  name="gst"
                  value={business.gst}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{business.gst || "-"}</div>
              )}
            </Col>
          </Row>
        </Col>
      </Row>

      {editMode && (
        <div className="text-end">
          <Button variant="primary" onClick={() => setEditMode(false)}>
            Update
          </Button>
        </div>
      )}

      {/* ✅ Verification Modal */}
      <VerificationModal
        show={showVerifyModal}
        onHide={() => setShowVerifyModal(false)}
        type={verifyType}
        value={verifyValue}
        onVerify={handleVerificationSuccess}
      />
    </Container>
  );
};

export default BusinessProfile;
// import React, { useEffect, useRef, useState } from "react";
// import { Container, Row, Col, Button } from "react-bootstrap";
// import Image_default from "../../Assets/Images/Default.png"; // Replace with your actual image path
// import {
//   getVerificationStatus,
//   VerificationModal,
// } from "../../Utils/VerifyStatus.js"; // adjust path
// import { useBusiness } from "../../context/BussinessContext.js";
// import { useUser } from "../../context/userContext.js";
// import { toast } from "react-toastify";
// import { useBusinessImageUpload } from "../../Utils/BussinessImageUploader.js";
// import { useParams } from "react-router-dom";

// const cleanValue = (val) => (val === "Unknown" ? "" : val);

// const BusinessProfile = () => {
//   const { user, token } = useUser();
//   const { allbusinesses, selectedBusinessId } = useBusiness();
//   const baseUrl = process.env.REACT_APP_BACKEND_URI;
//   const currentUserId = user?.id;
//   const { businessId: paramBusinessId } = useParams();

//   const [editMode, setEditMode] = useState(false);
//   const [showVerifyModal, setShowVerifyModal] = useState(false);
//   const [verifyType, setVerifyType] = useState("");
//   const [verifyValue, setVerifyValue] = useState("");
//   const submittedRef = useRef(false);

//   const [business, setBusiness] = useState({
//     _id: "",
//     ownerId: "",
//     logo: null,
//     startedOn: "",
//     businessName: "",
//     businessEmail: "",
//     emailVerified: false,
//     description: "",
//     addressLine1: "",
//     addressLine2: "",
//     businessCity: "",
//     businessDistrict: "",
//     businessState: "",
//     businessCountry: "",
//     businessZipCode: "",
//     googleMapLink: "",
//     ownerContact: "",
//     officeContact: "",
//     numberVerified: false,
//     gstnumber: "",
//     ownedBy: "",
//   });

//   useEffect(() => {
//     if (!allbusinesses || allbusinesses.length === 0) return;
//     const businessId = parseInt(paramBusinessId);

//     const selected = allbusinesses.find((b) =>
//       paramBusinessId
//         ? b.businessId === businessId
//         : b.businessId === selectedBusinessId
//     );

//     if (selected) {
//       setBusiness({
//         _id: selected._id,
//         ownerId: selected.ownerId || user?.id || "",
//         logo: selected.logo || null,
//         startedOn: cleanValue(selected.startedOn),
//         businessName: cleanValue(selected.businessName),
//         businessEmail: cleanValue(selected.businessEmail),
//         emailVerified: selected.emailVerified || false,
//         description: cleanValue(selected.description),
//         addressLine1: cleanValue(selected.addressLine1),
//         addressLine2: cleanValue(selected.addressLine2),
//         businessCity: cleanValue(selected.businessCity),
//         businessDistrict: cleanValue(selected.businessDistrict),
//         businessState: cleanValue(selected.businessState),
//         businessCountry: cleanValue(selected.businessCountry),
//         businessZipCode: cleanValue(selected.businessZipCode),
//         googleMapLink: cleanValue(selected.googleMapLink),
//         ownerContact: cleanValue(selected.ownerContact),
//         officeContact: cleanValue(selected.officeContact),
//         numberVerified: selected.numberVerified || false,
//         gstnumber: cleanValue(selected.gstnumber),
//         ownedBy: selected.ownedBy || "",
//       });
//     }
//   }, [allbusinesses, selectedBusinessId, user?.id, paramBusinessId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setBusiness((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleLogoDelete = async () => {
//     try {
//       const res = await fetch(
//         `${baseUrl}/v3/bussinessimage/deleteimage/${user?.id}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ public_id: business.logo?.publicId }),
//         }
//       );

//       if (res.ok) {
//         toast.success("Image deleted!");
//         setBusiness((prev) => ({ ...prev, logo: null }));
//       } else {
//         const result = await res.json();
//         toast.error(result.message || "Failed to delete image.");
//       }
//     } catch (error) {
//       console.error("Delete error:", error);
//       toast.error("Error deleting image.");
//     }
//   };

//   const { handleImageUpload } = useBusinessImageUpload({
//     userId: user?.id,
//     token,
//     publicId: business.logo?.publicId,
//     submittedRef,
//     setImageData: (logo) => setBusiness((prev) => ({ ...prev, logo })),
//     baseUrl,
//   });

//   const handleLogoChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     handleImageUpload(file);
//   };

//   const handleOpenVerify = (type, value) => {
//     setVerifyType(type);
//     setVerifyValue(value);
//     setShowVerifyModal(true);
//   };

//   const handleVerificationSuccess = () => {
//     if (verifyType === "email") {
//       setBusiness((prev) => ({ ...prev, emailVerified: true }));
//     } else if (verifyType === "phone") {
//       setBusiness((prev) => ({ ...prev, numberVerified: true }));
//     }
//   };

//   const formatDateForInput = (date) => {
//     if (!date) return "";
//     const d = new Date(date);
//     return d.toISOString().split("T")[0];
//   };

//   const handleSubmit = async () => {
//     try {
//       const res = await fetch(
//         `${baseUrl}/v2/bussiness/${user?.id}/updatebusiness/${business?._id}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(business),
//         }
//       );

//       const result = await res.json();
//       if (res.ok) {
//         submittedRef.current = true;
//         toast.success("Business Profile updated successfully");
//         setBusiness(result.business || business);
//         setEditMode(false);
//         window.location.reload();
//       } else {
//         toast.error(result.message || "Failed to update business");
//       }
//     } catch (error) {
//       console.error("Business update error:", error);
//       toast.error("Error updating business profile");
//     }
//   };

//   return (
//     <Container className="py-4">
//       <h4 className="mb-2  text-center">Business Profile</h4>
//       <div className="d-flex justify-content-end align-items-center mb-4">
//         {currentUserId === business.ownedBy && (
//           <Button
//             variant="outline-primary"
//             className="me-2"
//             size="sm"
//             onClick={() => setEditMode(!editMode)}
//           >
//             {editMode ? "Cancel" : <i className="bi bi-pencil-square"></i>}
//           </Button>
//         )}

//         {currentUserId === business.ownedBy && (
//           <Button variant="outline-danger" size="sm" onClick={() => "/home"}>
//             <i className="bi bi-trash3-fill"></i>
//           </Button>
//         )}
//       </div>

//       <Row className="mb-4">
//         <Col xs={12} md={4} className="text-center mb-3">
//           <div
//             style={{
//               width: "150px",
//               height: "150px",
//               borderRadius: "20%",
//               overflow: "hidden",
//               margin: "0 auto",
//               border: "2px solid #ddd",
//             }}
//           >
//             <img
//               src={
//                 business?.bussinessLogo ||
//                 business?.logo?.imageUrl ||
//                 Image_default
//               }
//               alt="Business Logo"
//               style={{ width: "100%", height: "100%", objectFit: "contain" }}
//               onError={(e) => (e.target.src = Image_default)}
//             />
//           </div>

//           {editMode && (
//             <div className="mt-2">
//               <button
//                 className="btn btn-sm btn-outline-danger mb-3"
//                 onClick={handleLogoDelete}
//               >
//                 <i className="bi bi-trash3"></i> Delete Logo
//               </button>
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
//                   value={formatDateForInput(business.startedOn)}
//                   onChange={handleInputChange}
//                 />
//               ) : (
//                 <div>
//                   {new Date(business.startedOn).toLocaleDateString("en-gb") ||
//                     "-"}
//                 </div>
//               )}
//             </Col>

//             <Col md={6}>
//               <label>Name</label>
//               {editMode ? (
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="businessName"
//                   value={business.businessName}
//                   onChange={handleInputChange}
//                   placeholder="Business Name"
//                 />
//               ) : (
//                 <div>{business.businessName || "-"}</div>
//               )}
//             </Col>

//             <Col md={6}>
//               <label>
//                 Email{" "}
//                 {currentUserId === business.ownedBy &&
//                   getVerificationStatus(business.emailVerified, "email", () =>
//                     handleOpenVerify("email", business.businessEmail)
//                   )}
//               </label>
//               {editMode ? (
//                 <input
//                   type="email"
//                   className="form-control"
//                   name="businessEmail"
//                   value={business.businessEmail}
//                   onChange={handleInputChange}
//                   placeholder="Email"
//                 />
//               ) : (
//                 <div>{business.businessEmail || "-"}</div>
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
//                   name="addressLine1"
//                   value={business.addressLine1}
//                   onChange={handleInputChange}
//                 />
//               ) : (
//                 <div>{business.addressLine1 || "-"}</div>
//               )}
//             </Col>

//             <Col md={12}>
//               <label>Address Line 2</label>
//               {editMode ? (
//                 <input
//                   className="form-control"
//                   name="addressLine2"
//                   value={business.addressLine2}
//                   onChange={handleInputChange}
//                 />
//               ) : (
//                 <div>{business.addressLine2 || "-"}</div>
//               )}
//             </Col>

//             <Col md={4}>
//               <label>City</label>
//               {editMode ? (
//                 <input
//                   name="businessCity"
//                   value={business.businessCity}
//                   onChange={handleInputChange}
//                   className="form-control"
//                 />
//               ) : (
//                 <div>{business.businessCity || "-"}</div>
//               )}
//             </Col>

//             <Col md={4}>
//               <label>District</label>
//               {editMode ? (
//                 <input
//                   className="form-control"
//                   name="businessDistrict"
//                   value={business.businessDistrict}
//                   onChange={handleInputChange}
//                 />
//               ) : (
//                 <div>{business.businessDistrict || "-"}</div>
//               )}
//             </Col>
//             <Col md={4}>
//               <label>State</label>
//               {editMode ? (
//                 <input
//                   className="form-control"
//                   name="businessState"
//                   value={business.businessState}
//                   onChange={handleInputChange}
//                 />
//               ) : (
//                 <div>{business.businessState || "-"}</div>
//               )}
//             </Col>

//             <Col md={4}>
//               <label>Country</label>
//               {editMode ? (
//                 <input
//                   className="form-control"
//                   name="businessCountry"
//                   value={business.businessCountry}
//                   onChange={handleInputChange}
//                 />
//               ) : (
//                 <div>{business.businessCountry || "-"}</div>
//               )}
//             </Col>

//             <Col md={4}>
//               <label>Pincode</label>
//               {editMode ? (
//                 <input
//                   className="form-control"
//                   name="businessZipCode"
//                   value={business.businessZipCode}
//                   onChange={handleInputChange}
//                 />
//               ) : (
//                 <div>{business.businessZipCode || "-"}</div>
//               )}
//             </Col>

//             <Col md={12}>
//               <label>Google Map Link</label>
//               <br />
//               {editMode ? (
//                 <input
//                   type="url"
//                   className="form-control"
//                   name="googleMapLink"
//                   value={business.googleMapLink}
//                   onChange={handleInputChange}
//                   placeholder="Google Maps URL"
//                 />
//               ) : business.googleMapLink ? (
//                 <a
//                   href={business.googleMapLink}
//                   target="_blank"
//                   rel="noreferrer"
//                 >
//                   {`Directions to ${business.businessName}`}
//                 </a>
//               ) : (
//                 <div>-</div>
//               )}
//             </Col>

//             <Col md={6}>
//               <label>
//                 Contact (Owner){" "}
//                  {currentUserId === business.ownedBy&&getVerificationStatus(business.numberVerified, "phone", () =>
//                   handleOpenVerify("phone", business.ownerContact)
//                 )}
//               </label>
//               {editMode ? (
//                 <input
//                   className="form-control"
//                   name="ownerContact"
//                   value={business.ownerContact}
//                   onChange={handleInputChange}
//                 />
//               ) : (
//                 <div>{business.ownerContact || "-"}</div>
//               )}
//             </Col>

//             <Col md={6}>
//               <label>Contact (Office)</label>
//               {editMode ? (
//                 <input
//                   className="form-control"
//                   name="officeContact"
//                   value={business.officeContact}
//                   onChange={handleInputChange}
//                 />
//               ) : (
//                 <div>{business.officeContact || "-"}</div>
//               )}
//             </Col>

//             <Col md={6}>
//               <label>GST Number</label>
//               {editMode ? (
//                 <input
//                   className="form-control"
//                   name="gstnumber"
//                   value={business.gstnumber}
//                   onChange={handleInputChange}
//                 />
//               ) : (
//                 <div>{business.gstnumber || "-"}</div>
//               )}
//             </Col>
//           </Row>
//         </Col>
//       </Row>

//       {editMode && (
//         <div className="text-end">
//           <Button variant="primary" onClick={handleSubmit}>
//             Update
//           </Button>
//         </div>
//       )}

//       {/* ✅ Verification Modal */}
//       <VerificationModal
//         show={showVerifyModal}
//         onHide={() => setShowVerifyModal(false)}
//         type={verifyType}
//         value={verifyValue}
//         onVerify={handleVerificationSuccess}
//       />
//     </Container>
//   );
// };

// export default BusinessProfile;

import  { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Image_default from "../../Assets/Images/Default.png";
import {
  getVerificationStatus,
  VerificationModal,
} from "../../Utils/VerifyStatus.js";
import { useBusiness } from "../../context/BussinessContext.js";
import { useUser } from "../../context/userContext.js";
import { toast } from "react-toastify";
import { useBusinessImageUpload } from "../../Utils/BussinessImageUploader.js";
import { useParams, useLocation } from "react-router-dom";
import { useProduct } from "../../context/ProductContext.js";

const cleanValue = (val) => (val === "Unknown" ? "" : val);

const BusinessProfile = () => {
  const { user, token } = useUser();
  const { allbusinesses, selectedBusinessId } = useBusiness();
  const baseUrl = process.env.REACT_APP_BACKEND_URI;
  const currentUserId = user?.id;
  const { businessId: paramBusinessId } = useParams();

  const [editMode, setEditMode] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verifyType, setVerifyType] = useState("");
  const [verifyValue, setVerifyValue] = useState("");
  const submittedRef = useRef(false);

  const { products } = useProduct();

  const [business, setBusiness] = useState({
    _id: "",
    ownerId: "",
    logo: null,
    startedOn: "",
    businessName: "",
    businessEmail: "",
    emailVerified: false,
    description: "",
    addressLine1: "",
    addressLine2: "",
    businessCity: "",
    businessDistrict: "",
    businessState: "",
    businessCountry: "",
    businessZipCode: "",
    googleMapLink: "",
    ownerContact: "",
    officeContact: "",
    numberVerified: false,
    gstnumber: "",
    totalProducts: 0,
    ownedBy: "",
    SocialLinks: {
      facebook: "",
      instagram: "",
      linkedin: "",
      twitter: "",
      website: "",
    },
  });

  const location = useLocation();
  const isPublicView =
    location.pathname.includes("/viewbusinessprofile/") && !!paramBusinessId;

  useEffect(() => {
    if (!allbusinesses || allbusinesses.length === 0) return;
    const businessId = parseInt(paramBusinessId);

    const selected = allbusinesses.find((b) =>
      paramBusinessId
        ? b.businessId === businessId
        : b.businessId === selectedBusinessId
    );

    if (selected) {
      setBusiness({
        _id: selected._id,
        ownerId: selected.ownerId || user?.id || "",
        logo: selected.logo || null,
        startedOn: cleanValue(selected.startedOn),
        businessName: cleanValue(selected.businessName),
        businessEmail: cleanValue(selected.businessEmail),
        emailVerified: selected.emailVerified || false,
        description: cleanValue(selected.description),
        addressLine1: cleanValue(selected.addressLine1),
        addressLine2: cleanValue(selected.addressLine2),
        businessCity: cleanValue(selected.businessCity),
        businessDistrict: cleanValue(selected.businessDistrict),
        businessState: cleanValue(selected.businessState),
        businessCountry: cleanValue(selected.businessCountry),
        businessZipCode: cleanValue(selected.businessZipCode),
        googleMapLink: cleanValue(selected.googleMapLink),
        ownerContact: cleanValue(selected.ownerContact),
        officeContact: cleanValue(selected.officeContact),
        numberVerified: selected.numberVerified || false,
        gstnumber: cleanValue(selected.gstnumber),
        ownedBy: selected.ownedBy || "",
        totalProducts: selected.totalProducts,
        SocialLinks: {
          facebook: selected?.SocialLinks?.facebook || "",
          instagram: selected?.SocialLinks?.instagram || "",
          linkedin: selected?.SocialLinks?.linkedin || "",
          twitter: selected?.SocialLinks?.twitter || "",
          website: selected?.SocialLinks?.website || "",
        },
      });
    }
  }, [allbusinesses, selectedBusinessId, user?.id, paramBusinessId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBusiness((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoDelete = async () => {
    try {
      const res = await fetch(
        `${baseUrl}/v3/bussinessimage/deleteimage/${user?.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ public_id: business.logo?.publicId }),
        }
      );

      if (res.ok) {
        toast.success("Image deleted!");
        setBusiness((prev) => ({ ...prev, logo: null }));
      } else {
        const result = await res.json();
        toast.error(result.message || "Failed to delete image.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Error deleting image.");
    }
  };

  const { handleImageUpload } = useBusinessImageUpload({
    userId: user?.id,
    token,
    publicId: business.logo?.publicId,
    submittedRef,
    setImageData: (logo) => setBusiness((prev) => ({ ...prev, logo })),
    baseUrl,
  });

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    handleImageUpload(file);
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

  const formatDateForInput = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(
        `${baseUrl}/v2/bussiness/${user?.id}/updatebusiness/${business?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(business),
        }
      );

      const result = await res.json();
      if (res.ok) {
        submittedRef.current = true;
        toast.success("Business Profile updated successfully");
        setBusiness(result.business || business);
        setEditMode(false);
        window.location.reload();
      } else {
        toast.error(result.message || "Failed to update business");
      }
    } catch (error) {
      console.error("Business update error:", error);
      toast.error("Error updating business profile");
    }
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setBusiness((prev) => ({
      ...prev,
      SocialLinks: {
        ...prev.SocialLinks,
        [name]: value,
      },
    }));
  };

  return (
    <Container className="py-4">
      {/* <h4 className="mb-2 text-center">Business Profile</h4> */}

      {isPublicView ? (
        <>
          {/* Public View Banner */}
          <Row
            className="align-items-center mb-4 text-white"
            style={{
              backgroundImage: `url(${
                business.logo?.imageUrl || Image_default
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "20px",
              position: "relative",
              overflow: "hidden",
              minHeight: "200px",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backdropFilter: "blur(6px)",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                zIndex: 1,
              }}
            />
            <Col
              md={3}
              className="text-center mb-3 mt-3 mb-md-0"
              style={{ zIndex: 2 }}
            >
              <img
                src={business.ownedBy?.profilepic?.imageUrl || Image_default}
                alt="Business Logo"
                style={{
                  width: "100%",
                  maxWidth: "150px",
                  height: "150px",
                  objectFit: "contain",
                  borderRadius: "10px",
                  border: "2px solid #ccc",
                  backgroundColor: "#fff",
                }}
              />
            </Col>
            <Col
              xs={12}
              md={4}
              className="text-center text-md-start mb-3 mb-md-5"
              style={{ zIndex: 2 }}
            >
              <h4 className="mt-0">{business.ownedBy?.firstName || "-"}</h4>
            </Col>

            <Col
              xs={12}
              md={2}
              className="text-center text-md-start"
              style={{ zIndex: 2 }}
            >
              <h4 className="mb-2">{business.businessName || "-"}</h4>
              <p className="mb-1">
                <i className="bi bi-envelope-fill me-1" />
                {business.businessEmail || "N/A"}
              </p>
              {business.googleMapLink && (
                <a
                  href={business.googleMapLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-light btn-sm mb-4"
                >
                  <i className="bi bi-geo-alt-fill me-1" />
                  View on Map
                </a>
              )}
            </Col>

            <Col
              md={3}
              className="text-center mb-3 mt-3 mb-md-0"
              style={{ zIndex: 2 }}
            >
              <img
                src={business.logo?.imageUrl || Image_default}
                alt="Business Logo"
                style={{
                  width: "100%",
                  maxWidth: "150px",
                  height: "150px",
                  objectFit: "contain",
                  borderRadius: "100px",
                  border: "2px solid #ccc",
                  backgroundColor: "#fff",
                }}
              />
            </Col>
          </Row>

          {/* Public Details Card */}
          <Card className="shadow-sm border-0 mb-4">
            <Card.Body>
              <Row>
                <Col md={6} className="mb-3">
                  <h6 className="fw-bold  fs-4 ">Started On</h6>
                  <hr />
                  <p>
                    {new Date(business.startedOn).toLocaleDateString("en-GB")}
                  </p>
                </Col>
                <Col md={6} className="mb-3">
                  <h6 className="fw-bold  fs-4 ">Description</h6>
                  <hr />
                  <p>{business.description || "-"}</p>
                </Col>
                <Col md={6} className="mb-3">
                  <h6 className="fw-bold  fs-4 ">Address</h6>
                  <hr />
                  <p>
                    {business.addressLine1}
                    <br />
                    {business.addressLine2 && (
                      <>
                        {business.addressLine2}
                        <br />
                      </>
                    )}
                    {business.businessCity}, {business.businessDistrict}
                    <br />
                    {business.businessState}, {business.businessCountry} -{" "}
                    {business.businessZipCode}
                  </p>
                </Col>
                <Col md={6} className="mb-3">
                  <h6 className="fw-bold fs-4">contact</h6>
                  <hr />
                  <span className="d-flex gap-2">
                    <h6>Owner :</h6>
                    <p>{business.ownerContact}</p>
                  </span>
                  {business.officeContact && (
                    <span className="d-flex gap-2">
                      <h6>Office :</h6>
                      <p>{business.officeContact}</p>
                    </span>
                  )}
                  {/* {business.googleMapLink ? (
                    <a href={business.googleMapLink} target="_blank" rel="noreferrer">
                      {business.googleMapLink}
                    </a>
                  ) : (
                    <p>-</p>
                  )} */}
                </Col>
                {business?.SocialLinks &&
                  Object.values(business.SocialLinks).some(
                    (link) => !!link
                  ) && (
                    <Col md={6} className="mt-3">
                      <label className="fw-bold fs-4">
                        Connect With Us Through
                      </label>
                      <hr />
                      <div className="d-flex gap-3 flex-wrap mt-2">
                        {business.SocialLinks.facebook && (
                          <a
                            href={business.SocialLinks.facebook}
                            target="_blank"
                            rel="noreferrer"
                            title="Facebook"
                          >
                            <i className="bi bi-facebook fs-4"></i>
                          </a>
                        )}
                        {business.SocialLinks.instagram && (
                          <a
                            href={business.SocialLinks.instagram}
                            target="_blank"
                            rel="noreferrer"
                            title="Instagram"
                          >
                            <i className="bi bi-instagram fs-4"></i>
                          </a>
                        )}
                        {business.SocialLinks.linkedin && (
                          <a
                            href={business.SocialLinks.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            title="LinkedIn"
                          >
                            <i className="bi bi-linkedin fs-4"></i>
                          </a>
                        )}
                        {business.SocialLinks.twitter && (
                          <a
                            href={business.SocialLinks.twitter}
                            target="_blank"
                            rel="noreferrer"
                            title="Twitter"
                          >
                            <i className="bi bi-twitter fs-4"></i>
                          </a>
                        )}
                        {business.SocialLinks.website && (
                          <a
                            href={business.SocialLinks.website}
                            target="_blank"
                            rel="noreferrer"
                            title="Website"
                          >
                            <i className="bi bi-globe fs-4"></i>
                          </a>
                        )}
                      </div>
                    </Col>
                  )}
              </Row>
            </Card.Body>
          </Card>

          {/* total counts */}
         <Card className="shadow-sm border-0 mb-4">
  <Card.Body>
    <Row>
      <Col xs={12} md={6} className="mb-3">
        <Card className="shadow-sm bg-secondary bg-opacity-25 border-0 h-100">
          <Card.Body>
            <h6 className="fw-bold fs-4 d-flex align-items-center gap-2 text-primary">
              <i className="bi bi-box-seam-fill"></i> Products
            </h6>
            <hr />
            {business.totalProducts !== undefined && (
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-collection-fill text-success fs-5"></i>
                <h6 className="mb-0">Total Products:</h6>
                <span className="badge bg-danger ms-2">
                  {business.totalProducts}
                </span>
              </div>
            )}
          </Card.Body>
        </Card>
      </Col>

      <Col xs={12} md={6} className="mb-3">
        <Card className="shadow-sm bg-secondary bg-opacity-25 border-0 h-100">
          <Card.Body>
            <h6 className="fw-bold fs-4 d-flex align-items-center gap-2 text-primary">
              <i className="bi bi-person-badge-fill"></i> Employees

            </h6>
            <hr />
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-graph-up-arrow text-info fs-5"></i>
              <h6 className="mb-0">Some Value:</h6>
              <span className="badge bg-info ms-2">42</span>
            </div>
          </Card.Body>
        </Card>
      </Col>
       <Col xs={12} md={6} className="mb-3">
        <Card className="shadow-sm bg-secondary bg-opacity-25 border-0 h-100">
          <Card.Body>
            <h6 className="fw-bold fs-4 d-flex align-items-center gap-2 text-primary">
              <i className="bi bi-people-fill"></i>  Traders

            </h6>
            <hr />
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-graph-up-arrow text-info fs-5"></i>
              <h6 className="mb-0">Some Value:</h6>
              <span className="badge bg-info ms-2">42</span>
            </div>
          </Card.Body>
        </Card>
      </Col>
       <Col xs={12} md={6} className="mb-3">
        <Card className="shadow-sm bg-secondary bg-opacity-25 border-0 h-100">
          <Card.Body>
            <h6 className="fw-bold fs-4 d-flex align-items-center gap-2 text-primary">
             <i className="bi bi-truck-front-fill"></i>  Vechiles

            </h6>
            <hr />
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-graph-up-arrow text-info fs-5"></i>
              <h6 className="mb-0">Some Value:</h6>
              <span className="badge bg-info ms-2">42</span>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Card.Body>
</Card>

        </>
      ) : (
        <>
          {/* Private / Editable View */}
          <div className="d-flex justify-content-end align-items-center mb-4">
            {currentUserId === business.ownedBy && (
              <>
                <Button
                  variant="outline-primary"
                  className="me-2"
                  size="sm"
                  onClick={() => setEditMode(!editMode)}
                >
                  {editMode ? "Cancel" : <i className="bi bi-pencil-square" />}
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => "/home"}
                >
                  <i className="bi bi-trash3-fill" />
                </Button>
              </>
            )}
          </div>

          <Row className="mb-4">
            <Col xs={12} md={4} className="text-center mb-3">
              <div
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "20%",
                  overflow: "hidden",
                  margin: "0 auto",
                  border: "2px solid #ddd",
                }}
              >
                <img
                  src={business.logo?.imageUrl || Image_default}
                  alt="Business Logo"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  onError={(e) => (e.target.src = Image_default)}
                />
              </div>
              {editMode && (
                <div className="mt-2">
                  <button
                    className="btn btn-sm btn-outline-danger mb-3"
                    onClick={handleLogoDelete}
                  >
                    <i className="bi bi-trash3" /> Delete Logo
                  </button>
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
                {/* Started On */}
                <Col md={6}>
                  <label>Started On</label>
                  {editMode ? (
                    <input
                      type="date"
                      className="form-control"
                      name="startedOn"
                      value={formatDateForInput(business.startedOn)}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <div>
                      {new Date(business.startedOn).toLocaleDateString("en-GB")}
                    </div>
                  )}
                </Col>

                {/* Business Name & Email */}
                <Col md={6}>
                  <label>Name</label>
                  {editMode ? (
                    <input
                      type="text"
                      className="form-control"
                      name="businessName"
                      value={business.businessName}
                      onChange={handleInputChange}
                      placeholder="Business Name"
                    />
                  ) : (
                    <div>{business.businessName}</div>
                  )}
                </Col>

                <Col md={6}>
                  <label>
                    Email{" "}
                    {currentUserId === business.ownedBy &&
                      getVerificationStatus(
                        business.emailVerified,
                        "email",
                        () => handleOpenVerify("email", business.businessEmail)
                      )}
                  </label>
                  {editMode ? (
                    <input
                      type="email"
                      className="form-control"
                      name="businessEmail"
                      value={business.businessEmail}
                      onChange={handleInputChange}
                      placeholder="Email"
                    />
                  ) : (
                    <div>{business.businessEmail}</div>
                  )}
                </Col>

                {/* Description */}
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
                    <div>{business.description}</div>
                  )}
                </Col>

                {/* Address */}
                <Col md={12}>
                  <label>Address Line 1</label>
                  {editMode ? (
                    <input
                      className="form-control"
                      name="addressLine1"
                      value={business.addressLine1}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <div>{business.addressLine1}</div>
                  )}
                </Col>
                <Col md={12}>
                  <label>Address Line 2</label>
                  {editMode ? (
                    <input
                      className="form-control"
                      name="addressLine2"
                      value={business.addressLine2}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <div>{business.addressLine2}</div>
                  )}
                </Col>
                <Col md={4}>
                  <label>City</label>
                  {editMode ? (
                    <input
                      name="businessCity"
                      value={business.businessCity}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  ) : (
                    <div>{business.businessCity}</div>
                  )}
                </Col>
                <Col md={4}>
                  <label>District</label>
                  {editMode ? (
                    <input
                      className="form-control"
                      name="businessDistrict"
                      value={business.businessDistrict}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <div>{business.businessDistrict}</div>
                  )}
                </Col>
                <Col md={4}>
                  <label>State</label>
                  {editMode ? (
                    <input
                      className="form-control"
                      name="businessState"
                      value={business.businessState}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <div>{business.businessState}</div>
                  )}
                </Col>
                <Col md={4}>
                  <label>Country</label>
                  {editMode ? (
                    <input
                      className="form-control"
                      name="businessCountry"
                      value={business.businessCountry}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <div>{business.businessCountry}</div>
                  )}
                </Col>
                <Col md={4}>
                  <label>Pincode</label>
                  {editMode ? (
                    <input
                      className="form-control"
                      name="businessZipCode"
                      value={business.businessZipCode}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <div>{business.businessZipCode}</div>
                  )}
                </Col>

                {/* Map Link */}
                <Col md={12}>
                  <label>Google Map Link</label>
                  {editMode ? (
                    <input
                      type="url"
                      className="form-control"
                      name="googleMapLink"
                      value={business.googleMapLink}
                      onChange={handleInputChange}
                      placeholder="Google Maps URL"
                    />
                  ) : business.googleMapLink ? (
                    <a
                      href={business.googleMapLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Directions to {business.businessName}
                    </a>
                  ) : (
                    <div>-</div>
                  )}
                </Col>

                {/* Contacts and GST */}
                <Col md={6}>
                  <label>
                    Contact (Owner){" "}
                    {currentUserId === business.ownedBy &&
                      getVerificationStatus(
                        business.numberVerified,
                        "phone",
                        () => handleOpenVerify("phone", business.ownerContact)
                      )}
                  </label>
                  {editMode ? (
                    <input
                      className="form-control"
                      name="ownerContact"
                      value={business.ownerContact}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <div>{business.ownerContact}</div>
                  )}
                </Col>
                <Col md={6}>
                  <label>Contact (Office)</label>
                  {editMode ? (
                    <input
                      className="form-control"
                      name="officeContact"
                      value={business.officeContact}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <div>{business.officeContact}</div>
                  )}
                </Col>
                {editMode && (
                  <>
                    <Col md={6}>
                      <label>Facebook</label>
                      <input
                        type="url"
                        className="form-control"
                        name="facebook"
                        value={business.SocialLinks.facebook}
                        onChange={handleSocialChange}
                        placeholder="https://facebook.com/yourpage"
                      />
                    </Col>
                    <Col md={6}>
                      <label>Instagram</label>
                      <input
                        type="url"
                        className="form-control"
                        name="instagram"
                        value={business.SocialLinks.instagram}
                        onChange={handleSocialChange}
                        placeholder="https://instagram.com/yourhandle"
                      />
                    </Col>
                    <Col md={6}>
                      <label>LinkedIn</label>
                      <input
                        type="url"
                        className="form-control"
                        name="linkedin"
                        value={business.SocialLinks.linkedin}
                        onChange={handleSocialChange}
                        placeholder="https://linkedin.com/company/yourbiz"
                      />
                    </Col>
                    <Col md={6}>
                      <label>Twitter</label>
                      <input
                        type="url"
                        className="form-control"
                        name="twitter"
                        value={business.SocialLinks.twitter}
                        onChange={handleSocialChange}
                        placeholder="https://twitter.com/yourhandle"
                      />
                    </Col>
                    <Col md={12}>
                      <label>Website</label>
                      <input
                        type="url"
                        className="form-control"
                        name="website"
                        value={business.SocialLinks.website}
                        onChange={handleSocialChange}
                        placeholder="https://yourwebsite.com"
                      />
                    </Col>
                  </>
                )}

                {!editMode && business.SocialLinks && (
                  <Col md={12} className="mt-3">
                    <label className="fw-bold">Social Links</label>
                    <div className="d-flex gap-3 flex-wrap mt-2">
                      {business.SocialLinks.facebook && (
                        <a
                          href={business.SocialLinks.facebook}
                          target="_blank"
                          rel="noreferrer"
                          title="Facebook"
                        >
                          <i className="bi bi-facebook fs-4"></i>
                        </a>
                      )}
                      {business.SocialLinks.instagram && (
                        <a
                          href={business.SocialLinks.instagram}
                          target="_blank"
                          rel="noreferrer"
                          title="Instagram"
                        >
                          <i className="bi bi-instagram fs-4"></i>
                        </a>
                      )}
                      {business.SocialLinks.linkedin && (
                        <a
                          href={business.SocialLinks.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          title="LinkedIn"
                        >
                          <i className="bi bi-linkedin fs-4"></i>
                        </a>
                      )}
                      {business.SocialLinks.twitter && (
                        <a
                          href={business.SocialLinks.twitter}
                          target="_blank"
                          rel="noreferrer"
                          title="Twitter"
                        >
                          <i className="bi bi-twitter fs-4"></i>
                        </a>
                      )}
                      {business.SocialLinks.website && (
                        <a
                          href={business.SocialLinks.website}
                          target="_blank"
                          rel="noreferrer"
                          title="Website"
                        >
                          <i className="bi bi-globe fs-4"></i>
                        </a>
                      )}
                    </div>
                  </Col>
                )}
              </Row>
            </Col>
          </Row>

          {editMode && (
            <div className="text-end">
              <Button variant="primary" onClick={handleSubmit}>
                Update
              </Button>
            </div>
          )}
        </>
      )}

      {/* Verification Modal */}
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

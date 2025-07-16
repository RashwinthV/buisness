// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// function BusinessRegister() {
//   const navigate = useNavigate();
//   const baseUrl = process.env.REACT_APP_BACKEND_URI;

//   const [formData, setFormData] = useState({
//     businessName: "",
//     businessEmail: "",
//     description: "",
//     addressLine1: "",
//     addressLine2: "",
//     googleMapLink: "",
//     ownerContact: "",
//     officeContact: "",
//     startedOn: "",
//     gstnumber: "",
//     businessCity: "",
//     businessDistrict: "",
//     businessZipCode: "",
//     logo: null, // <-- added field
//   });

//   const [userPhone, setUserPhone] = useState("");

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

//     const requiredFields = [
//       "businessName",
//       "businessEmail",
//       "addressLine1",
//       "ownerContact",
//       "startedOn",
//     ];

//     for (const field of requiredFields) {
//       if (!formData[field]) {
//         toast.warning(`Please fill the ${field} field.`);
//         return;
//       }
//     }

//     try {
//       const res = await fetch(`${baseUrl}/v1/business/register`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const result = await res.json();

//       if (res.ok) {
//         toast.success("Business registered successfully!");
//         navigate("/dashboard"); // Or any route you prefer
//       } else {
//         toast.error(result.message || "Registration failed.");
//       }
//     } catch (error) {
//       console.error("Error registering business:", error);
//       toast.error("Server error. Try again later.");
//     }
//   };

//   return (
//     <div className="container my-5">
//       <div className="row justify-content-center">
//         <div className="col-12 col-md-8 col-lg-6">
//           <div className="card shadow-sm">
//             <div className="card-body">
//               <h4 className="text-center mb-4">Business Registration</h4>
//               <form onSubmit={handleSubmit}>
//                 <div className="row">
//                   <div className="mb-3 col-md-6">
//                     <label className="form-label">
//                       Business Logo (Optional)
//                     </label>
//                     <input
//                       type="file"
//                       className="form-control"
//                       name="logo"
//                       accept="image/*"
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="mb-3 col-md-6">
//                     <label className="form-label">
//                       Started On <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       type="date"
                      
//                       className="form-control"
//                       name="startedOn"
//                       value={formData.startedOn}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="row">
//                   <div className="mb-3 col-md-6">
//                     <label className="form-label">
//                       Business Name <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="businessName"
//                       value={formData.businessName}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   <div className="mb-3 col-md-6">
//                     <label className="form-label">
//                       Business Email <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       name="businessEmail"
//                       value={formData.businessEmail}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">
//                     Description <span className="text-danger">*</span>
//                   </label>
//                   <textarea
//                     className="form-control"
//                     name="description"
//                     rows="3"
//                     value={formData.description}
//                     onChange={handleChange}
//                     required
//                   ></textarea>
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
//                   <div className="mb-3 col-md-6">
//                     <label className="form-label">
//                       City <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="businessCity"
//                       value={formData.businessCity}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   <div className="mb-3 col-md-6">
//                     <label className="form-label">
//                       District <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       type="tel"
//                       className="form-control"
//                       name="businessDistrict"
//                       value={formData.businessDistrict}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="row">
//                   <div className="mb-3 col-md-6">
//                     <label className="form-label">
//                       Zip Code <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       type="tel"
//                       className="form-control"
//                       name="businessZipCode"
//                       value={formData.businessZipCode}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   <div className="mb-3 col-md-6">
//                     <label className="form-label">Google Map Link</label>
//                     <input
//                       type="url"
//                       className="form-control"
//                       name="googleMapLink"
//                       value={formData.googleMapLink}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>

//                 <div className="row">
//                   <div className="mb-3 col-md-6">
//                     <label className="form-label">
//                       Contact Number (Owner){" "}
//                       <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       type="tel"
//                       className="form-control"
//                       name="ownerContact"
//                       value={formData.ownerContact}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   <div className="mb-3 col-md-6">
//                     <label className="form-label">
//                       Contact Number (Office)
//                     </label>
//                     <input
//                       type="tel"
//                       className="form-control"
//                       name="officeContact"
//                       value={formData.officeContact}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>

//                 <div className="row">
//                   <div className="mb-3 col-md-6">
//                     <label className="form-label">GST Number (Optional)</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="gstNumber"
//                       value={formData.gstnumber}
//                       onChange={handleChange}
//                       placeholder="Enter GST Number"
//                     />
//                   </div>
//                 </div>

//                 <button type="submit" className="btn btn-success w-100">
//                   Register Business
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BusinessRegister;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {  useUser } from "../../context/userContext";


function BusinessRegister() {
  const navigate = useNavigate();
  const {user}=useUser()
  const baseUrl = process.env.REACT_APP_BACKEND_URI;
const token=localStorage.getItem('token')
  const [formData, setFormData] = useState({
    businessName: "",
    businessEmail: "",
    description: "",
    addressLine1: "",
    addressLine2: "",
    googleMapLink: "",
    ownerContact: "",
    officeContact: "",
    startedOn: "",
    gstnumber: "",
    businessCity: "",
    businessDistrict: "",
    businessZipCode: "",
    logo: null, // Will store image URL after upload
  });

  const handleChange = async (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (!file) return;

      const imageFormData = new FormData();
      imageFormData.append("image", file);

      try {
        const res = await fetch(`${baseUrl}/v3/bussinessimage/upload`, {
          method: "POST",
          body: imageFormData,
        });

        const result = await res.json();

        if (res.ok) {
          toast.success("Logo uploaded!");
          setFormData((prev) => ({
            ...prev,
            logo: result.imageUrl, // Store URL
          }));
        } else {
          toast.error("Image upload failed.");
        }
      } catch (err) {
        console.error("Image upload error:", err);
        toast.error("Server error during image upload.");
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "businessName",
      "businessEmail",
      "addressLine1",
      "ownerContact",
      "startedOn",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.warning(`Please fill the ${field} field.`);
        return;
      }
    }
console.log(formData);

    try {
      const res = await fetch(`${baseUrl}/v2/bussiness/register/${user?.id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // ✅ Required to parse bod
         Authorization:`Bearer ${token}`
        },
        body: JSON.stringify(formData), // Includes logo URL
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Business registered successfully!");
        navigate("/");
      } else {
        toast.error(result.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error registering business:", error);
      toast.error("Server error. Try again later.");
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="text-center mb-4">Business Registration</h4>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Business Logo (Optional)</label>
                    <input
                      type="file"
                      className="form-control"
                      name="logo"
                      accept="image/*"
                      onChange={handleChange}
                    />
                    {formData.logo && (
                      <img
                        src={formData.logo}
                        alt="Preview"
                        className="mt-2"
                        style={{ width: "100px", height: "auto", borderRadius: "5px" }}
                      />
                    )}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">
                      Started On <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      name="startedOn"
                      value={formData.startedOn}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Business Info */}
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">
                      Business Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-md-6">
                    <label className="form-label">
                      Business Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="businessEmail"
                      value={formData.businessEmail}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Description <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                {/* Address */}
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">
                      Address Line 1 <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="addressLine1"
                      value={formData.addressLine1}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Address Line 2</label>
                    <input
                      type="text"
                      className="form-control"
                      name="addressLine2"
                      value={formData.addressLine2}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* City, District */}
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">
                      City <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="businessCity"
                      value={formData.businessCity}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">
                      District <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="businessDistrict"
                      value={formData.businessDistrict}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Zip & Google Map */}
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">
                      Zip Code <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="businessZipCode"
                      value={formData.businessZipCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Google Map Link</label>
                    <input
                      type="url"
                      className="form-control"
                      name="googleMapLink"
                      value={formData.googleMapLink}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Contact */}
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">
                      Contact Number (Owner) <span className="text-danger">*</span>
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      name="ownerContact"
                      value={formData.ownerContact}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Contact Number (Office)</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="officeContact"
                      value={formData.officeContact}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* GST */}
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">GST Number (Optional)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="gstnumber"
                      value={formData.gstnumber}
                      onChange={handleChange}
                      placeholder="Enter GST Number"
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-success w-100">
                  Register Business
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessRegister;

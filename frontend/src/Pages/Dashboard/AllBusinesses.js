// import  { useState, useEffect } from "react";
// import Image_default from "../../Assets/Images/Default.png";
// import { useBusiness } from "../../context/BussinessContext";
// // const allBusinesses = [
// //   {
// //     id: 1,
// //     name: "Copra Traders",
// //     description: "Leading supplier of copra and coconut products.",
// //     email: "copra@example.com",
// //     contact: "9876543210",
// //     city: "Coimbatore",
// //     district: "Coimbatore",
// //     startedOn: "2020-06-01",
// //     productNames: ["Copra", "Shell", "Matta"],
// //     logo: Image_default, // Replace with actual logo
// //   },
// //   {
// //     id: 2,
// //     name: "Agri Farms",
// //     description: "Organic farming and agricultural products.",
// //     email: "farm@example.com",
// //     contact: "7894561230",
// //     city: "Madurai",
// //     district: "Madurai",
// //     startedOn: "2023-01-15",
// //     productNames: ["Coconut", "Fertilizer"],
// //     logo: Image_default,
// //   },
// //   {
// //     id: 3,
// //     name: "Tech Manufacturing",
// //     description: "High-quality machinery and parts manufacturing.",
// //     email: "tech@example.com",
// //     contact: "9873216540",
// //     city: "Chennai",
// //     district: "Chennai",
// //     startedOn: "2021-11-20",
// //     productNames: ["Machinery", "Parts"],
// //     logo: Image_default,
// //   },
// // ];

// const calculateSince = (dateString) => {
//   const startDate = new Date(dateString);
//   const now = new Date();

//   const years = now.getFullYear() - startDate.getFullYear();
//   const months = now.getMonth() - startDate.getMonth();

//   const totalMonths = years * 12 + months;
//   if (totalMonths < 1) return "Just started";

//   const yearsPart = Math.floor(totalMonths / 12);
//   const monthsPart = totalMonths % 12;

//   return `${yearsPart > 0 ? `${yearsPart} year${yearsPart > 1 ? "s" : ""}` : ""}${
//     monthsPart > 0 ? ` ${monthsPart} month${monthsPart > 1 ? "s" : ""}` : ""
//   }`;
// };

// const AllBusinesses = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredBusinesses, setFilteredBusinesses] = useState([]);
//   const {businesses}=useBusiness()
//   console.log("context bussiness",businesses);

//   useEffect(() => {
//     const sorted = [...businesses].sort((a, b) =>
//       a.name.localeCompare(b.name)
//     );
//     setFilteredBusinesses(sorted);
//   }, []);

//   const handleSearch = () => {
//     const term = searchTerm.trim().toLowerCase();

//     if (!term) {
//       const sorted = [...businesses].sort((a, b) =>
//         a.name.localeCompare(b.name)
//       );
//       setFilteredBusinesses(sorted);
//       return;
//     }

//     const filtered = businesses.filter((business) => {
//       return (
//         business.name.toLowerCase().includes(term) ||
//         business.productNames.some((p) => p.toLowerCase().includes(term))
//       );
//     });

//     setFilteredBusinesses(filtered);
//   };

//   return (
//     <div className="container py-2">
//       <div className="row align-items-center">
// <div className="col-12 col-md-7 col-lg-6">
//   <div className="d-flex align-items-center gap-2 mb-3">
//     <div className="input-group flex-grow-1">
//       <span className="input-group-text bg-white">
//         <i className="bi bi-search"></i>
//       </span>
//       <input
//         type="text"
//         className="form-control"
//         placeholder="Search Businesses"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//     </div>
//     <button className="btn btn-primary" onClick={handleSearch}>
//       Search
//     </button>
//   </div>
// </div>

//       </div>

//       <hr />

//       <div className="row">
//         {filteredBusinesses.length > 0 ? (
//           filteredBusinesses.map((business) => (
//             <div className="col-12 col-md-6 col-lg-4 mb-4" key={business.id}>
//               {/* <div className="card shadow-sm h-100">
//                 <div className="card-body">
//                   <h5 className="card-title">{business.name}</h5>
//                   <p className="mb-1">
//                     <strong>Location:</strong> {business.city}, {business.district}
//                   </p>
//                   <p className="mb-1">
//                     <strong>Contact:</strong> {business.contact}
//                   </p>
//                   <p className="mb-1">
//                     <strong>Email:</strong> {business.email}
//                   </p>
//                   <p className="mb-1">
//                     <strong>Products:</strong> {business.productNames.join(", ")}
//                   </p>
//                   <p className="mb-0">
//                     <strong>Since:</strong> {calculateSince(business.startedOn)}
//                   </p>
//                 </div>
//               </div> */}

// <div className="card shadow-sm h-100">
//   <div className="card-body">
//     <div className="d-flex align-items-center  mb-3">
//       <img
//         src={business.logo}
//         alt={`${business.name} Logo`}
//         className="rounded-circle me-3"
//         width="48"
//         height="48"
//         style={{ objectFit: "cover", border: "1px solid #ccc" }}
//       />
//       <h5 className="card-title mb-0">{business.name}</h5>

//     </div>
//         <p className="mb-0">
//       <strong>Since:</strong> {calculateSince(business.startedOn)}
//     </p>
//     <p className="mb-1 ">
//       <strong>Description:</strong> {business.description}
//     </p>
// <hr />
//         <p className="mb-1">
//       <strong>Contact:</strong> {business.contact}
//     </p>

//     <p className="mb-1">
//       <strong>Email:</strong> {business.email}
//     </p>
//     <p className="mb-1">
//       <strong>Products:</strong> {business.productNames?.join(", ")}
//     </p>

//         <p className="mb-1">
//       <strong>Location:</strong> {business.city}, {business.district}
//     </p>
//   </div>
// </div>

//             </div>
//           ))
//         ) : (
//           <div className="col-12 text-center">
//             <p>No businesses found matching your search.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllBusinesses;

import { useState, useEffect } from "react";
import Image_default from "../../Assets/Images/Default.png";
import { useBusiness } from "../../context/BussinessContext";

const calculateSince = (dateString) => {
  if (!dateString) return "Not available";

  const startDate = new Date(dateString);
  const now = new Date();

  const years = now.getFullYear() - startDate.getFullYear();
  const months = now.getMonth() - startDate.getMonth();

  const totalMonths = years * 12 + months;
  if (totalMonths < 1) return "Just started";

  const yearsPart = Math.floor(totalMonths / 12);
  const monthsPart = totalMonths % 12;

  return `${
    yearsPart > 0 ? `${yearsPart} year${yearsPart > 1 ? "s" : ""}` : ""
  }${monthsPart > 0 ? ` ${monthsPart} month${monthsPart > 1 ? "s" : ""}` : ""}`;
};

const AllBusinesses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const { allbusinesses } = useBusiness();

  useEffect(() => {
    if (allbusinesses.length > 0) {
      const sorted = [...allbusinesses].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setFilteredBusinesses(sorted);
    }
  }, [allbusinesses]);

  const handleSearch = () => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) {
      const sorted = [...allbusinesses].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setFilteredBusinesses(sorted);
      return;
    }

    const filtered = allbusinesses.filter((business) => {
      return (
        business.name.toLowerCase().includes(term) ||
        business?.productNames?.some((p) => p.toLowerCase().includes(term))
      );
    });

    setFilteredBusinesses(filtered);
  };


  return (
    <div className="container py-2">
      <div className="row align-items-center">
        <div className="col-12 col-md-7 col-lg-6">
          <div className="d-flex align-items-center gap-2 mb-3">
            <div className="input-group flex-grow-1">
              <span className="input-group-text bg-white">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search Businesses"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>

      <hr />

      <div className="row">
        {filteredBusinesses.length > 0 ? (
          filteredBusinesses.map((business) => (
            <div className="col-12 col-md-6 col-lg-4 mb-4" key={business._id}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={business.bussinessLogo||business.logo.imageUrl || Image_default}
                      alt={`${business.name} Logo`}
                      className="rounded-circle me-3"
                      width="60"
                      height="60"
                      style={{ objectFit: "contain", border: "1px solid #ccc" }}
                    />
                    <h5 className="card-title mb-0">{business.name}</h5>
                  </div>

                  <p className="mb-1">
                    <strong>Since:</strong>{" "}
                    {business.startedOn
                      ? calculateSince(business.startedOn)
                      : "Not available"}
                  </p>

                  {/* <p className="mb-1">
                    <strong>Description:</strong>{" "}
                    {business.description || "No description provided."}
                  </p> */}

                  <hr />

                  <p className="mb-1">
                    <strong>Contact:</strong>{" "}
                    {business.contactNumberOffice ||
                      business.contactNumberOwner ||
                      "Not available"}
                  </p>

                  <p className="mb-1">
                    <strong>Email:</strong> {business.email}
                  </p>

                  {business.productNames?.length > 0 && (
                    <p className="mb-1">
                      <strong>Products:</strong>{" "}
                      {business.productNames.join(", ")}
                    </p>
                  )}

                  <p className="mb-1">
                    <strong>Location:</strong> {business.addressLine1},{" "}
                    {business.addressLine2}
                    {business?.businessCity && ` ,${business?.businessCity}`}
                  </p>
                  {business?.businessZipCode && (
                    <p className="mb-1">
                      <strong>Pin code:</strong>{" "}
                      {`${business?.businessZipCode}`}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No businesses found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBusinesses;

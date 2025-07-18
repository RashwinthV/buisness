import { useState, useEffect } from "react";
import Image_default from "../../Assets/Images/Default.png";
import { useBusiness } from "../../context/BussinessContext";
import { Button } from "react-bootstrap";

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
        a.businessName.localeCompare(b.businessName)
      );
      setFilteredBusinesses(sorted);
    }
  }, [allbusinesses]);

  const handleSearch = () => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) {
      const sorted = [...allbusinesses].sort((a, b) =>
        a.businessName.localeCompare(b.businessName)
      );
      setFilteredBusinesses(sorted);
      return;
    }

    const filtered = allbusinesses.filter((business) => {
      return (
        business.businessName.toLowerCase().includes(term) ||
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
                  <div className="justify-content-between d-flex align-items-center mb-3">
                    <div className="d-flex align-items-center mb-3">
                      <img
                        src={business.logo.imageUrl || Image_default}
                        alt={`${business.businessName} Logo`}
                        className="rounded-circle me-3"
                        width="60"
                        height="60"
                        style={{
                          objectFit: "contain",
                          border: "1px solid #ccc",
                        }}
                      />
                      <h5 className="card-title mb-0">
                        {business.businessName}
                      </h5>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <Button className="btn-sm btn-secondary">
                        <i class="bi bi-eye"></i>
                      </Button>
                    </div>
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
                    <strong>Contact:</strong> {business.officeContact || " N/A"}
                  </p>

                  <p className="mb-1">
                    <strong>Email:</strong> {business.businessEmail}
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

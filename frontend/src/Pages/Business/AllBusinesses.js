import React, { useState, useEffect } from "react";

const allBusinesses = [
  {
    id: 1,
    name: "Copra Traders",
    email: "copra@example.com",
    productNames: ["Copra", "Shell", "Matta"],
  },
  {
    id: 2,
    name: "Agri Farms",
    email: "farm@example.com",
    productNames: ["Coconut", "Fertilizer"],
  },
  {
    id: 3,
    name: "Tech Manufacturing",
    email: "tech@example.com",
    productNames: ["Machinery", "Parts"],
  },
];

const AllBusinesses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);

  useEffect(() => {
    // Sort by name initially
    const sorted = [...allBusinesses].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setFilteredBusinesses(sorted);
  }, []);

  const handleSearch = () => {
    const term = searchTerm.trim().toLowerCase();

    if (term === "") {
      // Show all if empty
      const sorted = [...allBusinesses].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setFilteredBusinesses(sorted);
      return;
    }

    const filtered = allBusinesses.filter((business) => {
      return (
        business.name.toLowerCase().includes(term) ||
        business.productNames.some((product) =>
          product.toLowerCase().includes(term)
        )
      );
    });

    setFilteredBusinesses(filtered);
  };

  return (
    <div className="container py-2">
      <div className="row align-items-center">
        <div className="col-12 col-md-5 col-lg-6">
          <div className="input-group mb-3">
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search Businesses"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-12 col-md-2 col-lg-2">
          <button className="btn btn-primary w-100" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      <hr />

      <div className="row">
        {filteredBusinesses.length > 0 ? (
          filteredBusinesses.map((business) => (
            <div className="col-12 col-md-6 col-lg-4 mb-4" key={business.id}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{business.name}</h5>
                  <p className="card-text">{business.email}</p>
                  <p className="text-muted small mb-0">
                    Products: {business.productNames.join(", ")}
                  </p>
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

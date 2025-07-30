import { useState, useEffect, useRef } from "react";
import moment from "moment";
import { useBusiness } from "../../context/BussinessContext";
import { Button } from "react-bootstrap";
import TransactionEntry from "../../components/Modal/TransactionEntry";
import EditTransactionModal from "../../components/Modal/EditTransactionModal";
import BusinessBanner from "../../Utils/BusinessBanner";

const dummyProducts = [
  { id: 1, name: "Iron Rod", tag: "Raw Material", rate: 100 },
  { id: 2, name: "Steel Sheet", tag: "Raw Material", rate: 200 },
  { id: 3, name: "Welding Kit", tag: "Your Product", rate: 500 },
];

const dummyEmployees = [
  { id: 1, name: "Arun Kumar" },
  { id: 2, name: "Sneha R" },
];

const dummytransactions = [
  {
    type: "Sales",
    id: "TRANS-1",
    partyName: "ABC Traders",
    date: "2025-07-15T10:30:00Z",
    products: [
      { name: "Product A", qty: 2, total: 400 },
      { name: "Product B", qty: 1, total: 250 },
    ],
    discount: 0,
    grandTotal: 650,
    entryBy: "Kirithik",
    updatedBy: "N/A",
    updatedOn: "N/A",
  },
  {
    type: "Purchase",
    id: "TRANS-2",
    partyName: "XYZ Suppliers",
    date: "2025-07-14T14:00:00Z",
    products: [
      { name: "Product C", qty: 5, total: 1000 },
      { name: "Product D", qty: 3, total: 750 },
    ],
    discount: 0,
    grandTotal: 1750,
    entryBy: "Saran",
    updatedBy: "N/A",
    updatedOn: "N/A",
  },
  {
    type: "Sales",
    id: "TRANS-3",
    partyName: "LMN Wholesale",
    date: "2025-07-13T09:00:00Z",
    products: [{ name: "Product E", qty: 10, total: 2000 }],
    discount: 0,
    grandTotal: 2000,
    entryBy: "Admin",
    updatedBy: "N/A",
    updatedOn: "N/A",
  },
];

const Entry = () => {
  const [entryType, setEntryType] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [entries, setEntries] = useState(dummytransactions);
  const [sortBy, setSortBy] = useState("date");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const filterRef = useRef(null);

  const closeModal = () => {
    setEntryType(null);
    setModalShow(false);
  };

  const addEntry = (data) => {
    setEntries([...entries, data]);
    closeModal();
  };

  const { selectedBusinessId, businesses } = useBusiness();
  const selectedBusiness = businesses?.find(
    (b) => b.businessId === selectedBusinessId
  );

  const sortedEntries = [...entries].sort((a, b) => {
    if (sortBy === "date") return new Date(b.date) - new Date(a.date);
    if (sortBy === "type") return a.type.localeCompare(b.type);
    if (sortBy === "party") return a.partyName.localeCompare(b.partyName);
    return 0;
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowSortOptions(false);
      }
    };
    if (showSortOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSortOptions]);

  return (
    <div className="container py-2">
      <div>
        <BusinessBanner business={selectedBusiness} />
        <div className="card-body text-center mb-4 mt-4">
          <div className="text-center d-flex gap-3 justify-content-start flex-wrap">
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => {
                setEntryType("sales");
                setModalShow(true);
              }}
            ><i className="bi bi-wallet2 me-1"></i>
              New Sales
            </button>
            <button
              className="btn btn-sm btn-outline-success"
              onClick={() => {
                setEntryType("purchase");
                setModalShow(true);
              }}
            ><i className="bi bi-cart-check me-1"></i>
              New Purchase
            </button>
                      {/* Sort Dropdown */}
          <div className="position-relative">
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => setShowSortOptions(!showSortOptions)}
            >
              <i className="bi bi-funnel me-1" />
              Filter
            </button>

            {showSortOptions && (
              <div
                ref={filterRef}
                className="position-absolute bg-white border rounded shadow-sm p-2"
                style={{ top: "110%", left: 0, zIndex: 10, minWidth: "180px" }}
              >
                <label className="form-label fw-bold mb-2">Sort By:</label>
                <select
                  className="form-select"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setShowSortOptions(false);
                  }}
                >
                  <option value="date">Date</option>
                  <option value="type">Type</option>
                  <option value="party">Party Name</option>
                </select>
              </div>
            )}
          </div>
          </div>


        </div>
      </div>

      {/* Table */}
      {sortedEntries.length > 0 ? (
        <div className="table-responsive text-center">
          <table className="table table-hover table-sm fs-6">
            <thead className="small">
              <tr>
                <th>S.No</th>
                <th>Id</th>
                <th>Type</th>
                <th>Party Name</th>
                <th>Date</th>
                <th>Products</th>
                <th>Discount</th>
                <th>Grand Total</th>
                <th>Entry By</th>
                <th>Updated By</th>
                <th>Updated On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedEntries.map((entry, i) => (
                <tr key={i}>
                  <td className="small">{i + 1}</td>
                  <td>{entry.id}</td>
                  <td>{entry.type}</td>
                  <td>{entry.partyName}</td>
                  <td>{moment(entry.date).format("YYYY-MM-DD")}</td>
                  <td>
                    {entry.products.map((p, idx) => (
                      <div key={idx}>
                        {p.name} x {p.qty} = ₹{p.total}
                      </div>
                    ))}
                  </td>
                  <td>{entry.discount}%</td>
                  <td>₹{entry.grandTotal}</td>
                  <td>{entry.entryBy}</td>
                  <td>{entry.updatedBy}</td>
                  <td>{entry.updatedOn}</td>
                  <td>
                    <Button
                      variant=""
                      className="me-1"
                      size="sm"
                      onClick={() => setSelectedTransaction(entry)}
                    >
                      <i className="bi bi-pencil-square text-primary"></i>
                    </Button>
                    <Button
                      variant=""
                      className="me-1"
                      size="sm"
                      onClick={() => {
                        console.log("Delete clicked for", entry.id);
                      }}
                    >
                      <i className="bi bi-trash3 text-danger"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-muted">No entries added yet.</div>
      )}

      {/* Modals */}
      {modalShow && (
        <TransactionEntry
          show={modalShow}
          onHide={closeModal}
          type={entryType}
          products={dummyProducts}
          employees={dummyEmployees}
          onSubmit={addEntry}
        />
      )}

      {selectedTransaction && (
        <EditTransactionModal
          show={!!selectedTransaction}
          handleClose={() => setSelectedTransaction(null)}
          transaction={selectedTransaction}
          products={dummyProducts}
        />
      )}
    </div>
  );
};

export default Entry;

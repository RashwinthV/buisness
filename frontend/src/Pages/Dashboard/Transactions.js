import { useState } from "react";
import moment from "moment";
import { useBusiness } from "../../context/BussinessContext";
import { Button } from "react-bootstrap";
import TransactionEntry from "../../components/Modal/TransactionEntry";
import EditTransactionModal from "../../components/Modal/EditTransactionModal";
import BusinessBanner from "../../Utils/BusinessBanner";
// Sample placeholder data
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
    grandTotal: 2000,
    entryBy: "Admin",
    updatedBy: "N/A",
    updatedOn: "N/A",
  },
];
const Entry = () => {
  const [entryType, setEntryType] = useState(null); // "sales" or "purchase"
  const [modalShow, setModalShow] = useState(false);
  const [entries, setEntries] = useState(dummytransactions);
  const [sortBy, setSortBy] = useState("date");

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

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  return (
    <div className="container py-2">
      <div className="card shadow-sm border-0 mb-4">
        <BusinessBanner business={selectedBusiness} />
        <div className="card-body text-center">
          {/* <img
            src={
              selectedBusiness?.bussinessLogo ||
              selectedBusiness?.logo.imageUrl ||
              Image_default
            }
            alt="Business Logo"
            className="mb-2 img-fluid"
            style={{
              maxHeight: "80px",
              objectFit: "contain",
            }}
          />
          <h4 className="text-center mb-3">
            <strong>{selectedBusiness?.name} </strong>
          </h4> */}

          <div className="text-center mb-4 d-flex gap-3 justify-content-center flex-wrap">
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                setEntryType("sales");
                setModalShow(true);
              }}
            >
              Sales Entry
            </button>

            <button
              className="btn btn btn-outline-success"
              onClick={() => {
                setEntryType("purchase");
                setModalShow(true);
              }}
            >
              Purchase Entry
            </button>
          </div>
        </div>
      </div>

      {/* Buttons */}

      {/* Sort */}
      <div className="mb-3 d-flex align-items-center gap-2">
        <label className="fw-bold">Sort By:</label>
        <select
          className="form-select w-auto"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="date">Date</option>
          <option value="type">Type</option>
          <option value="party">Party Name</option>
        </select>
      </div>

      {/* Entry Table */}
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
                <th>Grand Total</th>
                <th>Entry By</th>
                <th>Udated By</th>
                <th>Updated On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedEntries.map((entry, i) => (
                <tr key={i}>
                  <td  className="small">{i + 1}</td>
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
                        // TODO: add delete confirmation modal or direct delete logic
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

      {/* Entry Modal */}
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

      {/* Edit Modal  */}
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

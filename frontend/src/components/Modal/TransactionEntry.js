import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import moment from "moment";
const partyList = [
  { id: 1, name: "SK Steels", contact: "9876543210", tag: "supplier" },
  { id: 2, name: "Vikram Traders", contact: "9123456780", tag: "buyer" },
  { id: 3, name: "Amman Agencies", contact: "", tag: "both" },
  { id: 4, name: "Bharat Pvt Ltd", contact: "9998877665", tag: "buyer" },
  { id: 5, name: "Surya Traders", contact: "", tag: "supplier" },
];

const TransactionEntry = ({ show, onHide, type, products, employees, onSubmit }) => {
  const [form, setForm] = useState({
    partyName: "",
    partyContact: "",
    date: moment().format("YYYY-MM-DD"),
    entryBy: "",
    products: [],
  });

  const addProduct = () => {
    setForm((prev) => ({
      ...prev,
      products: [...prev.products, { name: "", qty: 1, rate: "", total: 0 }],
    }));
  };

  const updateProduct = (index, field, value) => {
    const updated = [...form.products];
    updated[index][field] =
      field === "qty" || field === "rate" ? Number(value) : value;
    updated[index].total =
      (updated[index].qty || 0) * (updated[index].rate || 0);
    setForm((prev) => ({ ...prev, products: updated }));
  };

  const removeProduct = (index) => {
    const updated = [...form.products];
    updated.splice(index, 1);
    setForm((prev) => ({ ...prev, products: updated }));
  };

  const getFilteredProducts = () => {
    const tag = type === "sales" ? "Your Product" : "Raw Material";
    return Array.isArray(products) ? products.filter((p) => p.tag === tag) : [];
  };

  const grandTotal = form.products.reduce((sum, p) => sum + p.total, 0);

  const handleSubmit = () => {
    if (!form.partyName || !form.entryBy || form.products.length === 0) {
      alert("Please fill all required fields.");
      return;
    }
    onSubmit({ ...form, type, grandTotal });
  };
  const filteredParties = partyList.filter((p) =>
    type === "sales"
      ? p.tag === "buyer" || p.tag === "both"
      : p.tag === "supplier" || p.tag === "both"
  );
  return (
    <Modal show={show} onHide={onHide} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>
          {type === "sales" ? "Sales Entry" : "Purchase Entry"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row g-3">
          {/* Party Name Dropdown */}
          <div className="col-md-6">
            <label>Party Name *</label>
            <select
              className="form-select"
              value={form.partyName}
              onChange={(e) => {
                const selected = partyList.find(
                  (p) => p.name === e.target.value
                );
                setForm({
                  ...form,
                  partyName: e.target.value,
                  partyContact: selected?.contact || "",
                });
              }}
            >
              <option value="">Select Party</option>
              {filteredParties.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label>Party Contact</label>
            <input
              type="tel"
              className="form-control"
              value={form.partyContact}
              onChange={(e) =>
                setForm({ ...form, partyContact: e.target.value })
              }
              placeholder="Enter contact number"
            />
          </div>

          {/* Date */}
          <div className="col-md-6">
            <label>Date *</label>
            <input
              type="date"
              className="form-control"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>

          {/* Entry By */}
          <div className="col-md-6">
            <label>Entry By *</label>
            <select
              className="form-select"
              value={form.entryBy}
              onChange={(e) => setForm({ ...form, entryBy: e.target.value })}
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.name}>
                  {emp.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Product Table */}
        <div className="mt-4">
          <h6 className="text-primary">Products</h6>
          {form.products.map((p, idx) => (
            <div className="row g-2 align-items-center mb-2" key={idx}>
              <div className="col-1">{idx + 1}</div>
              <div className="col-3">
                <select
                  className="form-select"
                  value={p.name}
                  onChange={(e) => {
                    const selected = getFilteredProducts().find(
                      (prod) => prod.name === e.target.value
                    );
                    updateProduct(idx, "name", e.target.value);
                    if (selected) updateProduct(idx, "rate", selected.rate);
                  }}
                >
                  <option value="">Select</option>
                  {getFilteredProducts().map((prod) => (
                    <option key={prod.id} value={prod.name}>
                      {prod.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-2">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Qty"
                  value={p.qty}
                  onChange={(e) => updateProduct(idx, "qty", e.target.value)}
                />
              </div>
              <div className="col-2">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Rate"
                  value={p.rate}
                  onChange={(e) => updateProduct(idx, "rate", e.target.value)}
                />
              </div>
              <div className="col-2">₹{p.total}</div>
              <div className="col-2 text-end">
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => removeProduct(idx)}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
          <button
            className="btn btn-sm btn-outline-secondary mt-2"
            onClick={addProduct}
          >
            + Add Product
          </button>
        </div>

        {/* Grand Total */}
        <div className="mt-3 text-end">
          <strong>Grand Total: ₹{grandTotal}</strong>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default TransactionEntry;
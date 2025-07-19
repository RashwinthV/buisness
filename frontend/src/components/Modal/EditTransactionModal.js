import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import moment from "moment";

const partyList = [
  { id: 1, name: "SK Steels", contact: "9876543210", tag: "supplier" },
  { id: 2, name: "Vikram Traders", contact: "9123456780", tag: "buyer" },
  { id: 3, name: "Amman Agencies", contact: "", tag: "both" },
  { id: 4, name: "Bharat Pvt Ltd", contact: "9998877665", tag: "buyer" },
  { id: 5, name: "Surya Traders", contact: "", tag: "supplier" },
];


const dummyProducts = [
  { id: 1, name: "Iron Rod", tag: "Raw Material", rate: 100 },
  { id: 2, name: "Steel Sheet", tag: "Raw Material", rate: 200 },
  { id: 3, name: "Welding Kit", tag: "Your Product", rate: 500 },
];

const EditTransactionModal = ({ show, handleClose, transaction }) => {
  const [form, setForm] = useState({
    partyName: "",
    partyContact: "",
    date: "",
    entryBy: "",
    updatedBy: "Kirithik",
    updatedOn: moment().format("DD-MM-YYYY"),
    products: [],
  });

  const [type, setType] = useState("");

  useEffect(() => {
    if (transaction) {
      const selectedParty = partyList.find(
        (p) => p.name === transaction.partyName
      );
      setForm({
        partyName: transaction.partyName,
        partyContact: selectedParty?.contact || "",
        date: transaction.date.slice(0, 10),
        entryBy: transaction.entryBy,
        products: transaction.products.map((p) => ({
          ...p,
          rate: p.total / p.qty,
        })),
      });
      setType(transaction.type.toLowerCase());
    }
  }, [transaction]);

  const getFilteredProducts = () => {
    const tag = type === "sales" ? "Your Product" : "Raw Material";
    return dummyProducts.filter((p) => p.tag === tag);
  };

  const filteredParties = partyList.filter((p) =>
    type === "sales"
      ? p.tag === "buyer" || p.tag === "both"
      : p.tag === "supplier" || p.tag === "both"
  );

  const updateProduct = (index, field, value) => {
    const updated = [...form.products];
    updated[index][field] =
      field === "qty" || field === "rate" ? Number(value) : value;
    updated[index].total =
      (updated[index].qty || 0) * (updated[index].rate || 0);
    setForm({ ...form, products: updated });
  };

  const addProduct = () => {
    setForm({
      ...form,
      products: [...form.products, { name: "", qty: 1, rate: 0, total: 0 }],
    });
  };

  const removeProduct = (index) => {
    const updated = [...form.products];
    updated.splice(index, 1);
    setForm({ ...form, products: updated });
  };

  const handleSubmit = () => {
    toast.success("Transaction updated successfully!");
    handleClose();
  };

  const grandTotal = form.products.reduce((sum, p) => sum + p.total, 0);

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Edit {transaction?.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row g-3">
          {/* Party Name */}
          <div className="col-md-6">
            <label>Party Name</label>
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

          {/* Contact */}
          <div className="col-md-6">
            <label>Party Contact</label>
            <input
              type="tel"
              className="form-control"
              value={form.partyContact}
              onChange={(e) =>
                setForm({ ...form, partyContact: e.target.value })
              }
            />
          </div>

          {/* Date */}
          <div className="col-md-6">
            <label>Date</label>
            <input
              type="date"
              className="form-control"
              value={form.date}
              disabled
            />
          </div>

          {/* Entry By */}
          <div className="col-md-6">
            <label>Entry By</label>
            <input className="form-control" value={form.entryBy} disabled />
          </div>

          <div className="col-md-6">
            <label>Updated By</label>
            <input className="form-control" value={form.updatedBy} disabled />
          </div>
                    <div className="col-md-6">
            <label>Updated On</label>
            <input className="form-control" value={form.updatedOn} disabled />
          </div>
        </div>

        {/* Product Section */}
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
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTransactionModal;

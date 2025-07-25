import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { printTransactionEntry } from '../../Utils/BillActions';
import { useBusiness } from '../../context/BussinessContext';
import Image_default from "../../Assets/Images/Default.png"; // adjust if path is different

import moment from "moment";
const partyList = [
  { id: 1, name: "SK Steels", contact: "9876543210", city:"Palani", pincode:"624621", tag: "supplier" },
  { id: 2, name: "Vikram Traders", contact: "9123456780", city:"Udumalpet", pincode:"626677",tag: "buyer" },
  { id: 3, name: "Amman Agencies", contact: "", city:"Pollachi", pincode:"",tag: "both" },
  { id: 4, name: "Bharat Pvt Ltd", contact: "9998877665",city:"Palani", pincode:"", tag: "buyer" },
  { id: 5, name: "Surya Traders", contact: "", city:"Palladam", pincode:"",tag: "supplier" },
];

const TransactionEntry = ({ show, onHide, type, products, employees, onSubmit }) => {
  const [form, setForm] = useState({
    partyName: "",
    partyContact: "",
    date: moment().format("DD-MMM-YYYY"),
    entryBy: "",
    products: [],
  });

  const addProduct = () => {
    setForm((prev) => ({
      ...prev,
      products: [...prev.products, { name: "", qty: 1, rate: "", discount:"", total: 0 }],
    }));
  };

const updateProduct = (index, field, value) => {
  const updated = [...form.products];
  updated[index][field] =
    field === "qty" || field === "rate" || field === "discount" ? Number(value) : value;

  const { qty, rate, discount } = updated[index];
  const amount = (qty || 0) * (rate || 0);
  const discountAmt = amount * ((discount || 0) / 100);

  updated[index].total = amount - discountAmt;

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
const { businesses, selectedBusinessId } = useBusiness();

const selectedBusiness = businesses.find(
  (b) => b.businessId === selectedBusinessId
);
  return (
    
    <Modal show={show} onHide={onHide} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>
          
          {type === "sales" ? "Sales Entry" : "Purchase Entry"}
        </Modal.Title>
        
      </Modal.Header>

      <Modal.Body>
        {selectedBusiness && (
<div className="row justify-content-between align-items-center mb-4 p-3 ">

  <div className="col-md-8">
    <h6 className="text-muted">{type === "sales" ? "Sold By" : "Purchased By"}</h6>
    <h4 className="mb-1 fw-bold">{selectedBusiness?.businessName || "-"}</h4>
    <p className="mb-1">
      <i className="bi bi-envelope-fill me-1" />
      {selectedBusiness?.businessEmail || "N/A"}
    </p>
    <p className="mb-0">
      {selectedBusiness?.city || "City"}, {selectedBusiness?.pincode || "Pincode"}
    </p>
  </div>
    <div className="col-md-3 text-center text-md-start mb-3 mb-md-0">
    <img
      src={selectedBusiness?.logo?.imageUrl || require("../../Assets/Images/Default.png")}
      alt="Business Logo"
      style={{
        width: "100px",
        height: "100px",
        objectFit: "contain",
        
      }}
    />
  </div>

</div>

)}
  <hr></hr>
<div className="row">
  {/* LEFT COLUMN */}
  <div className="col-md-6 border-end">
    {/* Name */}
    <div className="d-flex align-items-center mb-3">
      <label className="me-2 mb-0" style={{ minWidth: "110px" }}>
        {type === "sales" ? "Sold to " : "Purchased From"} *
      </label>
      <select
        className="form-select"
        style={{ flex: 1 }}
        value={form.partyName}
        onChange={(e) => {
          const selected = partyList.find((p) => p.name === e.target.value);
          setForm({
            ...form,
            partyName: e.target.value,
            partyContact: selected?.contact || "",
            city: selected?.city || "",
            pincode: selected?.pincode || "",
          });
        }}
      >
        <option value="">
          Select {type === "sales" ? "Customer" : "Vendor"}
        </option>
        {filteredParties.map((p) => (
          <option key={p.id} value={p.name}>
            {p.name}
          </option>
        ))}
      </select>
    </div>

    {/* Contact */}
    <div className="d-flex align-items-center mb-3">
      <label className="me-2 mb-0" style={{ minWidth: "110px" }}>Contact</label>
      <input
        type="tel"
        className="form-control"
        style={{ flex: 1 }}
        value={form.partyContact}
        onChange={(e) => setForm({ ...form, partyContact: e.target.value })}
        placeholder="Enter contact number"
      />
    </div>

    {/* City */}
    <div className="d-flex align-items-center mb-3">
      <label className="me-2 mb-0" style={{ minWidth: "110px" }}>City</label>
      <input
        type="text"
        className="form-control"
        style={{ flex: 1 }}
        value={form.city || ""}
        onChange={(e) => setForm({ ...form, city: e.target.value })}
        placeholder="Enter city"
      />
    </div>

    {/* Pincode */}
    <div className="d-flex align-items-center mb-3">
      <label className="me-2 mb-0" style={{ minWidth: "110px" }}>Pin</label>
      <input
        type="text"
        className="form-control"
        style={{ flex: 1 }}
        value={form.pincode || ""}
        onChange={(e) => setForm({ ...form, pincode: e.target.value })}
        placeholder="Enter pincode"
      />
    </div>
  </div>

  {/* RIGHT COLUMN */}
  <div className="col-md-6">
    {/* Entry ID (Optional – if you use it) */}
    <div className="d-flex align-items-center mb-3">
      <label className="me-2 mb-0" style={{ minWidth: "110px" }}>Entry ID</label>
      <input
        type="text"
        className="form-control"
        style={{ flex: 1 }}
        value={form.entryId || ""}
        onChange={(e) => setForm({ ...form, entryId: e.target.value })}
        placeholder="Auto or Manual Entry ID"
      />
    </div>

    {/* Incharge */}
    <div className="d-flex align-items-center mb-3">
      <label className="me-2 mb-0" style={{ minWidth: "110px" }}>Incharge *</label>
      <select
        className="form-select"
        style={{ flex: 1 }}
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

    {/* Date */}
    <div className="d-flex align-items-center mb-3">
      <label className="me-2 mb-0" style={{ minWidth: "110px" }}>Date *</label>
      <input
        type="date"
        className="form-control"
        style={{ flex: 1 }}
        value={moment(form.date, "DD-MMM-YYYY").format("YYYY-MM-DD")}
        onChange={(e) =>
          setForm({ ...form, date: moment(e.target.value).format("DD-MMM-YYYY") })
        }
      />
    </div>
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
              <div className="col-1">
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
                            <div className="col-2">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Discounts"
                  value={p.discount}
                  onChange={(e) => updateProduct(idx, "discount", e.target.value)}
                />
              </div>
              <div className="col-1">₹{p.total}</div>
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
                <Button variant="secondary" onClick={() => printTransactionEntry(form, type, selectedBusiness)}>
          Print & Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default TransactionEntry;
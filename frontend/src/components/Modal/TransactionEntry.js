import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { printTransactionEntry } from '../../Utils/BillActions';
import { useBusiness } from '../../context/BussinessContext';
import moment from "moment";

const partyList = [
  { id: 1, name: "SK Steels", contact: "9876543210", city: "Palani", pincode: "624621", tag: "supplier" },
  { id: 2, name: "Vikram Traders", contact: "9123456780", city: "Udumalpet", pincode: "626677", tag: "buyer" },
  { id: 3, name: "Amman Agencies", contact: "", city: "Pollachi", pincode: "", tag: "both" },
  { id: 4, name: "Bharat Pvt Ltd", contact: "9998877665", city: "Palani", pincode: "", tag: "buyer" },
  { id: 5, name: "Surya Traders", contact: "", city: "Palladam", pincode: "", tag: "supplier" },
];

const TransactionEntry = ({ show, onHide, type, products, employees, onSubmit }) => {
  const [form, setForm] = useState({
    partyName: "",
    partyContact: "",
    date: moment().format("DD-MMM-YYYY"),
    entryBy: "",
    products: [{ name: "", qty: 1, rate: "", total: 0 }],
    commonDiscount: 0
  });

  const { businesses, selectedBusinessId } = useBusiness();
  const selectedBusiness = businesses.find(b => b.businessId === selectedBusinessId);

  const isProductValid = (product) => product.name && product.qty > 0 && product.rate > 0;

  const getFilteredProducts = () => {
    const tag = type === "sales" ? "Your Product" : "Raw Material";
    return Array.isArray(products) ? products.filter((p) => p.tag === tag) : [];
  };

  const updateProduct = (index, field, value) => {
    const updated = [...form.products];
    updated[index][field] = (field === "qty" || field === "rate") ? Number(value) : value;
    const { qty, rate } = updated[index];
    updated[index].total = (qty || 0) * (rate || 0);
    setForm(prev => ({ ...prev, products: updated }));
  };

  const addProduct = () => {
    const last = form.products[form.products.length - 1];
    if (!isProductValid(last)) {
      alert("Please complete the current product row before adding a new one.");
      return;
    }
    setForm(prev => ({
      ...prev,
      products: [...prev.products, { name: "", qty: 1, rate: "", total: 0 }],
    }));
  };

  const removeProduct = (index) => {
    const updated = [...form.products];
    updated.splice(index, 1);
    setForm(prev => ({ ...prev, products: updated }));
  };

  const subtotal = form.products.reduce((sum, p) => sum + (p.qty || 0) * (p.rate || 0), 0);
  const totalDiscount = (subtotal * (form.commonDiscount || 0)) / 100;
  const grandTotal = subtotal - totalDiscount;

  const handleSubmit = () => {
    const allValid = form.products.every(isProductValid);
    if (!form.partyName || !form.entryBy || !allValid) {
      alert("Please fill all required fields and complete product entries.");
      return;
    }
    onSubmit({ ...form, type, grandTotal });
  };

  const filteredParties = partyList.filter(p =>
    type === "sales" ? p.tag === "buyer" || p.tag === "both" : p.tag === "supplier" || p.tag === "both"
  );

  return (
    <Modal show={show} onHide={onHide} size="xl" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>{type === "sales" ? "Sales Entry" : "Purchase Entry"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        {/* Business Info */}
        {selectedBusiness && (
          <div className="row justify-content-between align-items-center mb-4 p-3">
            <div className="col-md-8">
              <h6 className="text-muted">{type === "sales" ? "Sold By" : "Purchased By"}</h6>
              <h4 className="fw-bold mb-1">{selectedBusiness?.businessName || "-"}</h4>
              <p className="mb-1"><i className="bi bi-envelope-fill me-1" />{selectedBusiness?.businessEmail || "N/A"}</p>
              <p className="mb-0">{selectedBusiness?.city || "City"}, {selectedBusiness?.pincode || "Pincode"}</p>
            </div>
            <div className="col-md-3 text-center">
              <img
                src={selectedBusiness?.logo?.imageUrl || require("../../Assets/Images/Default.png")}
                alt="Business Logo"
                style={{ width: "100px", height: "100px", objectFit: "contain" }}
              />
            </div>
          </div>
        )}

        {/* Party Info */}
        <hr />
        <div className="row">
<div className="col-md-6 border-end">
  <label className="form-label mb-3">
    {type === "sales" ? "Customer Details" : "Vendor Details"} *
  </label>

  {/* Row 1: Party Name + Contact */}
  <div className="d-flex flex-wrap gap-3 mb-3">
    <div className="flex-grow-1" style={{ flexBasis: "45%" }}>
      <select
        className="form-select"
        value={form.partyName}
        onChange={(e) => {
          const selected = partyList.find(p => p.name === e.target.value);
          setForm({
            ...form,
            partyName: e.target.value,
            partyContact: selected?.contact || "",
            city: selected?.city || "",
            pincode: selected?.pincode || ""
          });
        }}
      >
        <option value="">Select {type === "sales" ? "Customer" : "Vendor"}</option>
        {filteredParties.map(p => (
          <option key={p.id} value={p.name}>{p.name}</option>
        ))}
      </select>
    </div>
    <div className="flex-grow-1" style={{ flexBasis: "45%" }}>
      <input
        type="tel"
        className="form-control"
        placeholder="Contact Number"
        value={form.partyContact}
        onChange={(e) => setForm({ ...form, partyContact: e.target.value })}
      />
    </div>
  </div>

  {/* Row 2: City + Pincode */}
  <div className="d-flex flex-wrap gap-3 mb-3">
    <div className="flex-grow-1" style={{ flexBasis: "45%" }}>
      <input
        type="text"
        className="form-control"
        placeholder="City"
        value={form.city || ""}
        onChange={(e) => setForm({ ...form, city: e.target.value })}
      />
    </div>
    <div className="flex-grow-1" style={{ flexBasis: "45%" }}>
      <input
        type="text"
        className="form-control"
        placeholder="Pincode"
        value={form.pincode || ""}
        onChange={(e) => setForm({ ...form, pincode: e.target.value })}
      />
    </div>
  </div>
</div>


<div className="col-md-6">
  <label className="form-label mb-3">Transaction Details</label>

  {/* Row 1: Entry ID + Incharge */}
  <div className="d-flex flex-wrap gap-3 mb-3">
    <div className="flex-grow-1" style={{ flexBasis: "45%" }}>
      <input
        type="text"
        className="form-control"
        placeholder="Entry ID"
        value={form.entryId || ""}
        onChange={(e) => setForm({ ...form, entryId: e.target.value })}
      />
    </div>

    <div className="flex-grow-1" style={{ flexBasis: "45%" }}>
      <select
        className="form-select"
        value={form.entryBy}
        onChange={(e) => setForm({ ...form, entryBy: e.target.value })}
      >
        <option value="">Select Incharge</option>
        {employees.map(emp => (
          <option key={emp.id} value={emp.name}>{emp.name}</option>
        ))}
      </select>
    </div>
  </div>

  {/* Row 2: Date */}
  <div className="d-flex gap-3">
    <div className="flex-grow-1" style={{ flexBasis: "45%" }}>
      <input
        type="date"
        className="form-control"
        disabled
        value={moment(form.date, "DD-MMM-YYYY").format("YYYY-MM-DD")}
        onChange={(e) =>
          setForm({ ...form, date: moment(e.target.value).format("DD-MMM-YYYY") })
        }
      />
    </div>
  </div>
</div>

        </div>

        {/* Product Table */}
        <hr />
        <div className="mt-4">
          <h6 className="text-primary">Products</h6>
          <table className="table table-bordered table-sm align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {form.products.map((p, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>
                    <select className="form-select" value={p.name} onChange={(e) => {
                      const selected = getFilteredProducts().find(prod => prod.name === e.target.value);
                      updateProduct(idx, "name", e.target.value);
                      if (selected) updateProduct(idx, "rate", selected.rate);
                    }}>
                      <option value="">Select</option>
                      {getFilteredProducts().map(prod => <option key={prod.id} value={prod.name}>{prod.name}</option>)}
                    </select>
                  </td>
                  <td><input type="number" className="form-control" value={p.qty} onChange={(e) => updateProduct(idx, "qty", e.target.value)} /></td>
                  <td><input type="number" className="form-control" value={p.rate} onChange={(e) => updateProduct(idx, "rate", e.target.value)} /></td>
                  <td>₹{p.total.toFixed(2)}</td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-danger" onClick={() => removeProduct(idx)}>×</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="btn btn-sm btn-outline-secondary mt-2" onClick={addProduct}>+ Add Product</button>

          <div className="mt-3 d-flex justify-content-end align-items-center">
            <label className="me-2 mb-0">Discount %</label>
            <input type="number" className="form-control" style={{ width: "100px" }} value={form.commonDiscount} onChange={(e) => setForm({ ...form, commonDiscount: Number(e.target.value) })} />
          </div>
        </div>

        {/* Totals */}
        <div className="mt-3 text-end">
          <p><strong>Subtotal:</strong> ₹{subtotal.toFixed(2)}</p>
          <p><strong>Discount ({form.commonDiscount}%):</strong> ₹{totalDiscount.toFixed(2)}</p>
          <p><strong>Grand Total:</strong> ₹{grandTotal.toFixed(2)}</p>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="success" onClick={handleSubmit}>Save</Button>
        <Button variant="secondary" onClick={() => {
          const allValid = form.products.every(isProductValid);
          if (!form.partyName || !form.entryBy || !allValid) {
            alert("Please fill all required fields and complete product entries.");
            return;
          }
          printTransactionEntry(form, type, selectedBusiness);
        }}>Print & Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TransactionEntry;

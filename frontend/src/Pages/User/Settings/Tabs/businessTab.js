import { useEffect, useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { useBusiness } from "../../../../context/BussinessContext";
import BusinessBanner from "../../../../Utils/BusinessBanner";

const BusinessTab = ({ businessId, token, baseUrl }) => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const { businesses, selectedBusinessId } = useBusiness();
  const selectedBusiness = businesses.find(
    (b) => b.businessId === selectedBusinessId
  );

  const statusOptions = ["active", "inactive"];

  // Load current status on mount
  useEffect(() => {
    if (selectedBusiness) {
      setStatus(selectedBusiness.status || "");
    }
  }, [selectedBusiness]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setLoading(true);

    try {
      const res = await fetch(`${baseUrl}/v3/business/${businessId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Business status updated");
      } else {
        toast.error(result?.message || "Status update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while updating status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BusinessBanner business={selectedBusiness} />

      <Form.Group controlId="statusSelect" className="mt-3">
        <Form.Label>Business Status</Form.Label>
        <Form.Select value={status} onChange={handleStatusChange}>
          <option value="" disabled>
            -- Select Status --
          </option>
          {statusOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      {loading && <Spinner animation="border" size="sm" className="mt-2" />}
    </>
  );
};

export default BusinessTab;

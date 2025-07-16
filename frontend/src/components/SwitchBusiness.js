import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // ✅ import
import { useBusiness } from "../context/BussinessContext";

const SwitchBusiness = ({
  show,
  onClose,
  // businesses = [],
  selectedBusiness,
  onSwitch,
  onAddBusiness,
}) => {
  const navigate = useNavigate();
  const { businesses, setSelectedBusinessId } = useBusiness();
  const setAccount=(AccountId)=>{
    setSelectedBusinessId(AccountId)
  }

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Switch Business</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {businesses.length === 0 ? (
          <p className="text-muted">No businesses available.</p>
        ) : (
          <ul className="list-group mb-3">
            {businesses.map((biz) => (
              <li
                key={biz.id}
                className={`list-group-item d-flex justify-content-between align-items-center ${
                  selectedBusiness?.id === biz.id ? "active text-white" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  onSwitch(biz);
                  onClose();
                  setAccount(biz?.id)
                  navigate("/businessdashboard"); // ✅ navigate to business dashboard
                }}
              >
                {biz.name}
                {selectedBusiness?.id === biz.id && (
                  <i className="bi bi-check-circle-fill"></i>
                )}
              </li>
            ))}
          </ul>
        )}

        <div className="d-grid">
          <Button
            variant="outline-primary"
            onClick={() => {
              onClose();
              navigate("/businessregister");
            }}
          >
            <i className="bi bi-plus-lg me-1"></i> Add Another Business
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default SwitchBusiness;

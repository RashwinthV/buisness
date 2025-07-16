import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // ✅ import
import { useBusiness } from "../context/BussinessContext";
import Image_default from "../../src/Assets/Images/Default.png"; // ✅ import default image

const SwitchBusiness = ({
  show,
  onClose,
  onSwitch,
  onAddBusiness,
}) => {
  const navigate = useNavigate();
  const { businesses, setSelectedBusinessId ,selectedBusinessId} = useBusiness();
  const selectedBusiness = businesses?.find((b) => b.businessId === selectedBusinessId);

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
          // <ul className="list-group mb-3">
          //   {businesses.map((biz) => (
          //     <li
          //       key={biz.businessId}
          //       className={`list-group-item d-flex justify-content-between align-items-center ${
          //         selectedBusiness?.businessId === biz.businessId ? "active text-white" : ""
          //       }`}
          //       style={{ cursor: "pointer" }}
          //       onClick={() => {
          //         onSwitch(biz);
          //         onClose();
          //         setAccount(biz?.businessId)
          //         navigate(`/businessdashboard/${biz.businessId}`);
          //       }}
          //     >
          //       {biz.name}
          //       {selectedBusiness?.businessId === biz.businessId && (
          //         <i className="bi bi-check-circle-fill"></i>
          //       )}
          //     </li>
          //   ))}
          // </ul>
          <ul className="list-group mb-3">
  {businesses.map((biz) => (
    <li
      key={biz.businessId}
      className={`list-group-item d-flex justify-content-between align-items-center ${
        selectedBusiness?.businessId === biz.businessId ? "active text-white" : ""
      }`}
      style={{ cursor: "pointer" }}
      onClick={() => {
        onSwitch(biz);
        onClose();
        setAccount(biz?.businessId);
        navigate(`/businessdashboard/${biz.businessId}`);
      }}
    >
      <div className="d-flex align-items-center gap-2">
        <img
          src={biz.bussinessLogo || Image_default}
          alt="Business Logo"
          className="rounded-circle"
          width="32"
          height="32"
          style={{ objectFit: "fill",  }}
        />
        <span>{biz.name}</span>
      </div>

      {selectedBusiness?.businessId === biz.businessId && (
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

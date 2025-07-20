import "../Styles/ModalWrapper.css";

const ModalWrapper = ({ children }) => {

  return <div className="modal-overlay">{children}</div>;
};

export default ModalWrapper;

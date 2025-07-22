
import { Routes, Route, useNavigate } from "react-router-dom";
import ModalWrapper from "../Utils/ModalWrapper";
import AddProductModal from "../components/Modal/AddProductModal";
import AddEmployeeModal from "../components/Modal/AddEmployeeModal";
import AddVehicleModal from "../components/Modal/AddVehicleModal";
import AddTradePartyModal from "../components/Modal/AddTradePartyModal";


const ModalRoutes = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/managebusiness/:businessId/manageproducts/Add_Product"
        element={
          <ModalWrapper>
            <AddProductModal show={true} handleClose={() => navigate(-1)} />
          </ModalWrapper>
        }
      />
      <Route
        path="/managebusiness/:businessId/manageemployees/Add_Employee"
        element={
          <ModalWrapper>
            <AddEmployeeModal show={true} handleClose={() => navigate(-1)} />
          </ModalWrapper>
        }
      />
      <Route
        path="/managebusiness/:businessId/managevehicles/Add_Vechile"
        element={
          <ModalWrapper>
            <AddVehicleModal show={true} handleClose={() => navigate(-1)} />
          </ModalWrapper>
        }
      />
      <Route
        path="/managebusiness/:businessId/managetradeparties/Add_Trader"
        element={
          <ModalWrapper>
            <AddTradePartyModal show={true} handleClose={() => navigate(-1)} />
          </ModalWrapper>
        }
      />
    </Routes>
  );
};

export default ModalRoutes;

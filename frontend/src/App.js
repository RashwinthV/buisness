import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./components/Layout";
import ProfileCard from "./Pages/Profile";
import LoginForm from "./Pages/Login&register/Login";
import RegisterForm from "./Pages/Login&register/Register";
import Developers from "./Pages/Developers.js";
import { ToastContainer } from "react-toastify";
import Plans from "./Pages/Plans.js";
import Settings from "./Pages/Settings.js";
import BusinessRegister from "./Pages/Business/BusinessRegister.js";
import BusinessDashboard from "./Pages/Business/BusinessDashboard.js";
import AddProduct from "./Pages/Business/AddProduct.js";
import AddEmployee from "./Pages/Business/AddEmployee.js";
import AddTrader from "./Pages/Business/AddTrader.js";
import ManageBusiness from "./Pages/Business/ManageBusiness.js";
import { AppProviders } from "./context/AppProviders.js";

function App() {
  return (
    <AppProviders>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<ProfileCard />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/managebusiness/:bussinessId" element={<ManageBusiness />} />
          <Route path="/businessregister" element={<BusinessRegister />} />
          <Route path="/businessdashboard/:bussinessId" element={<BusinessDashboard />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/addemployee" element={<AddEmployee />} />
          <Route path="/addtrader" element={<AddTrader />} />
        </Route>
      </Routes>
    </AppProviders>
  );
}

export default App;

// 🌐 React & Routing
import { Route, Routes } from "react-router-dom";

// 🎨 Global Styles
import "./App.css";

// 🔔 Notifications
import { ToastContainer } from "react-toastify";

// 🧠 Context Providers
import { AppProviders } from "./context/AppProviders.js";

// 🧱 Layout Components
import Layout from "./components/Layout/Layout.js";

// 👤 User Pages
import Home from "./Pages/User/Home.js";
import ProfileCard from "./Pages/User/Profile.js";
import Plans from "./Pages/User/Plans.js";
import Settings from "./Pages/User/Settings.js";
import Developers from "./Pages/User/Developers.js";

// 🔐 Authentication Pages
import LoginForm from "./Pages/Auth/Login.js";
import RegisterForm from "./Pages/Auth/Register.js";

// 🏢 Business Management Pages
import BusinessRegister from "./Pages/Business/BusinessRegister.js";
import BusinessProfile from "./Pages/Business/BusinessProfile.js";
import AddProduct from "./Pages/Business/AddProduct.js";
import AddEmployee from "./Pages/Business/AddEmployee.js";
import AddVehicle from "./Pages/Business/AddVehicle.js";
import AddTradeParty from "./Pages/Business/AddTradeParty.js";

// 📊 Business Dashboard Pages
import BusinessDashboard from "./Pages/Dashboard/BusinessDashboard.js";
import ManageBusiness from "./Pages/Dashboard/ManageBusiness.js";
import AllBusinesses from "./Pages/Dashboard/AllBusinesses.js";
import Entry from "./Pages/Dashboard/Entry.js";


function App() {
  return (
    <AppProviders>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* 👤 User Routes */}
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<ProfileCard />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/settings" element={<Settings />} />

          {/* 🔐 Authentication */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />

          {/* 🏢 Business Management */}
          <Route path="/businessregister" element={<BusinessRegister />} />
          <Route path="/businessprofile" element={<BusinessProfile />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/addemployee" element={<AddEmployee />} />
          <Route path="/addvehicle" element={<AddVehicle />} />
          <Route path="/addtradeparty" element={<AddTradeParty />} />

          {/* 📊 Business Dashboard */}
          <Route path="/businessdashboard/:bussinessId" element={<BusinessDashboard />} />
          <Route path="/managebusiness/:bussinessId" element={<ManageBusiness />} />
          <Route path="/allbusinesses" element={<AllBusinesses />} />
          <Route path="/entry" element={<Entry />} />
        </Route>
      </Routes>
    </AppProviders>
  );
}

export default App;

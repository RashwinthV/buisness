import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./components/Layout";
import ProfileCard from "./Pages/Profile";
import LoginForm from "./Pages/Login&register/Login";
import RegisterForm from "./Pages/Login&register/Register";
import { UserProvider } from "./context/userContext.js";
import Developers from "./Pages/Developers.js";
import { ToastContainer } from "react-toastify";
import Plans from "./Pages/Plans.js";
import Settings from "./Pages/Settings.js";
import BusinessRegister from "./Pages/Business/BusinessRegister.js";
import BusinessDashboard from "./Pages/Business/BusinessDashboard.js";

function App() {
  return (
    <UserProvider>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/profile" element={<ProfileCard />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/businessregister" element={<BusinessRegister />} />
          <Route path="/businessdashboard" element={<BusinessDashboard />} />

        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;

// routes/appRoutes.js
import Home from "../Pages/User/Home";
import ProfileCard from "../Pages/User/Profile";
import Plans from "../Pages/User/Plans";
import Settings from "../Pages/User/Settings";
import Developers from "../Pages/User/Developers";

import LoginForm from "../Pages/Auth/Login";
import RegisterForm from "../Pages/Auth/Register";

import BusinessRegister from "../Pages/Business/BusinessRegister";
import BusinessProfile from "../Pages/Business/BusinessProfile";
import AddProduct from "../Pages/Business/AddProduct";
import AddEmployee from "../Pages/Business/AddEmployee";
import AddVehicle from "../Pages/Business/AddVehicle";
import AddTradeParty from "../Pages/Business/AddTradeParty";

import BusinessDashboard from "../Pages/Dashboard/BusinessDashboard";
import ManageBusiness from "../Pages/Dashboard/ManageBusiness";
import AllBusinesses from "../Pages/Dashboard/AllBusinesses";
import Transactions from "../Pages/Dashboard/Transactions";

import ProtectedBusiness from "../context/ProtectedBusinessRoute";
import Layout from "../components/Layout/Layout";


    


const appRoutes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "profile", element: <ProfileCard /> },
      { path: "developers", element: <Developers /> },
      { path: "plans", element: <Plans /> },
      { path: "settings", element: <Settings /> },

      { path: "login", element: <LoginForm /> },
      { path: "register", element: <RegisterForm /> },

      { path: "businessregister", element: <BusinessRegister /> },
      { path: "businessprofile", element: <BusinessProfile /> },
      { path: "addproduct", element: <AddProduct /> },
      { path: "addemployee", element: <AddEmployee /> },
      { path: "addvehicle", element: <AddVehicle /> },
      { path: "addtradeparty", element: <AddTradeParty /> },

      {
        path: "businessdashboard/:businessId",
        element: (
          <ProtectedBusiness>
            <BusinessDashboard />
          </ProtectedBusiness>
        ),
      },
      {
        path: "managebusiness/:businessId",
        element: (
          <ProtectedBusiness>
            <ManageBusiness />
          </ProtectedBusiness>
        ),
      },
      {
        path: "transactions/:businessId",
        element: (
          <ProtectedBusiness>
            <Transactions />
          </ProtectedBusiness>
        ),
      },
      {
        path: "allbusinesses",
        element: <AllBusinesses />,
      },
    ],
  },
];

export default appRoutes;

import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import NavbarComponent from "./Navbar";

const Layout = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="main-content flex-grow-1">
        <NavbarComponent />
        <main
          className="w-full p-4 overflow-y-auto mt-5"
          style={{
            marginLeft: window.innerWidth >= 768 ? "220px" : "0",
            paddingBottom: window.innerWidth < 768 ? "60px" : "0", 
            transition: "margin-left 0.3s ease",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

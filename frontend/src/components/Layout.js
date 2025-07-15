import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import NavbarComponent from "./Navbar";

const Layout = () => {
  return (
    <div className="container-fluid">
      <Sidebar />
      <NavbarComponent />
      <div className="">
        <main className="container-fluid">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

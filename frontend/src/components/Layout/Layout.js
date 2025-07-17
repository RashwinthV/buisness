import Sidebar from "../Layout/Sidebar";
import NavbarComponent from "./Navbar";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../Styles/Layout.css";

const Layout = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarWidth = isSidebarCollapsed ? 70 : 220;

  return (
    <div className="layout-container">
      <NavbarComponent />

      <div
        className="layout-content"
        style={{
          marginTop: "56px",
          display: "flex",
          flexDirection: isLargeScreen ? "row" : "column",
        }}
      >
        {isLargeScreen ? (
          <div
            style={{
              width: `${sidebarWidth}px`,
              transition: "width 0.3s",
              flexShrink: 0,
            }}
          >
            <Sidebar
              isCollapsed={isSidebarCollapsed}
              setIsCollapsed={setIsSidebarCollapsed}
            />
          </div>
        ) : null}

        <main
          className="flex-grow-1 p-3"
          style={{
            marginBottom: isLargeScreen ? 0 : "60px", // reserve space for bottom sidebar
            width: "100%",
          }}
        >
          <Outlet />
        </main>

        {/* Bottom Sidebar for small screens */}
        {!isLargeScreen && (
          <div className="bottom-sidebar">
            <Sidebar isCollapsed={true} setIsCollapsed={() => {}} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;

// import Sidebar from "./Sidebar";
// import NavbarComponent from "./Navbar";
// import { Outlet } from "react-router-dom";
// import { useState, useEffect } from "react";
// import "../Styles/Sidebar.css";

// const Layout = () => {
//   const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsLargeScreen(window.innerWidth >= 768);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div>
//       <NavbarComponent />
//       <div className="d-flex" style={{ marginTop: "56px" }}>
//         <Sidebar />
//         <main
//           className="flex-grow-1 p-3"
//           style={{
//             marginLeft: isLargeScreen ? "220px" : "0",
//             marginBottom: isLargeScreen ? "0" : "60px", // for bottom bar
//             transition: "margin 0.3s",
//           }}
//         >
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;

import Sidebar from "./Sidebar";
import NavbarComponent from "./Navbar";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import "../Styles/Sidebar.css";

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
    <div>
      <NavbarComponent />
      <div className="d-flex" style={{ marginTop: "56px" }}>
        {/* Sidebar visible only on large screens */}
        {isLargeScreen && (
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            setIsCollapsed={setIsSidebarCollapsed}
          />
        )}

        <main
          className="flex-grow-1 p-3"
          style={{
            marginLeft: isLargeScreen ? `${sidebarWidth}px` : "0",
            marginBottom: "60px",
            transition: "margin 0.3s",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;


// import Sidebar from "./Sidebar";
// import NavbarComponent from "./Navbar";
// import { Outlet } from "react-router-dom";
// import { useState, useEffect } from "react";
// import "../Styles/Sidebar.css";

// const Layout = () => {
//   const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);
//   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsLargeScreen(window.innerWidth >= 768);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const sidebarWidth = isSidebarCollapsed ? 70 : 220;

//   return (
//     <div>
//       <NavbarComponent />
//       <div className="d-flex" style={{ marginTop: "56px" }}>
//         <Sidebar
//           isCollapsed={isSidebarCollapsed}
//           setIsCollapsed={setIsSidebarCollapsed}
//         />
//         <main
//           className="flex-grow-1 p-3"
//           style={{
//             marginLeft: isLargeScreen ? `${sidebarWidth}px` : "0",
//             marginBottom: isLargeScreen ? "0" : "60px",
//             transition: "margin 0.3s",
//           }}
//         >
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;

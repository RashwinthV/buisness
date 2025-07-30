// import { Outlet, useNavigate, useParams, useLocation } from "react-router-dom";
// import { useBusiness } from "../../context/BussinessContext";
// import BusinessBanner from "../../Utils/BusinessBanner";
// import { useEffect, useMemo, useState } from "react";

// const ManageBusiness = () => {
//   const { businessId } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { businesses } = useBusiness();

//   const selectedBusiness = businesses?.find(
//     (b) => String(b.businessId) === businessId
//   );

//   const basePath = `/managebusiness/${businessId}`;

//   // ✅ Use useMemo to avoid re-creating tabs array every render
//   const tabs = useMemo(() => [
//     { label: "Manage Business", path: "businessProfile" },
//     { label: "Manage Products", path: "manageproducts" },
//     { label: "Manage Employees", path: "manageemployees" },
//     { label: "Manage Vehicles", path: "managevehicles" },
//     { label: "Manage Trade Parties", path: "managetradeparties" },
//   ], []);

//   const [activeTab, setActiveTab] = useState("Manage Business");

//   // ✅ Update activeTab when path changes
//   useEffect(() => {
//     const currentPath = location.pathname;

//     const matchedTab = tabs.find((tab) =>
//       currentPath.endsWith(`/${tab.path}`) || currentPath === `${basePath}`
//     );

//     if (matchedTab) {
//       setActiveTab(matchedTab.label);
//     }
//   }, [location.pathname, basePath, tabs]);

//   return (
//     <div className="container ">
//       <div className="card shadow-sm border-0 mb-4">
//         <BusinessBanner business={selectedBusiness} />
//       </div>

//       <div className="container mt-3">
//         <div className="d-flex flex-wrap gap-2 mb-3">
//           {tabs.map((tab) => (
//             <button
//               key={tab.label}
//               className={`btn btn-sm ${
//                 activeTab === tab.label ? "btn-primary" : "btn-outline-primary"
//               }`}
//               onClick={() => {
//                 setActiveTab(tab.label);
//                 navigate(`${basePath}/${tab.path}`);
//               }}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         <div className="bg-white">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManageBusiness;
import { Outlet, useNavigate, useParams, useLocation } from "react-router-dom";
import { useBusiness } from "../../context/BussinessContext";
import BusinessBanner from "../../Utils/BusinessBanner";
import { useEffect, useMemo, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";

const ManageBusiness = () => {
  const { businessId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { businesses } = useBusiness();

  const selectedBusiness = businesses?.find(
    (b) => String(b.businessId) === businessId
  );

  const basePath = `/managebusiness/${businessId}`;

  const tabs = useMemo(
    () => [
      { label: "Manage Business", path: "businessProfile" },
      { label: "Manage Products", path: "manageproducts" },
      { label: "Manage Employees", path: "manageemployees" },
      { label: "Manage Vehicles", path: "managevehicles" },
      { label: "Manage Trade Parties", path: "managetradeparties" },
    ],
    []
  );

  const [activeTab, setActiveTab] = useState("Manage Business");

  useEffect(() => {
    const currentPath = location.pathname;

    const matchedTab = tabs.find(
      (tab) =>
        currentPath.endsWith(`/${tab.path}`) || currentPath === `${basePath}`
    );

    if (matchedTab) {
      setActiveTab(matchedTab.label);
    }
  }, [location.pathname, basePath, tabs]);

  const handleTabSelect = (key) => {
    setActiveTab(key);
    const selectedTab = tabs.find((tab) => tab.label === key);
    if (selectedTab) {
      navigate(`${basePath}/${selectedTab.path}`);
    }
  };

  return (
    <div className="container">
      <div className="card shadow-sm border-0 mb-4">
        <BusinessBanner business={selectedBusiness} />
      </div>

      <div className="container mt-3">
        <Tabs activeKey={activeTab} onSelect={handleTabSelect} className="mb-3 custom-manage-tabs" justify>
          {tabs.map((tab) => (
            <Tab eventKey={tab.label} title={tab.label} key={tab.label} />
          ))}
        </Tabs>

        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ManageBusiness;

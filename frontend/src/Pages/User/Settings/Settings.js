import { Tab, Tabs } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const SettingsTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the tab key from the pathname, e.g., '/settings/business' → 'business'
  const currentKey = location.pathname.split("/")[2] || "general";

  const handleTabSelect = (key) => {
    navigate(`/settings/${key}`);
  };

  return (
    <>
      <Tabs
        activeKey={currentKey}
        onSelect={handleTabSelect}
        className="mb-3 gap-4 custom-settings-tabs"
      >
        <Tab eventKey="general" title="General" />
        <Tab eventKey="business" title="Business" />
        <Tab eventKey="account" title="Account Status" />
      </Tabs>

      {/* Render nested route content here */}
      <Outlet />
    </>
  );
};

export default SettingsTabs;

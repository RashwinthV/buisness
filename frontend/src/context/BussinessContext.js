import { createContext, useState, useContext, useEffect } from "react";

const BusinessContext = createContext();
export const useBusiness = () => useContext(BusinessContext);

// Create provider
export const BusinessProvider = ({ children }) => {
  const [businesses, setBusinesses] = useState([
    { id: 1, name: "India Cricket" },
    { id: 2, name: "Royal Challengers Bengaluru" },
  ]);

  const [selectedBusinessId, setSelectedBusinessId] = useState(null);

  // ✅ Set default selectedBusinessId on first load
  useEffect(() => {
    const storedId = localStorage.getItem("AccountId");

    if (storedId) {
      setSelectedBusinessId(parseInt(storedId));
    } else {
      // Default to first business ID
      const defaultId = businesses[0]?.id;
      if (defaultId) {
        setSelectedBusinessId(defaultId);
        localStorage.setItem("AccountId", defaultId);
      }
    }
  }, [businesses]);

  // ✅ Update localStorage whenever selection changes
  useEffect(() => {
    if (selectedBusinessId) {
      localStorage.setItem("AccountId", selectedBusinessId);
    }
  }, [selectedBusinessId]);

  return (
    <BusinessContext.Provider
      value={{
        businesses,
        setBusinesses,
        selectedBusinessId,
        setSelectedBusinessId,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

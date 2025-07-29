import { createContext, useState, useContext, useEffect } from "react";
import { useUser } from "./userContext";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const BusinessContext = createContext();
export const useBusiness = () => useContext(BusinessContext);

export const BusinessProvider = ({ children }) => {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusinessId, setSelectedBusinessId] = useState(null);
  const [allbusinesses, setallBusinesses] = useState([]);
  const [settingsBusiness, setsettingsBusiness] = useState([]);

  const baseUrl = process.env.REACT_APP_BACKEND_URI;
  const { user } = useUser();
  const token = localStorage.getItem("token");

  // ✅ Fetch businesses from backend based on user
  useEffect(() => {
    const fetchBusinesses = async () => {
      if (!user?.id) return;

      try {
        const response = await fetch(
          `${baseUrl}/v2/bussiness/getbussiness/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setBusinesses(data || []);
        } else {
          toast.error(data?.message || "Failed to fetch businesses");
          <Navigate to="/businessregister" />;
        }
      } catch (error) {
        toast.error("Error fetching businesses");
        console.error(error);
      }
    };

    const allbusinesses = async () => {
      if (!user?.id) return;

      try {
        const response = await fetch(
          `${baseUrl}/v2/bussiness/getAllbussiness/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setallBusinesses(data || []);
        } else {
          toast.error(data?.message || "Failed to fetch businesses");
        }
      } catch (error) {
        toast.error("Error fetching businesses");
        console.error(error);
      }
    };
    const settingsbusinesses = async () => {
      if (!user?.id) return;

      try {
        const response = await fetch(
          `${baseUrl}/v2/bussiness/bussinessstatus/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setsettingsBusiness(data || []);
        } else {
          toast.error(data?.message || "Failed to fetch businesses");
        }
      } catch (error) {
        toast.error("Error fetching businesses");
        console.error(error);
      }
    };

    allbusinesses();
    fetchBusinesses();
    settingsbusinesses();
  }, [user, baseUrl, token]);

  useEffect(() => {
    if (businesses.length === 0) return;

    const storedId = localStorage.getItem("AccountId");
    const storedIdAsNumber = storedId ? parseInt(storedId) : null;

    // ❌ Fix this line
    const isValidStoredId = businesses.some(
      (b) => b.businessId === storedIdAsNumber
    );

    if (isValidStoredId) {
      setSelectedBusinessId(storedIdAsNumber);
    } else {
      const defaultId = businesses[0]?.businessId; // ✅ Fix here too
      if (defaultId) {
        setSelectedBusinessId(defaultId);
        localStorage.setItem("AccountId", defaultId);
      }
    }
  }, [businesses]);

  useEffect(() => {
    if (selectedBusinessId) {
      localStorage.setItem("AccountId", selectedBusinessId);
    }
  }, [selectedBusinessId]);
  const businesscount = allbusinesses.length;

  return (
    <BusinessContext.Provider
      value={{
        businesses,
        settingsBusiness,
        allbusinesses,
        setBusinesses,
        selectedBusinessId,
        setSelectedBusinessId,
        businesscount,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

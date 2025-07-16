
// import { createContext, useState, useContext } from "react";
// const BusinessContext = createContext();
// export const useBusiness = () => useContext(BusinessContext);

// // Create provider
// export const BusinessProvider = ({ children }) => {

//     //change this values to get bussiness from db and store here using the user id
//   const [businesses, setBusinesses] = useState([
//     { id: 1, name: "India Cricket" },
//     { id: 2, name: "Royal Challengers Bengaluru" },
//   ]);

//   const [selectedBusinessId, setSelectedBusinessId] = useState(null);

//   if(selectedBusinessId){
//     localStorage.setItem("AccountId",selectedBusinessId)
//   }

//   return (
//     <BusinessContext.Provider
//       value={{
//         businesses,
//         setBusinesses,
//         selectedBusinessId,
//         setSelectedBusinessId,
        
//       }}
//     >
//       {children}
//     </BusinessContext.Provider>
//   );
// };
import { createContext, useState, useContext, useEffect } from "react";
import { useUser } from "./userContext";
import { toast } from "react-toastify";

const BusinessContext = createContext();
export const useBusiness = () => useContext(BusinessContext);

export const BusinessProvider = ({ children }) => {
const [businesses, setBusinesses] = useState([
   { id: 1, name: "India Cricket" },
    { id: 2, name: "Royal Challengers Bengaluru" },
 ]);
  const [selectedBusinessId, setSelectedBusinessId] = useState(null);

  const baseUrl = process.env.REACT_APP_BACKEND_URI;
  const { user } = useUser();
  const token=localStorage.getItem('token')

  // ✅ Fetch businesses from backend based on user
  useEffect(() => {
    const fetchBusinesses = async () => {
      if (!user?.id) return;


      try {
        const response = await fetch(`${baseUrl}/v2/bussiness/getbussiness/${user.id}`,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );
        const data = await response.json();
console.log(data);

        // if (response.ok) {
        //   setBusinesses(data || []);
        // } else {
        //   toast.error(data?.message || "Failed to fetch businesses");
        // }
      } catch (error) {
        toast.error("Error fetching businesses");
        console.error(error);
      }
    };

    fetchBusinesses();
  }, [user]);

  // ✅ Set default selectedBusinessId once businesses are loaded
  useEffect(() => {
    if (businesses.length === 0) return;

    const storedId = localStorage.getItem("AccountId");
    const storedIdAsNumber = storedId ? parseInt(storedId) : null;
    const isValidStoredId = businesses.some(b => b.id === storedIdAsNumber);

    if (isValidStoredId) {
      setSelectedBusinessId(storedIdAsNumber);
    } else {
      const defaultId = businesses[0]?.id;
      if (defaultId) {
        setSelectedBusinessId(defaultId);
        localStorage.setItem("AccountId", defaultId);
      }
    }
  }, [businesses]);

  // ✅ Keep localStorage in sync with selection
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

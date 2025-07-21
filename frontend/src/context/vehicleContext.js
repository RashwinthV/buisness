import { createContext, useState, useContext, useEffect } from "react";
import { useUser } from "./userContext";
import { toast } from "react-toastify";
import { useBusiness } from "./BussinessContext";

const VehicleContext = createContext();
export const useVehicle = () => useContext(VehicleContext);

export const VehicleProvider = ({ children }) => {
  const [vehicle, setvehicle] = useState([]);
  const [totalvehicle, settotalvehicle] = useState();
  const [totalvehiclecount, settotalvehiclecount] = useState();
  const { businesses, selectedBusinessId } = useBusiness();
  const bussinessId = businesses.find(
    (b) => String(b.businessId) === String(selectedBusinessId)
  );

  const baseUrl = process.env.REACT_APP_BACKEND_URI;
  const { user } = useUser();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchVechile = async () => {
      if (!user?.id || !bussinessId?._id) return;

      try {
        const response = await fetch(
          `${baseUrl}/v2/bussiness/vechile/${user.id}/getvehicle/${bussinessId?._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

        if (response.ok) {
          setvehicle(data.vechiles || []);
          settotalvehicle(data.businessvehiclecount);
          settotalvehiclecount(data.allvechilecount);
        }
      } catch (error) {
        toast.error("Error fetching products");
        console.error(error);
      }
    };

    fetchVechile();
  }, [user?.id, baseUrl, bussinessId, token]);

  return (
    <VehicleContext.Provider
      value={{
        vehicle,
        totalvehicle,
        totalvehiclecount,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
};

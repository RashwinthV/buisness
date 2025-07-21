import { createContext, useState, useContext, useEffect } from "react";
import { useUser } from "./userContext";
import { toast } from "react-toastify";
import { useBusiness } from "./BussinessContext";

const EmployeeContext = createContext();
export const useEmployee = () => useContext(EmployeeContext);

export const EmployeeProvider = ({ children }) => {
  const [Employee, setEmployee] = useState([]);
  const [totalemployee, settotalemployee] = useState();
  const [totalEmployeecount, settotalEmployeecount] = useState();
  const { businesses, selectedBusinessId } = useBusiness();
  const bussinessId = businesses.find(
    (b) => String(b.businessId) === String(selectedBusinessId)
  );

  const baseUrl = process.env.REACT_APP_BACKEND_URI;
  const { user } = useUser();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!user?.id || !bussinessId?._id) return;

      try {
        const response = await fetch(
          `${baseUrl}/v2/bussiness/employee/${user.id}/getemployee/${bussinessId?._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();        

        if (response.ok) {
          setEmployee(data.employee || []);
          settotalemployee(data.totalbussinessEmployee);
          settotalEmployeecount(data.allEmployee);
        }
      } catch (error) {
        toast.error("Error fetching products");
        console.error(error);
      }
    };

    fetchEmployee();
  }, [user?.id, baseUrl, bussinessId, token]);
  

  return (
    <EmployeeContext.Provider
      value={{
        Employee,
        totalemployee,
        totalEmployeecount,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

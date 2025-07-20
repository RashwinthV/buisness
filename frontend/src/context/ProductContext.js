import { createContext, useState, useContext, useEffect } from "react";
import { useUser } from "./userContext";
import { toast } from "react-toastify";
import { useBusiness } from "./BussinessContext";

const ProductContext = createContext();
export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [totalproducts,settotalproducts]=useState()
  const {businesses,selectedBusinessId}=useBusiness()
  const bussinessId=businesses.find(
    (b) => String(b.businessId) === String(selectedBusinessId)
  );

  const baseUrl = process.env.REACT_APP_BACKEND_URI;
  const { user } = useUser();
  const token = localStorage.getItem("token");
  

  useEffect(() => {
    const fetchProducts = async () => {
      if (!user?.id|| !bussinessId?._id) return;

      try {
        const response = await fetch(
          `${baseUrl}/v2/bussiness/product/${user.id}/getproducts/${bussinessId?._id}`, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        
        if (response.ok) {
          setProduct(data.products || []);
          settotalproducts(data.totalProducts)
         } //else {
        //   toast.error(data?.message || "Failed to fetch products");
        // }
      } catch (error) {
        toast.error("Error fetching products");
        console.error(error);
      }
    };

    fetchProducts();
  }, [user?.id,baseUrl,bussinessId,token]);

  return (
    <ProductContext.Provider
      value={{
        product,
        totalproducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

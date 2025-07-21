import { UserProvider } from "./userContext";
import { BusinessProvider } from "./BussinessContext";
import { ProductProvider } from "./ProductContext";
import { EmployeeProvider } from "./EmployeeContext";
import { VehicleProvider } from "./vehicleContext";

export const AppProviders = ({ children }) => {
  return (
    <UserProvider>
      <BusinessProvider>
        <ProductProvider>
          <EmployeeProvider>
            <VehicleProvider>
            {children}


            </VehicleProvider>
            
            </EmployeeProvider>
        </ProductProvider>
      </BusinessProvider>
    </UserProvider>
  );
};

import { UserProvider } from "./userContext";
import { BusinessProvider } from "./BussinessContext";
import { ProductProvider } from "./ProductContext";
import { EmployeeProvider } from "./EmployeeContext";

export const AppProviders = ({ children }) => {
  return (
    <UserProvider>
      <BusinessProvider>
        <ProductProvider>
          <EmployeeProvider>{children}</EmployeeProvider>
        </ProductProvider>
      </BusinessProvider>
    </UserProvider>
  );
};

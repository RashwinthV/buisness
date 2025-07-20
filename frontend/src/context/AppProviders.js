import { UserProvider } from "./userContext";
import { BusinessProvider } from "./BussinessContext";
import { ProductProvider } from "./ProductContext";

export const AppProviders = ({ children }) => {
  return (
    <UserProvider>
      <BusinessProvider>
        <ProductProvider>{children}</ProductProvider>
      </BusinessProvider>
    </UserProvider>
  );
};

import { UserProvider } from "./userContext";
import { BusinessProvider } from "./BussinessContext";

export const AppProviders = ({ children }) => {
  return (
    <UserProvider>
      <BusinessProvider>{children}</BusinessProvider>
    </UserProvider>
  );
};

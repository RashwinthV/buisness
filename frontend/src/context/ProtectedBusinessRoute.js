import { useEffect, useState } from "react";
import { useParams, Navigate, useLocation } from "react-router-dom";
import { useBusiness } from "./BussinessContext";
import { useUser } from "./userContext";
import { toast } from "react-toastify";

const ProtectedBusiness = ({ children }) => {
  const { businessId } = useParams();
  const { isAuthenticated } = useUser();
  const { businesses } = useBusiness();

  const [authChecked, setAuthChecked] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [redirectNow, setRedirectNow] = useState(false);
  const location = useLocation();

  const defaultBusinessId = localStorage.getItem("AccountId");

  useEffect(() => {
    if (!isAuthenticated) {
      setHasAccess(false);
      setAuthChecked(true);
      return;
    }

    // Wait for business list to load
    if (!businesses || businesses.length === 0) return;

    const selectedId = parseInt(businessId);
    const match = businesses.some((b) => b.businessId === selectedId);

    if (!match) {
      if (location.pathname === `/businessdashboard/${selectedId}`) {
        toast.warning("You don't have access to this Dashboard");
        setTimeout(() => setRedirectNow(true), 300);
      } else if (location.pathname === `/entry/${selectedId}`) {
        toast.warning("You don't have access to this Transaction", {position: "top-center",
       autoClose: 3000,
        theme: "dark"});
        setTimeout(() => setRedirectNow(true), 300); 
      }
    } else {
      setHasAccess(true);
    }

    setAuthChecked(true);
  }, [isAuthenticated, businesses, businessId]);

  if (!authChecked) return null;

  if (!isAuthenticated) return <Navigate to="/login" />;

  if (redirectNow && !hasAccess && defaultBusinessId) {
    return <Navigate to={`/home`} />;
  }

  if (!hasAccess) return null;

  return children;
};

export default ProtectedBusiness;

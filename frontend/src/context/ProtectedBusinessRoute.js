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

    // Wait for businesses to be available
    if (!businesses || businesses.length === 0) return;

    // Parse and check business access
    const selectedId = parseInt(businessId);
    const match = businesses.some((b) => b.businessId === selectedId);
    console.log(match);

    if (!match) {
      if (location.pathname === `/businessdashboard/${selectedId}`) {
        toast.warning("You don't have access to this Dashboard");
        setTimeout(() => setRedirectNow(true), 300);
      } else if (location.pathname === `/transactions/${selectedId}`) {
        toast.warning("You don't have access to this Transaction", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
        setTimeout(() => setRedirectNow(true), 300);
      }
    } else {
      setHasAccess(true);
    }

    setAuthChecked(true);
  }, [isAuthenticated, businesses, businessId, location.pathname]);
  console.log({ businessId, authChecked, isAuthenticated });

  // 🚨 Redirect if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // 🚨 Redirect immediately if businessId is missing (param not present)
if (!businessId || businessId === "null" || businessId === "undefined") {
   toast.info("your don't have any business", {
      position: "top-center",
      autoClose: 1500,
      theme: "dark",
    });
    toast.info("Please register your business first", {
      position: "top-center",
      autoClose: 3000,
      theme: "dark",
    });
    return <Navigate to="/businessregister" />;
  }

  // 🚨 Redirect if user lacks access
  if (redirectNow && !hasAccess && defaultBusinessId) {
    return <Navigate to="/home" />;
  }

  // Wait until checks are complete
  if (!authChecked || !hasAccess) return null;

  // ✅ Allow access
  return children;
};

export default ProtectedBusiness;

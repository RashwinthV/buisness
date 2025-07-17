// src/components/ScrollToTop.js
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../Styles/Scrollicon.css";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {showButton && (
        <button
          onClick={scrollToTop}
          className="scroll-to-top bi bi-chevron-double-up"
          title="Scroll to top"
        />
      )}
    </>
  );
};

export default ScrollToTop;

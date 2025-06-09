import React, { useEffect, useState } from "react";
import { ArrowUpToLine } from "lucide-react";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.pageYOffset > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="fixed cursor-pointer bottom-6 scrollToTop_btn right-6 p-3 flex items-center justify-center rounded-full text-white z-50 transition-all duration-300 box_shadow_common gradient-background "
        aria-label="Scroll to Top"
      >
        <ArrowUpToLine size={24} className="text-white" />
      </button>
    )
  );
};

export default ScrollToTopButton;

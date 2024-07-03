import { useEffect, useState } from "react";

export default function useWindowScroll() {
  const [windowScrollX, setWindowScrollX] = useState(0);
  const [windowScrollY, setWindowScrollY] = useState(0);
  useEffect(() => {
    function updateWindowScroll() {
      setWindowScrollX(window.scrollX);
      setWindowScrollY(window.scrollY);
    }
    window.addEventListener("scroll", updateWindowScroll);
    updateWindowScroll();
    return () => window.removeEventListener("scroll", updateWindowScroll);
  }, []);
  return { windowScrollX, windowScrollY };
}

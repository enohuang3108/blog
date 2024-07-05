import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");

      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleDark = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <button onClick={toggleDark} className="nav-link text-xl dark:text-white">
      {isDark ? (
        <Icon icon="solar:moon-linear" />
      ) : (
        <Icon icon="solar:sun-linear" />
      )}
    </button>
  );
}

export default DarkModeToggle;

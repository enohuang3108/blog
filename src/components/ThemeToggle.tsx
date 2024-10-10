import { useTheme } from "@/hooks/useTheme";
import { Icon } from "@iconify/react";

function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="nav-link text-xl dark:text-white">
      {theme == "dark" ? (
        <Icon icon="solar:moon-linear" />
      ) : (
        <Icon icon="solar:sun-linear" />
      )}
    </button>
  );
}

export default DarkModeToggle;

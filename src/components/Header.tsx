import useWindowScroll from "@/hooks/useWindowScroll";
import siteConfig from "@/site-config";
import { getLinkTarget } from "@/utils/link";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

function Header({ url }: { url: URL }) {
  const [oldScroll, setOldScroll] = useState(0);
  const { windowScrollY } = useWindowScroll();
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [isNavDrawerHidden, setIsNavDrawerHidden] = useState(true);

  const navLinks = siteConfig.header.navLinks || [];
  const socialLinks = siteConfig.socialLinks || [];

  useEffect(() => {
    const handleScroll = () => {
      if (windowScrollY < 150) {
        setIsHeaderHidden(false);
        return;
      }

      if (windowScrollY - oldScroll > 150) {
        setIsHeaderHidden(true);
        setOldScroll(windowScrollY);
      }

      if (oldScroll - windowScrollY > 50) {
        setIsHeaderHidden(false);
        setOldScroll(windowScrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [windowScrollY, oldScroll]);

  function toggleNavDrawer() {
    setIsNavDrawerHidden(!isNavDrawerHidden);
  }

  return (
    <>
      <header
        id="header"
        className={`fixed ${windowScrollY > 50 && "backdrop-blur-sm"} z-10 flex h-[80px] w-screen transform items-center justify-between px-6 ${isHeaderHidden ? "-translate-y-full" : "translate-y-0"} transition-transform duration-200 ${windowScrollY > 20 ? "backdrop-blur-[4px]" : ""}`}
      >
        <div className="flex h-full items-center">
          <a href="/" className="mr-6" aria-label="Header Logo Image">
            <img
              width="32"
              height="32"
              src={siteConfig.header.logo.src}
              alt={siteConfig.header.logo.alt}
            />
          </a>
          <nav className="static hidden flex-row flex-wrap gap-x-6 sm:flex">
            {navLinks.map((link) => (
              <a
                key={link.text}
                aria-label={link.text}
                target={getLinkTarget(link.href)}
                className={`nav-link text-black text-inherit no-underline dark:text-white ${url.pathname === link.href && "!opacity-100"}`}
                href={link.href}
              >
                {link.text}
              </a>
            ))}
          </nav>
          <div
            className="flex h-full items-center sm:hidden"
            onClick={toggleNavDrawer}
          >
            <Icon icon="ph:list-bold" className="text-xl" />
          </div>
        </div>
        <div className="flex gap-x-6">
          {socialLinks.map((link) => (
            <a
              key={link.text}
              aria-label={link.text}
              target={getLinkTarget(link.href)}
              href={link.href}
            >
              <Icon
                icon={link.icon}
                className="nav-link text-xl text-black dark:text-white"
              />
            </a>
          ))}

          <a nav-link href="/atom.xml" aria-label="RSS">
            <Icon
              icon="lucide:rss"
              className="nav-link text-xl text-black dark:text-white"
            />
          </a>
          <ThemeToggle />
        </div>
      </header>
      <div className="relative sm:hidden">
        <div
          className={`${isNavDrawerHidden ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"} bg-main fixed left-0 top-0 z-20 flex h-screen w-48 flex-col gap-8 bg-white px-6 pt-8 transition-all duration-200 dark:bg-black`}
        >
          <Icon icon="ph:list-bold" className="text-xl" />
          {navLinks.map((link) => (
            <a
              key={link.text}
              aria-label={link.text}
              target={getLinkTarget(link.href)}
              className="text-xl opacity-70 transition-opacity hover:opacity-100"
              href={link.href}
              onClick={toggleNavDrawer}
            >
              {link.text}
            </a>
          ))}
        </div>
        <div
          className={`${isNavDrawerHidden && "hidden"} fixed left-0 top-0 z-10 h-screen w-screen bg-black opacity-50`}
          onClick={toggleNavDrawer}
        />
      </div>
    </>
  );
}

export { Header };

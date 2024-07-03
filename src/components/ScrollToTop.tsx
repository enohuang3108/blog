import useWindowScroll from "@/hooks/useWindowScroll";

function ScrollToTopButton() {
  const { windowScrollY } = useWindowScroll();

  const toTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      aria-label="Scroll to top"
      className={`z-100 fixed bottom-32 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#8883] text-lg transition duration-300 hover:opacity-100 sm:right-32 print:hidden ${windowScrollY > 300 ? "opacity-75" : "pointer-events-none opacity-0"}`}
      onClick={toTop}
    >
      <div className="i-ri-arrow-up-line" />
    </button>
  );
}

export default ScrollToTopButton;

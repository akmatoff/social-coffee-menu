import React, { useEffect } from "react";
import classNames from "classnames";

interface Props {
  link: string;
  className?: string;
  children: React.ReactNode;
}

const CategoryButton: React.FC<Props> = ({ link, className, children }) => {
  // Smooth scroll to hash element on load and hashchange
  useEffect(() => {
    function scrollToHashElement() {
      if (window.location.hash) {
        const el = document.querySelector(window.location.hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
    window.addEventListener("load", scrollToHashElement);
    window.addEventListener("hashchange", scrollToHashElement);
    return () => {
      window.removeEventListener("load", scrollToHashElement);
      window.removeEventListener("hashchange", scrollToHashElement);
    };
  }, []);

  return (
    <a
      href={link}
      className={classNames(
        "inline-flex items-center text-center px-4 outline-none focus:outline-none bg-transparent border-2  rounded-[25px] text-[18px] md:text-[26px] whitespace-nowrap hover:opacity-80 duration-300",
        className
      )}
    >
      {children}
    </a>
  );
};

export default CategoryButton;

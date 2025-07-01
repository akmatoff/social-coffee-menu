import React from "react";

interface Props {
  isActive: boolean;
  link: string;
  children: React.ReactNode;
}

const MenuButton: React.FC<Props> = ({ isActive, link, children }) => (
  <a
    href={link}
    className={`text-secondary text-[24px] md:text-[40px] uppercase cursor-pointer ${
      isActive ? "font-extrabold" : "font-extralight"
    }`}
  >
    {children}
  </a>
);

export default MenuButton;

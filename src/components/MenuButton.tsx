import type { ReactNode } from "react";

interface Props {
  isActive: boolean;
  link: string;
  children: ReactNode;
}

export default function MenuButton({ isActive, link, children }: Props) {
  return (
    <a
      href={link}
      className={`text-primary text-[24px] md:text-[40px] font-thin cursor-pointer ${
        isActive && "font-bold"
      }`}
    >
      {children}
    </a>
  );
}

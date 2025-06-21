import { useEffect, useState } from "react";
import { MENU_OPTIONS } from "../constants";
import CategoryCarousel from "./Category/CategoryCarousel";
import MenuButton from "./MenuButton";

export default function HeaderSection() {
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return (
    <section className="bg-secondary">
      <div className="bg-cover min-h-[70vh] md:bg-contain md:min-h-screen flex flex-col justify-end space-y-12 background">
        <div className="flex flex-col items-center justify-center space-y-20 h-full z-10">
          <div className="flex flex-col items-center space-y-4">
            {MENU_OPTIONS.map((option) => (
              <MenuButton
                isActive={option.link === pathname}
                link={option.link}
              >
                {option.name}
              </MenuButton>
            ))}
          </div>
        </div>

        <div className="z-10">
          <CategoryCarousel />
        </div>
      </div>
    </section>
  );
}

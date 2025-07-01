import React, { useEffect, useMemo } from "react";
import CategoryCarousel from "./Category/CategoryCarousel";
import MenuButton from "./MenuButton";
import { CategoryType, type Category } from "../types";
import classNames from "classnames";
import CategoryButton from "./Category/CategoryButton";
import BurgerMenu from "./BurgerMenu";
// import { ReactComponent as Logo } from "../../public/social-coffee-logo.svg";
import LogoImage from "../../public/social-coffee-logo.svg";
import getCategories from "../api/getCategories";
// import LogoText from "../../public/social-coffee-logo-text.png";

interface Props {
  hideMenus?: boolean;
  menu?: string;
}

const HeaderSection: React.FC<Props> = ({ hideMenus, menu }) => {
  const [categories, setCategories] = React.useState<Category[]>([]);

  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);

  const menuOptions = useMemo(
    () =>
      categories.filter(
        (category) => category.category_type === CategoryType.MENU
      ),
    [categories]
  );

  const searchParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );

  const lang = searchParams.get("lang");

  return (
    <header className="bg-background" id="header-section">
      <div className="absolute z-20 top-4 right-4 md:top-8 md:right-8 text-secondary space-x-4">
        <a
          href={`?lang=ru`}
          className={classNames(
            "inline-block p-2 text-xs md:text-base border-secondary rounded-lg",
            (lang === "ru" || lang === null) && "border"
          )}
        >
          RU
        </a>
        <a
          href={`?lang=ky`}
          className={classNames(
            "inline-block p-2 text-xs md:text-base border-secondary rounded-lg",
            lang === "ky" && "border"
          )}
        >
          KY
        </a>
        <a
          href={`?lang=en`}
          className={classNames(
            "inline-block p-2 text-xs md:text-base border-secondary rounded-lg",
            lang === "en" && "border"
          )}
        >
          EN
        </a>
      </div>
      <div
        className={classNames(
          "bg-cover min-h-screen flex flex-col justify-center space-y-12 bg-background overflow-x-hidden"
        )}
      >
        {!hideMenus ? (
          <div className="flex flex-col items-center justify-center space-y-20 h-full">
            <div className="flex flex-col items-center space-y-10">
              {/* <Logo className="scale-75 md:scale-90" /> */}
              <img
                src="/social-coffee-logo.svg"
                alt="logo"
                className="scale-75 md:scale-90"
                loading="eager"
                style={{ fetchPriority: "high" } as any}
              />
              {/* <img src={LogoText} alt="logo text" /> */}
              <p className="text-secondary tracking-[14px] text-2xl md:text-5xl font-bold text-center">
                SOCIAL COFFEE
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              {menuOptions.map((option) => (
                <MenuButton
                  key={option.slug}
                  isActive={option.slug === menu}
                  link={`/${option.slug}`}
                >
                  {option.name}
                </MenuButton>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex lg:justify-center py-24 px-4 lg:px-0 w-full">
            <div className="columns-1 lg:columns-2 gap-8 w-full xl:w-auto p-4">
              {categories?.map((category) => (
                <div className="break-inside-avoid mb-4" key={category.id}>
                  <CategoryButton
                    link={`#category-${category.id}`}
                    className="border-secondary text-secondary lg:px-4 lg:py-1 lg:text-[32px] whitespace-break-spaces"
                  >
                    {category.name}
                  </CategoryButton>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <BurgerMenu menuOptions={menuOptions} />
      {categories && <CategoryCarousel categories={categories} />}
    </header>
  );
};

export default HeaderSection;

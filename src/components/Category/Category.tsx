import React from "react";
import { CategoryType, type Category } from "../../types";
import DefaultCategory from "./Default/DefaultCategory";
import SubCategory from "./SubCategory";
import TextBased from "./TextBased/TextBased";
import TwoInARow from "./TwoInARow/TwoInARow";

interface Props {
  category: Category;
  menu?: string;
}

const CategorySection: React.FC<Props> = ({ category, menu }) => {
  // Get lang from URL
  const searchParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  const lang = searchParams.get("lang") || "ru";
  const isBar = menu === "bar";
  const hasSubCategories = category.subcategories.length > 0;

  return (
    <section className="p-4 md:pt-24 snap-start" id={`category-${category.id}`}>
      <header className="flex items-center justify-between h-12">
        <div className="h-full flex items-center space-x-4">
          <div
            className={`w-[4px] h-[24px] md:h-[48px] rounded-lg bg-category${
              isBar ? " bg-categorySecondary" : ""
            }`}
          />
          <h1 className="text-[20px]/[20px] md:text-[45px]/[40px] font-semibold">
            {category.name}
          </h1>
        </div>
        <p className="text-[9px] md:text-[14px]">{category.description}</p>
      </header>
      <div className="py-2 md:py-8 space-y-8">
        {category.image && (
          <img src={category.image} alt={category.slug} className="w-full" />
        )}
        {hasSubCategories &&
          category.subcategories.map((sc) => (
            <SubCategory key={sc.id} category={sc} />
          ))}
        {category.category_type === CategoryType.DEFAULT && (
          <DefaultCategory category={category} lang={lang} />
        )}
        {category.category_type === CategoryType.TWO_IN_A_ROW && (
          <TwoInARow category={category} menu={menu} lang={lang} />
        )}
        {category.category_type === CategoryType.TEXT_BASED && (
          <TextBased category={category} menu={menu} lang={lang} />
        )}
      </div>
    </section>
  );
};

export default CategorySection;

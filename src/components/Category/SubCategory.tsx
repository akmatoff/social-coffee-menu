import React from "react";
import { CategoryType, type Category } from "../../types";
import DefaultCategory from "./Default/DefaultCategory";
import TextBased from "./TextBased/TextBased";
import TwoInARow from "./TwoInARow/TwoInARow";

interface Props {
  category: Category;
  menu?: string;
}

const SubCategory: React.FC<Props> = ({ category, menu }) => {
  // Get lang from URL
  const searchParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  const lang = searchParams.get("lang") || "ru";
  const hasSubcategories = category.subcategories.length > 0;

  return (
    <div className="space-y-4">
      <h2 className="text-[16px] md:text-[30px] font-semibold">
        {category.name}
      </h2>
      {hasSubcategories && (
        <div className="space-y-8">
          {category.subcategories.map((sc) => (
            <SubCategory key={sc.id} category={sc} menu={menu} />
          ))}
        </div>
      )}
      {!hasSubcategories && category.category_type === CategoryType.DEFAULT && (
        <DefaultCategory category={category} lang={lang} />
      )}
      {!hasSubcategories &&
        category.category_type === CategoryType.TWO_IN_A_ROW && (
          <TwoInARow category={category} menu={menu} lang={lang} />
        )}
      {!hasSubcategories &&
        category.category_type === CategoryType.TEXT_BASED && (
          <TextBased category={category} menu={menu} lang={lang} />
        )}
    </div>
  );
};

export default SubCategory;

import { CategoryType, type Category } from "../../types";
import DefaultCategory from "./DefaultCategory";
import TextBased from "./TextBased";
import TwoInArow from "./TwoInARow";

interface Props {
  category: Category;
}

export const CATEGORY_BY_TYPE = {
  [CategoryType.DEFAULT]: DefaultCategory,
  [CategoryType.TWO_IN_A_ROW]: TwoInArow,
  [CategoryType.TEXT_BASED]: TextBased,
};

export default function Category({ category }: Props) {
  const Component = CATEGORY_BY_TYPE[category.category_type];

  return (
    <section className="min-h-screen p-10">
      <header className="flex items-center justify-between h-12">
        <div className="h-full flex items-center space-x-4">
          <div
            className="w-[4px] h-full rounded-lg"
            style={{ background: "var(--category)" }}
          ></div>
          <h1 className="text-[45px] font-semibold">{category.name}</h1>
        </div>
      </header>

      {Component && <Component category={category} />}
    </section>
  );
}

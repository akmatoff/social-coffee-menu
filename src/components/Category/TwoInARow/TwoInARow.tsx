import { useEffect, useState } from "react";
import type { Category, MenuItem } from "../../../types";
import getMenuItems from "../../../api/getMenuItems";
import TwoInARowMenuItem from "./TwoInArowMenuItem";
import Loader from "../../Loader";

interface Props {
  category: Category;
  lang?: string;
  menu?: string;
}

export default function TwoInARow({ category, lang = "ru", menu }: Props) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const items = await getMenuItems({ category: category.id }, lang);
      setMenuItems(items);
      setIsLoading(false);
    };

    fetchItems();
  }, [category.id, lang]);

  const isOdd = menuItems.length % 2 !== 0;
  const lastIndex = menuItems.length - 1;

  return (
    <div className="grid grid-cols-2 gap-y-8 gap-x-8 md:gap-4 place-content-center">
      {isLoading && <Loader />}
      {!isLoading &&
        menuItems.map((item, index) => {
          const isLastAndOdd = isOdd && index === lastIndex;
          return (
            <TwoInARowMenuItem
              key={item.id}
              item={item}
              shouldBeCentered={isLastAndOdd}
              menu={menu}
            />
          );
        })}
    </div>
  );
}

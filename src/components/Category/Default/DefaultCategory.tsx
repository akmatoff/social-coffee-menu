import { useEffect, useState, useRef } from "react";
import getMenuItems from "../../../api/getMenuItems";
import type { Category, MenuItem } from "../../../types";
import MenuItemComponent from "./MenuItem";
import Loader from "../../Loader";
import Addition from "../../Addition";
import { useOnScreen } from "../../../hooks/useOnScreen";

interface Props {
  category: Category;
  lang: string;
}

export default function DefaultCategory({ category, lang }: Props) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [ref, isVisible] = useOnScreen<HTMLDivElement>({
    rootMargin: "0px 0px -100px 0px",
  });

  useEffect(() => {
    if (isVisible && !hasFetched) {
      setIsLoading(true);
      const fetchData = async () => {
        const data = await getMenuItems(
          { category: category.id },
          lang || "ru"
        );
        setMenuItems(data);
        setIsLoading(false);
        setHasFetched(true);
      };
      fetchData();
    }
  }, [isVisible, hasFetched, category.id, lang]);

  return (
    <div ref={ref}>
      {isLoading && <Loader />}
      <div className="grid xl:grid-cols-2 gap-6 py-8" id="items-list">
        {!isLoading &&
          menuItems.map((item, index) => (
            <MenuItemComponent
              key={item.id}
              index={index}
              menuItem={item}
              length={menuItems.length}
            />
          ))}
      </div>
      {category.additions.length > 0 && (
        <div className="space-y-2">
          <h2 className="font-semibold text-[16px] md:text-[25px]">
            Дополнение
          </h2>
          <div className="space-y-1">
            {category.additions.map((addition) => (
              <Addition key={addition.id} addition={addition} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

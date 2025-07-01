import { useEffect, useState } from "react";
import getMenuItems from "../../../api/getMenuItems";
import type { Category, MenuItem } from "../../../types";
import TextBasedMenuItem from "./TextBasedMenuItem";
import Loader from "../../Loader";
import { useOnScreen } from "../../../hooks/useOnScreen";

interface Props {
  category: Category;
  lang?: string;
  menu?: string;
}

export default function TextBasedCategory({
  category,
  lang = "ru",
  menu,
}: Props) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [ref, isVisible] = useOnScreen<HTMLDivElement>({
    rootMargin: "0px 0px -100px 0px",
  });

  useEffect(() => {
    if (isVisible && !hasFetched) {
      setIsLoading(true);
      const fetchMenu = async () => {
        const items = await getMenuItems({ category: category.id }, lang);
        setMenuItems(items);
        setIsLoading(false);
        setHasFetched(true);
      };
      fetchMenu();
    }
  }, [isVisible, hasFetched, category.id, lang]);

  return (
    <div ref={ref} className="space-y-1">
      {isLoading && <Loader />}
      {!isLoading &&
        menuItems.map((item) => (
          <TextBasedMenuItem key={item.id} item={item} menu={menu} />
        ))}
    </div>
  );
}

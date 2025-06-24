import { useEffect, useState } from "react";
import getMenuItems from "../../../api/getMenuItems";
import type { Category, MenuItem } from "../../../types";
import TextBasedMenuItem from "./TextBasedMenuItem";
import Loader from "../../Loader";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      const items = await getMenuItems({ category: category.id }, lang);
      setMenuItems(items);
      setIsLoading(false);
    };

    fetchMenu();
  }, [category.id, lang]);

  return (
    <div className="space-y-1">
      {isLoading && <Loader />}
      {!isLoading &&
        menuItems.map((item) => (
          <TextBasedMenuItem key={item.id} item={item} menu={menu} />
        ))}
    </div>
  );
}

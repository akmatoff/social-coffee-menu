import { useEffect, useState } from "react";
import getMenuItems from "../../../api/getMenuItems";
import type { Category, MenuItem } from "../../../types";
import MenuItemComponent from "./MenuItem";
import Loader from "../../Loader";

interface Props {
  category: Category;
  lang: string;
}

export default function DefaultCategory({ category, lang }: Props) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMenuItems({ category: category.id }, lang || "ru");

      setMenuItems(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-8 py-8">
      {isLoading && <Loader />}
      {!isLoading &&
        menuItems.map((item) => (
          <MenuItemComponent key={item.id} menuItem={item} />
        ))}
    </div>
  );
}

import getMenuItems from "../api/getMenuItems";
import { useEffect, useState } from "react";
import { type MenuItem } from "../types";

export default function useMenuItems() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const data = await getMenuItems();

        setMenuItems(data.data.results);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return {
    menuItems,
    isLoading,
    error,
  };
}

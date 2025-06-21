import getCategories from "../api/getCategories";
import { useEffect, useState } from "react";
import { type Category } from "../types";

export default function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const data = await getCategories();

        setCategories(data.data.results);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return {
    categories,
    isLoading,
    error,
  };
}

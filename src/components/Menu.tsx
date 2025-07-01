import { useEffect, useState } from "react";
import { type Category } from "../types";
import CategoryComponent from "./Category/Category";
import getCategories from "../api/getCategories";

export default function Menu() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="min-h-screen bg-[url('/public/background-image.png')] overflow-x-hidden">
      <div className="xl:mx-[7%]">
        {categories.map((category) => (
          <CategoryComponent key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}

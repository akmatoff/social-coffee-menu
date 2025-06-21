import useCategories from "../../services/useCategories";
import CategoryButton from "./CategoryButton.astro";

export default function CategoryCarousel() {
  const { categories } = useCategories();

  return (
    <div className="flex items-center w-full py-6 px-4 scrollbar-hidden space-x-4 overflow-x-auto">
      {categories?.map((category) => (
        <CategoryButton key={category.id}>{category.name}</CategoryButton>
      ))}
    </div>
  );
}

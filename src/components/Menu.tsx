import useCategories from "../services/useCategories";
import Category from "./Category/Category";

export default function Menu() {
  const { categories, isLoading } = useCategories();

  return (
    <div className="min-h-screen">
      <div className="lg:mx-[15%] xl:mx-[25%]">
        {!isLoading &&
          categories?.map((category) => (
            <Category key={category.id} category={category} />
          ))}
      </div>
    </div>
  );
}

import React, { useEffect, useRef } from "react";
import type { Category } from "../../types";
import CategoryButton from "./CategoryButton";
// import HomeIcon from "../../assets/home-icon.svg";

interface Props {
  categories: Category[];
}

const CategoryCarousel: React.FC<Props> = ({ categories }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // Horizontal scroll with mouse wheel
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Hide/show bar based on header intersection
  useEffect(() => {
    const categoryBar = barRef.current;
    const header = document.getElementById("header-section");
    if (!categoryBar || !header) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          categoryBar.classList.remove("hidden");
        } else {
          categoryBar.classList.add("hidden");
        }
      },
      { root: null, threshold: 0 }
    );
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="flex items-center sticky top-0 z-30 bg-secondary"
      id="category-carousel"
      ref={barRef}
    >
      <div
        id="category-scroll"
        className="flex overflow-x-auto overflow-y-hidden p-3 lg:p-4 gap-x-4 gap-y-2 w-full scrollbar-hidden"
        ref={scrollRef}
      >
        {categories.map((category) => (
          <CategoryButton
            key={category.id}
            link={`#category-${category.id}`}
            className="border-white text-white"
          >
            {category.name}
          </CategoryButton>
        ))}
      </div>
      {/*
      <button id="scrollToTop" className="px-4 p-3 lg:p-4">
        <img src={HomeIcon} alt="icon" />
      </button>
      */}
    </div>
  );
};

export default CategoryCarousel;

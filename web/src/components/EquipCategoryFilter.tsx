import { Star } from "lucide-react";

export default function EquipCategoryFilter({
  categories,
  selectedCategory,
  onCategoryClick,
}: {
  categories: string[];
  selectedCategory: string | null;
  onCategoryClick: (category: string) => void;
}) {
  return (
    <div className="category-wrap">
      {categories.map((category) => (
        <button
          key={category}
          className={`${category === "즐겨찾기" ? "btn-like" : ""} ${
            selectedCategory === category ? "active" : ""
          }`}
          onClick={() => onCategoryClick(category)}
          type="button"
        >
          {category === "즐겨찾기" && (
            <Star size={20} strokeWidth="1.5" aria-hidden="true" />
          )}
          {category}
        </button>
      ))}
    </div>
  );
}

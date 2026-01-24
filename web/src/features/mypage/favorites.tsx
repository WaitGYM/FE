import { motion } from "framer-motion";
import { ChevronLeft, Store, Search, Star } from "lucide-react";
import Header from "../../components/layout/Header";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavoriteStore } from "../../stores/favoriteStore";
import type { FavoriteType } from "../../types";
import EquipCategoryFilter from "../../components/EquipCategoryFilter";

export default function Favorites() {
  const navigate = useNavigate();
  const { favoriteList, getFavoriteList, addFavorite, deleteFavorite } =
    useFavoriteStore();

  useEffect(() => {
    getFavoriteList();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<string>("전체");

  // 카테고리 목록 추출
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(favoriteList.map((eq) => eq.equipment.category)),
    ).sort();
    return ["전체", ...uniqueCategories];
  }, [favoriteList]);

  // 필터링된 기구 목록
  const filteredEquipmentList = useMemo(() => {
    let filtered = favoriteList;

    if (selectedCategory !== "전체") {
      filtered = filtered.filter(
        (eq) => eq.equipment.category === selectedCategory,
      );
    }

    return filtered;
  }, [favoriteList, selectedCategory]);

  const displayList = filteredEquipmentList || favoriteList;

  async function handleToggleFavorite(
    e: React.MouseEvent<HTMLButtonElement>,
    favorite: FavoriteType,
  ) {
    e.stopPropagation();
    if (favorite.equipment.isFavorite)
      await deleteFavorite(favorite.equipment.id);
    else await addFavorite(favorite.equipment.id);
    getFavoriteList();
  }

  return (
    <motion.div
      className="mypage-page"
      id="favorites"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2, ease: "easeInOut" }}
    >
      <Header
        className="header--mypage"
        leftContent={
          <button
            className="btn btn-icon"
            onClick={() => navigate(-1)}
            aria-label="뒤로 가기"
          >
            <ChevronLeft size={24} strokeWidth="2" />
          </button>
        }
        title={<span>즐겨찾기한 기구</span>}
      />

      {displayList.length !== 0 && (
        <EquipCategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryClick={setSelectedCategory}
        />
      )}

      <div className="container">
        <div className="equipment-wrap">
          {displayList.length !== 0 ? (
            <ul className="equipment-list">
              {displayList.map((favorite: FavoriteType) => (
                <li key={favorite.id}>
                  <button className="equipment">
                    <div className="img">
                      <img
                        src={favorite.equipment.imageUrl}
                        alt={favorite.equipment.name}
                        loading="lazy"
                        onLoad={({ target }) => {
                          target.classList.add("visible");
                        }}
                      />
                    </div>
                    <div className="info">
                      <div className="title">
                        <span className="name">{favorite.equipment.name}</span>
                      </div>
                    </div>
                  </button>
                  <button
                    className="favorite"
                    onClick={(e) => handleToggleFavorite(e, favorite)}
                    aria-label="즐겨찾기 취소"
                  >
                    <Star
                      size={20}
                      strokeWidth="1.5"
                      className={favorite.equipment.isFavorite ? "on" : ""}
                    />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-result">
              <p>즐겨찾기한 기구가 없습니다</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

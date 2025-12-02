import { motion } from "framer-motion";
import { ChevronLeft, Store, Search, Star } from "lucide-react";
import Header from "../../components/layout/Header";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFavoriteStore } from "../../stores/favoriteStore";
import type { FavoriteType } from "../../types";

export default function Favorites() {
  const navigate = useNavigate();
  const { favoriteList, getFavoriteList, addFavorite, deleteFavorite } =
    useFavoriteStore();

  async function handleToggleFavorite(
    e: React.MouseEvent<HTMLButtonElement>,
    favorite: FavoriteType
  ) {
    e.stopPropagation();
    if (favorite.equipment.isFavorite)
      await deleteFavorite(favorite.equipment.id);
    else await addFavorite(favorite.equipment.id);
    getFavoriteList();
  }

  useEffect(() => {
    getFavoriteList();
  }, [getFavoriteList]);

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
          <button className="btn btn-icon" onClick={() => navigate(-1)} aria-label="뒤로 가기">
            <ChevronLeft size={24} strokeWidth="2" />
          </button>
        }
        title={<span>즐겨찾기한 기구</span>}
      />

      <div className="category-wrap">
        <button className="active">전체</button>
        <button>허벅지</button>
        <button>어깨</button>
        <button>가슴</button>
        <button>팔</button>
        <button>등</button>
        <button>엉덩이</button>
        <button>복근</button>
      </div>

      <div className="container">
        <div className="equipment-wrap">
          <ul className="equipment-list">
            {favoriteList.map((favorite: FavoriteType) => (
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
        </div>
      </div>
    </motion.div>
  );
}

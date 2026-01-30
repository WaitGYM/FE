import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ChevronLeft, Search, Star } from "lucide-react";
import Header from "../../components/layout/Header";
import EquipSearchBar from "../../components/EquipSearchBar";
import EquipCategoryFilter from "../../components/EquipCategoryFilter";
import EquipmentList from "../../components/EquipmentList";
import { BottomButtonWrapper } from "../../components/ui/Button";
import { useRoutineStore } from "./store/routineStore";
import { useEquipmentStore } from "../../stores/equipmentStore";
import { debounce } from "lodash";

export default function RoutineSelectEquipPage() {
  const { filter } = useParams();
  const navigate = useNavigate();
  const {
    selectedEquipList,
    routineDetail,
    setSelectedEquipList,
    resetRoutineDetailState,
  } = useRoutineStore();
  const { equipmentList } = useEquipmentStore();

  function handleBackBtn() {
    if (!routineDetail) {
      navigate("/");
      resetRoutineDetailState();
    } else {
      navigate(-1);
    }
  }

  ////// 검색 및 카테고리
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");

  // 디바운싱된 검색어 업데이트
  const debouncedSetSearchTerm = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
    }, 300),
    [],
  );

  // 입력값 변경 시 디바운싱 적용
  useEffect(() => {
    debouncedSetSearchTerm(searchInput);

    return () => {
      debouncedSetSearchTerm.cancel();
    };
  }, [searchInput, debouncedSetSearchTerm]);

  // 카테고리 목록 추출
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(equipmentList.map((eq) => eq.category)),
    ).sort();
    return ["전체", "즐겨찾기", ...uniqueCategories];
  }, [equipmentList]);

  // 필터링된 기구 목록
  const filteredEquipmentList = useMemo(() => {
    let filtered = equipmentList;

    // 1. 카테고리 필터링 (선택된 카테고리가 있을 때만)
    if (selectedCategory === "즐겨찾기") {
      filtered = filtered.filter((eq) => eq.isFavorite);
    } else if (selectedCategory !== "전체") {
      filtered = filtered.filter((eq) => eq.category === selectedCategory);
    }

    // 2. 검색어 필터링 (1글자 이상일 때만)
    if (searchTerm.trim().length > 0) {
      const term = searchTerm.trim().toLowerCase();
      filtered = filtered.filter((eq) => {
        const name = eq.name.toLowerCase();
        const category = eq.category.toLowerCase();

        return name.includes(term) || category.includes(term);
      });
    }

    return filtered;
  }, [equipmentList, selectedCategory, searchTerm]);

  function handleClearSearch() {
    setSearchInput("");
    setSearchTerm("");
  }

  function handleNextBtnClick() {
    navigate("/add-routine/routine-setting");
  }

  function handleAddBtnClick() {
    navigate(-1);
  }

  return (
    <motion.div
      className="equipmentList-page add-routine-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: 0.2, ease: "easeInOut" }}
    >
      <div className="content-scroll">
        <Header
          leftContent={
            <button
              className="btn btn-icon"
              onClick={handleBackBtn}
              aria-label="뒤로 가기"
            >
              <ChevronLeft size={24} strokeWidth="2" />
            </button>
          }
          title={<h2>{!routineDetail ? "루틴 추가" : "운동 추가"}</h2>}
        />

        <section className="container">
          <EquipSearchBar
            searchInput={searchInput}
            onSearchChange={setSearchInput}
            onClearSearch={handleClearSearch}
          />
        </section>

        <EquipCategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryClick={setSelectedCategory}
        />

        <section className="container">
          <div className="equipment-wrap">
            <div className="top">
              <div className="total-select">
                <span>선택한 운동</span>
                <span>{selectedEquipList.length}개</span>
              </div>
            </div>

            <EquipmentList
              filter={filter}
              selectMode="MULTI"
              selectedList={selectedEquipList}
              handleSelectedEquipment={setSelectedEquipList}
              overrideEquipmentList={filteredEquipmentList}
            />
          </div>
        </section>
      </div>

      {selectedEquipList.length && (
        <BottomButtonWrapper>
          <button
            onClick={() =>
              !routineDetail ? handleNextBtnClick() : handleAddBtnClick()
            }
            className="btn btn-orange"
          >
            {!routineDetail ? "다음" : "추가하기"}
          </button>
        </BottomButtonWrapper>
      )}
    </motion.div>
  );
}

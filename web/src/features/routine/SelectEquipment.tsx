import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ChevronLeft, Search, Star } from "lucide-react";
import Header from "../../components/layout/Header";
import EquipmentList from "../../components/EquipmentList";
import { BottomButtonWrapper } from "../../components/ui/Button";
import { useRoutineStore } from "./store/routineStore";

export default function RoutineSelectEquipPage() {
  const { filter } = useParams();
  const navigate = useNavigate();
  const {
    selectedEquipList,
    routineDetail,
    setSelectedEquipList,
    resetRoutineState,
  } = useRoutineStore();

  function handleBackBtn() {
    if (!routineDetail) {
      navigate("/");
      resetRoutineState();
    } else {
      navigate(-1);
    }
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
            <button className="btn btn-icon" onClick={handleBackBtn}>
              <ChevronLeft size={24} strokeWidth="2" />
            </button>
          }
          title={<h2>{!routineDetail ? "루틴추가" : "운동 추가"}</h2>}
        />

        <section className="container">
          <div className="search-bar">
            <input type="search" placeholder="기구명, 부위를 검색해주세요" />
            <button className="btn-search">
              <Search size={18} strokeWidth="1.5" />
            </button>
          </div>
        </section>
        <div className="category-wrap">
          <button className="btn-like active">
            <Star size={18} strokeWidth="1.5" />
            즐겨찾기
          </button>
          <button>허벅지</button>
          <button>어깨</button>
          <button>가슴</button>
          <button>팔</button>
          <button>등</button>
          <button>엉덩이</button>
          <button>엉덩이</button>
          <button>복근</button>
        </div>

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

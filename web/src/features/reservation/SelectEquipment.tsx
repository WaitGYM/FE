import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, RefreshCcw, X } from "lucide-react";
import Switch from "@mui/material/Switch";
import { useEquipmentStore } from "../../stores/equipmentStore";
import { useUIStore } from "../../stores/UIStore";
import Header from "../../components/layout/Header";
import EquipSearchBar from "../../components/EquipSearchBar";
import EquipCategoryFilter from "../../components/EquipCategoryFilter";
import EquipmentList from "../../components/EquipmentList";
import { BottomButtonWrapper } from "../../components/ui/Button";
import { useReservationStore } from "./stores/reservationStore";
import { useRoutineStore } from "../routine/store/routineStore";
import { useWorkoutStore } from "../workout/stores/workoutStore";
import CustomDialog from "../../components/ui/CustomDialog";
import motionIconSrc from "@img/motion-party.png";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { usePreferenceStore } from "../../stores/preferenceStore";
import { debounce } from "lodash";

export default function ReservationPage() {
  const { filter } = useParams();
  const navigate = useNavigate();
  const {
    equipmentList,
    getEquipments,
    isRoutineCompelte,
    setIsRoutineCompelte,
    resetEquipmentState,
  } = useEquipmentStore();
  const {
    isEquipAutoSorting,
    workoutMode,
    isWorkingOut,
    routineId,
    setIsEquipAutoSorting,
    resetWorkoutMode,
  } = useUIStore();
  const { workingOutInfo, startWorkout, startRoutineWorkout } =
    useWorkoutStore();
  const {
    selectedEquipment,
    waitingInfo,
    setSelectedEquipment,
    deleteReservation,
    resetSelectedEquipmentState,
  } = useReservationStore();
  const {
    routineDetail,
    setSelectedEquipList,
    setRoutineName,
    resetRoutineState,
  } = useRoutineStore();

  // 새로고침 아이콘회전
  const [isRefreshing, setIsRefreshing] = useState(false);
  const handleRefreshClick = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      getEquipments(filter);
      setIsRefreshing(false);
    }, 500);
  };

  // 툴팁
  const [isSortTooltipOpen, setIsSortTooltipOpen] = useState(false);
  const { hasSortTooltip, setHasSortTooltip } = usePreferenceStore();
  useEffect(() => {
    if (hasSortTooltip) return;
    setTimeout(() => setIsSortTooltipOpen(true), 1000);
    setHasSortTooltip(true);
  }, [hasSortTooltip, setHasSortTooltip]);

  // 페이지 진입시 루틴 완료 체크해서 콩그레츄
  const [modalOpen, setModalOpen] = useState(false); //모달 열림 상태
  const [shownOnce, setShownOnce] = useState(false); //이미 표시했는지 체크
  useEffect(() => {
    if (isRoutineCompelte && !shownOnce) {
      setModalOpen(true);

      const timer = setTimeout(() => {
        setModalOpen(false); // 3초 후 닫기
        setShownOnce(true); // 다시 안보이게 설정
        setIsRoutineCompelte(false); // 상태 초기화
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isRoutineCompelte, shownOnce]);

  function handleBackBtnClick() {
    navigate("/", { replace: true });

    if (routineDetail) resetRoutineState();
    resetSelectedEquipmentState();
    resetWorkoutMode();
    resetEquipmentState();
  }

  function handleRoutineUpdateBtnClick() {
    if (!routineDetail) return;
    setRoutineName(routineDetail.name);
    setSelectedEquipList(equipmentList);
    navigate("/add-routine/routine-setting");
  }

  ////// 검색 및 카테고리
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 디바운싱된 검색어 업데이트
  const debouncedSetSearchTerm = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
    }, 300),
    []
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
      new Set(equipmentList.map((eq) => eq.category))
    ).sort();
    return ["즐겨찾기", ...uniqueCategories];
  }, [equipmentList]);

  // 필터링된 기구 목록
  const filteredEquipmentList = useMemo(() => {
    let filtered = equipmentList;

    // 1. 카테고리 필터링 (선택된 카테고리가 있을 때만)
    if (selectedCategory === "즐겨찾기") {
      filtered = filtered.filter((eq) => eq.isFavorite);
    } else if (selectedCategory !== null) {
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

  function handleCategoryClick(category: string) {
    setSelectedCategory(selectedCategory === category ? null : category);
  }

  function handleDeleteReservation() {
    deleteReservation().then(() => getEquipments(filter));
  }

  function handleNextBtn() {
    if (routineDetail) {
      // 운동중이 아니고 대기 없으면 운동 시작으로
      if (!isWorkingOut && selectedEquipment.status?.isAvailable) {
        const workoutGoal = {
          totalSets: selectedEquipment.sets,
          restSeconds: selectedEquipment.restSeconds,
        };
        startRoutineWorkout(
          routineDetail.id,
          selectedEquipment.id,
          workoutGoal
        );
        navigate("/workout/exercising", { replace: true });
        resetSelectedEquipmentState();
      } else {
        navigate("/reservation/wait-request");
      }
    } else {
      navigate("/reservation/goal-setting");
    }
  }

  function handleStartWorkout() {
    const workoutGoal = {
      totalSets: waitingInfo?.sets,
      restSeconds: waitingInfo?.restSeconds,
    };
    startWorkout(selectedEquipment?.id, workoutGoal);
    navigate("/workout/exercising");
    resetSelectedEquipmentState();
  }

  return (
    <>
      <motion.div
        className="equipmentList-page reservation-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.2, ease: "easeInOut" }}
      >
        <div className="content-scroll">
          <Header
            className="header--equipment-detail"
            leftContent={
              <button
                className="btn btn-icon"
                onClick={handleBackBtnClick}
                aria-label="뒤로 가기"
              >
                <ChevronLeft size={20} strokeWidth="2" />
              </button>
            }
            title={
              <h2>
                {routineId && workoutMode === "routine"
                  ? routineDetail?.name
                  : "바로운동"}
              </h2>
            }
            rightContent={
              routineId &&
              !isWorkingOut && (
                <button
                  type="button"
                  className="btn-delete"
                  onClick={handleRoutineUpdateBtnClick}
                >
                  수정
                </button>
              )
            }
          />

          {!routineId || workoutMode === "direct" ? (
            <>
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
                onCategoryClick={handleCategoryClick}
              />
            </>
          ) : (
            ""
          )}

          <section className="container">
            <div className="equipment-wrap">
              <div className="top">
                <div className="auto-suggest">
                  <span>자동제안</span>

                  <Tooltip
                    title={
                      <>
                        대기 시간을 최소순서로
                        <br />
                        제안해드려요!
                        <X size={20} color="#9498A0" />
                      </>
                    }
                    open={isSortTooltipOpen}
                    slotProps={{
                      popper: {
                        onClick: () => setIsSortTooltipOpen(false),
                        sx: {
                          [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
                            {
                              marginBottom: "1.3rem",
                            },
                        },
                      },
                      tooltip: {
                        sx: {
                          bgcolor: "#fff",
                          color: "#293241",
                          fontSize: "15px",
                          padding: "12px 12px",
                          borderRadius: "4px",
                          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                          textAlign: "left",
                          lineHeight: "1.4",
                          width: "200px",
                          display: "grid",
                          gridTemplateColumns: "1fr 20px",
                        },
                      },
                      arrow: {
                        sx: {
                          color: "#fff",
                        },
                      },
                    }}
                    arrow
                  >
                    <Switch
                      checked={isEquipAutoSorting}
                      size="small"
                      color="warning"
                      slotProps={{ input: { "aria-label": "자동제안" } }}
                      onChange={(e) => setIsEquipAutoSorting(e.target.checked)}
                    />
                  </Tooltip>
                </div>
                <button className="btn-refresh" onClick={handleRefreshClick}>
                  <RefreshCcw
                    size={20}
                    strokeWidth="2"
                    className={isRefreshing ? "rotating" : ""}
                  />
                  <span>새로고침</span>
                </button>
              </div>

              <EquipmentList
                filter={filter}
                selectMode="SINGLE"
                selectedList={Array(selectedEquipment)}
                handleSelectedEquipment={setSelectedEquipment}
                overrideEquipmentList={filteredEquipmentList}
              />
            </div>
          </section>
        </div>

        {/* 대기 건 기구를 선택하면 대기취소 버튼 */}
        {selectedEquipment?.status?.myQueueId &&
          selectedEquipment?.status?.myQueueStatus !== "NOTIFIED" && (
            <BottomButtonWrapper>
              <button
                onClick={handleDeleteReservation}
                className="btn btn-orange"
              >
                대기 취소
              </button>
            </BottomButtonWrapper>
          )}

        {/* 내 대기건이 없고 내가 이용중이 아닌 이용불가 기구 선택시 다음버튼(대기) */}
        {/* 운동중이 아니고 이용가능 기구일때 다음버튼(운동) */}
        {selectedEquipment?.id &&
        ((!waitingInfo &&
          workingOutInfo.equipmentId !== selectedEquipment?.id &&
          !selectedEquipment.status.isAvailable) ||
          (!isWorkingOut && selectedEquipment?.status.isAvailable)) ? (
          <BottomButtonWrapper>
            <button onClick={handleNextBtn} className="btn btn-orange">
              다음
            </button>
          </BottomButtonWrapper>
        ) : null}

        {/* 대기중인 기구의 차례 되면 운동시작으로 */}
        {selectedEquipment?.status?.myQueuePosition === 1 &&
        selectedEquipment?.status?.myQueueStatus === "NOTIFIED" ? (
          <BottomButtonWrapper>
            <button onClick={handleStartWorkout} className="btn btn-orange">
              운동 시작
            </button>
          </BottomButtonWrapper>
        ) : null}
      </motion.div>

      <CustomDialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        showButtons={false}
      >
        <h6 className="title">
          <img
            src={motionIconSrc}
            alt="폭죽"
            style={{
              display: "block",
              width: "5rem",
              margin: "0 auto 1rem",
            }}
          />
          오늘도 루틴을
          <br />
          멋지게 성공하셨군요!
        </h6>
      </CustomDialog>
    </>
  );
}

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, CirclePlus } from "lucide-react";
import Header from "../../components/layout/Header";
import { BottomButtonWrapper } from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useRoutineStore } from "./store/routineStore";
import { useReservationStore } from "../reservation/stores/reservationStore";
import { useUIStore } from "../../stores/UIStore";
import CustomDialog from "../../components/ui/CustomDialog"; //수정,삭제 모달
import { isEqual } from "lodash";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import WorkoutGoal from "../../components/WorkoutGoal";
import type { EquipmentType } from "../../types";
import { usePreferenceStore } from "../../stores/preferenceStore";

export default function RoutineSetting() {
  const [isOpenBackConfirmDialog, setIsOpenBackConfirmDialog] = useState(false);
  const [isOpenRoutineDeleteDialog, setIsOpenRoutineDeleteDialog] =
    useState(false);
  const [isOpenEquipDeleteDialog, setIsOpenEquipDeleteDialog] = useState(false);
  const [isOpenRoutineUpdateDialog, setIsOpenRoutineUpdateDialog] =
    useState(false);
  const navigate = useNavigate();
  const {
    selectedEquipList,
    newRoutineName,
    originRoutineDetail,
    setSelectedEquipList,
    setRoutineName,
    getRoutineFilteringData,
    setRoutineEquipSorting,
    createRoutine,
    updateRoutine,
    deleteRoutine,
    resetSelectedEquipList,
    resetRoutineState,
  } = useRoutineStore();
  const { resetSelectedEquipmentState } = useReservationStore();
  const { routineId, resetWorkoutMode } = useUIStore();
  const [deleteList, setDeleteList] = useState<EquipmentType[]>([]);

  // 루틴 수정일때 드래그 버튼 툴팁
  const [isDragTooltipOpen, setIsDragTooltipOpen] = useState(false);
  const { hasDragTooltip, setHasDragTooltip } = usePreferenceStore();
  useEffect(() => {
    if (!routineId || hasDragTooltip) return;
    setTimeout(() => setIsDragTooltipOpen(true), 1000);
    setHasDragTooltip(true);
  }, [hasDragTooltip, setHasDragTooltip]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleNavigatingBack() {
    if (routineId) {
      navigate("/reservation/select-equipment/routine", { replace: true });
      resetSelectedEquipList();
    } else {
      navigate(-1);
    }
  }

  function checkDataChange() {
    getRoutineFilteringData();

    if (!isEqual(originRoutineDetail, getRoutineFilteringData())) {
      setIsOpenBackConfirmDialog(true);
    } else {
      handleNavigatingBack();
    }
  }

  async function handleDeleteRoutine() {
    await deleteRoutine();
    navigate("/", { replace: true });

    const timer = setTimeout(() => {
      resetRoutineState();
      resetSelectedEquipmentState();
      resetWorkoutMode();
    }, 100);
    return () => clearTimeout(timer);
  }

  function handleAddEquip() {
    navigate("/add-routine/select-equipment");
  }

  function handleEquipDelete() {
    setSelectedEquipList(deleteList);
    setIsOpenEquipDeleteDialog(false);
    setDeleteList([]);
  }

  async function handleUpdateRoutine() {
    await updateRoutine();
    resetSelectedEquipList();
    resetSelectedEquipmentState();
    navigate("/reservation/select-equipment/routine", { replace: true });
  }

  async function handleCreateRoutine() {
    await createRoutine();
    resetSelectedEquipList();
    navigate("/", { replace: true });
  }

  return (
    <motion.div
      className="equipmentDetail-page goal-setter"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: 0.2, ease: "easeInOut" }}
    >
      <div className="content-scroll">
        <Header
          className="header--equipment-detail"
          title={<h2>{routineId ? "루틴 설정" : "세트설정"}</h2>}
          leftContent={
            <button
              aria-haspopup="dialog"
              className="btn btn-icon"
              onClick={() =>
                routineId ? checkDataChange() : handleNavigatingBack()
              }
              aria-label="뒤로 가기"
            >
              <ChevronLeft size={24} strokeWidth="2" />
            </button>
          }
          rightContent={
            routineId && (
              <button
                aria-haspopup="dialog"
                className="btn-delete"
                onClick={() => setIsOpenRoutineDeleteDialog(true)}
              >
                삭제
              </button>
            )
          }
        />
        <div className="container">
          <section>
            <label htmlFor="routine-name">
              <p className="label-title">루틴 이름</p>
            </label>
            <input
              type="text"
              id="routine-name"
              placeholder="루틴 이름을 입력해주세요"
              value={newRoutineName}
              onChange={(e) => setRoutineName(e.target.value)}
            />
          </section>

          <section>
            <p className="label-title">운동 설정</p>

            {routineId && (
              <button
                type="button"
                className="btn-add"
                onClick={handleAddEquip}
              >
                <CirclePlus size={20} strokeWidth="2" />
                운동추가
              </button>
            )}
            <ul className="box-wrap">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                modifiers={[restrictToVerticalAxis]}
                onDragEnd={(event) => {
                  const { active, over } = event;
                  if (active.id !== over.id) {
                    const oldIndex = selectedEquipList.findIndex(
                      (i) => i.id === active.id
                    );
                    const newIndex = selectedEquipList.findIndex(
                      (i) => i.id === over.id
                    );
                    setRoutineEquipSorting(
                      arrayMove(selectedEquipList, oldIndex, newIndex)
                    );
                  }
                }}
              >
                <SortableContext
                  items={selectedEquipList.map((equip) => equip.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {selectedEquipList.map((equip, idx) => (
                    <WorkoutGoal
                      key={equip.id}
                      equipmentInfo={equip}
                      mode={routineId ? "update" : "create"}
                      isTooltipTarget={idx === 0 && isDragTooltipOpen}
                      onCloseTooltip={() => setIsDragTooltipOpen(false)}
                      selectedList={deleteList}
                      setSelectedList={setDeleteList}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            </ul>
          </section>
        </div>
      </div>
      <BottomButtonWrapper>
        {routineId && (
          <button
            aria-haspopup="dialog"
            className={`btn btn-blue ${!deleteList.length && "disabled"}`}
            disabled={!deleteList.length}
            onClick={() => setIsOpenEquipDeleteDialog(true)}
          >
            운동 삭제
          </button>
        )}
        <button
          aria-haspopup="dialog"
          className={`btn btn-orange ${
            !selectedEquipList.length && "disabled"
          }`}
          disabled={!selectedEquipList.length}
          onClick={() =>
            routineId
              ? setIsOpenRoutineUpdateDialog(true)
              : handleCreateRoutine()
          }
        >
          {/* 비활성화일때 .disabled를 붙여주세요 */}
          {/* <button className="btn btn-blue disabled">운동 삭제</button> */}
          {/* <button className="btn btn-orange disabled" onClick={handleCreateRoutine}> */}
          {routineId ? "루틴 수정" : "루틴 등록"}
        </button>
      </BottomButtonWrapper>

      <CustomDialog
        open={isOpenBackConfirmDialog}
        onClose={() => setIsOpenBackConfirmDialog(false)}
        onConfirm={handleNavigatingBack}
      >
        <h6 className="title">
          변경사항을 <strong className="text-orange">저장</strong>하지 않고
          <br />
          페이지를 나가시겠어요?
        </h6>
      </CustomDialog>

      <CustomDialog
        open={isOpenRoutineDeleteDialog}
        onClose={() => setIsOpenRoutineDeleteDialog(false)}
        onConfirm={handleDeleteRoutine}
      >
        <h6 className="title">
          이 루틴을
          <br />
          <strong className="text-orange">삭제</strong>하시겠어요?
        </h6>
      </CustomDialog>

      <CustomDialog
        open={isOpenEquipDeleteDialog}
        onClose={() => setIsOpenEquipDeleteDialog(false)}
        onConfirm={handleEquipDelete}
      >
        <h6 className="title">
          정말 운동을
          <br />
          <strong className="text-orange">삭제</strong> 하시겠어요?
        </h6>
      </CustomDialog>

      <CustomDialog
        open={isOpenRoutineUpdateDialog}
        onClose={() => setIsOpenRoutineUpdateDialog(false)}
        onConfirm={handleUpdateRoutine}
      >
        <h6 className="title">
          이 루틴을
          <br />
          <strong className="text-orange">수정</strong>하시겠어요?
        </h6>
      </CustomDialog>
    </motion.div>
  );
}

import type { EquipmentType } from "../types";
import { Plus, Minus, GripVertical, CircleCheck } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useRoutineStore } from "../features/routine/store/routineStore";
import { useState, useEffect } from "react";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

function formatSecondsToTime(seconds: number): string {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  const paddedHrs = String(min).padStart(2, "0");
  const paddedMins = String(sec).padStart(2, "0");
  return `${paddedHrs}:${paddedMins}`;
}

export default function WorkoutGoal({
  equipmentInfo,
  mode,
  selectedList,
  setSelectedList,
}: {
  equipmentInfo: EquipmentType;
  mode: "create" | "update";
  selectedList: EquipmentType[];
  setSelectedList: React.Dispatch<React.SetStateAction<EquipmentType[]>>;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id: equipmentInfo.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const { selectedEquipList, setSelectedEquipList, updateSelectedEquipment } =
    useRoutineStore();

  //툴팁관련
  const [isDragTooltipOpen, setIsDragTooltipOpen] = useState(false);

  useEffect(() => {
    const hasSeenTooltip = localStorage.getItem("hasDragTooltip");

    if (!hasSeenTooltip) {
      setTimeout(() => setIsDragTooltipOpen(true), 1000);
      localStorage.setItem("hasDragTooltip", "true");
    }
  }, []);
  return (
    <>
      <li className="box" ref={setNodeRef} style={style} {...attributes}>
        <div className="equipment">
          <div className="info">
            {mode == "update" && (
              <>
                <input
                  type="checkbox"
                  id={`select-${equipmentInfo?.name}`}
                  checked={selectedList.some(
                    (item) => item.id == equipmentInfo.id
                  )}
                  onChange={(e) => {
                    const newArr = e.target.checked
                      ? [...selectedList, equipmentInfo]
                      : [...selectedList].filter(
                          (item) => item.id != equipmentInfo.id
                        );
                    setSelectedList(newArr);
                  }}
                />
                <label htmlFor={`select-${equipmentInfo?.name}`}>
                  <CircleCheck size={20} strokeWidth="2" />
                </label>
              </>
            )}
            <div className="img">
              <img
                src={equipmentInfo.imageUrl}
                alt={equipmentInfo.name}
                loading="lazy"
                onLoad={({ target }) => {
                  target.classList.add("visible");
                }}
              />
            </div>
            <div className="title">
              <span className="name">{equipmentInfo?.name}</span>
            </div>
          </div>

          {mode == "update" ? (
            <button
              type="button"
              className="btn-drag-drop"
              ref={setActivatorNodeRef}
              {...listeners}
            >
              <Tooltip
                title={<>드래그로 순서를 바꿀 수 있어요.</>}
                open={isDragTooltipOpen}
                slotProps={{
                  popper: {
                    onClick: () => setIsDragTooltipOpen(false),
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
                      fontSize: "13px",
                      padding: "12px 16px",
                      borderRadius: "4px",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                      textAlign: "center",
                      lineHeight: "1.4",
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
                <GripVertical size={20} strokeWidth="2" />
              </Tooltip>
            </button>
          ) : selectedEquipList.length > 1 ? (
            <button
              type="button"
              className="btn-delete"
              onClick={() => setSelectedEquipList(equipmentInfo)}
            >
              삭제
            </button>
          ) : (
            ""
          )}
        </div>

        <div className="count-wrap">
          <div className="count set">
            <span className="title">세트</span>
            <div className="controller-wrap">
              <button
                className="btn btn-icon"
                onClick={() =>
                  updateSelectedEquipment(equipmentInfo.id, "sets", -1)
                }
                disabled={equipmentInfo.sets < 2}
              >
                <Minus size={20} strokeWidth="1.5" />
              </button>
              <span className="count-num">{equipmentInfo.sets}</span>
              <button
                className="btn btn-icon"
                onClick={() =>
                  updateSelectedEquipment(equipmentInfo.id, "sets", 1)
                }
                disabled={equipmentInfo.sets > 7}
              >
                <Plus size={20} strokeWidth="1.5" />
              </button>
            </div>
          </div>
          <div className="count break">
            <span className="title">휴식</span>
            <div className="controller-wrap">
              <button
                className="btn btn-icon"
                disabled={
                  equipmentInfo.restSeconds < 1 ||
                  (equipmentInfo.sets > 1 && equipmentInfo.restSeconds < 11)
                }
                onClick={() =>
                  updateSelectedEquipment(equipmentInfo.id, "restSeconds", -10)
                }
              >
                <Minus size={20} strokeWidth="1.5" />
              </button>
              <span className="count-num">
                {equipmentInfo.restSeconds === 0
                  ? "없음"
                  : formatSecondsToTime(equipmentInfo.restSeconds)}
              </span>
              <button
                className="btn btn-icon"
                disabled={
                  equipmentInfo.sets < 2 || equipmentInfo.restSeconds > 299
                }
                onClick={() =>
                  updateSelectedEquipment(equipmentInfo.id, "restSeconds", 10)
                }
              >
                <Plus size={20} strokeWidth="1.5" />
              </button>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}

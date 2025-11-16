import type { EquipmentType } from "../types";
import { useState } from "react";
import { Plus, Minus, GripVertical, CircleCheck } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useRoutineStore } from "../features/routine/store/routineStore";
import { useUIStore } from "../stores/UIStore";

function formatSecondsToTime(seconds: number): string {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  const paddedHrs = String(min).padStart(2, "0");
  const paddedMins = String(sec).padStart(2, "0");
  return `${paddedHrs}:${paddedMins}`;
}

export default function WorkoutGoal({
  equipmentInfo,
}: {
  equipmentInfo: EquipmentType;
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
  const { routineId } = useUIStore();
  const [deleteList, setDeleteList] = useState([]);

  return (
    <>
      <li className="box" ref={setNodeRef} style={style} {...attributes}>
        <div className="equipment">
          <div className="info">
            {routineId && (
              <>
                <input
                  type="checkbox"
                  id={`select-${equipmentInfo?.name}`}
                  checked={deleteList.some(
                    (item) => item.id == equipmentInfo.id
                  )}
                  onChange={(e) => {
                    const newArr = e.target.checked
                      ? [...deleteList, equipmentInfo]
                      : [...deleteList].filter(
                          (item) => item.id != equipmentInfo.id
                        );
                    setDeleteList(newArr);
                  }}
                />
                <label htmlFor={`select-${equipmentInfo?.name}`}>
                  <CircleCheck size={20} strokeWidth="2" />
                </label>
              </>
            )}
            <div className="img">
              <img src={equipmentInfo?.imageUrl || "/equipment_01.png"} />
            </div>
            <div className="title">
              <span className="name">{equipmentInfo?.name}</span>
            </div>
          </div>

          {routineId ? (
            <button
              type="button"
              className="btn-drag-drop"
              ref={setActivatorNodeRef}
              {...listeners}
            >
              <GripVertical size={20} strokeWidth="2" />
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

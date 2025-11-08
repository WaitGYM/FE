//백업용 페이지 나중에 작업다하시면 삭제하셔도 됩니다

import { motion } from "framer-motion";
import {
  ChevronLeft,
  Plus,
  Minus,
  CirclePlus,
  GripVertical,
  CircleCheck,
} from "lucide-react";
import Header from "../../components/layout/Header";
import { BottomButtonWrapper } from "../../components/ui/Button";
import { useState } from "react";
//수정,삭제 모달
import CustomDialog from "../../components/ui/CustomDialog";

// This is a preview component with hardcoded data for UI testing.
export default function RoutineSettingPreview() {
  const [newRoutineName, setNewRoutineName] = useState("오늘의 운동 루틴");
  const [selectedEquipList, setSelectedEquipList] = useState([
    {
      id: 1,
      name: "Treadmill",
      imageUrl: "/assets/images/machine-treadmill.png",
      sets: 3,
      restSeconds: 60,
    },
    {
      id: 2,
      name: "Bench Press",
      imageUrl: "/assets/images/machine-bench.png",
      sets: 5,
      restSeconds: 120,
    },
  ]);

  // 모달 상태 관리
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState<any>(null);

  const handleClose = () => {
    setOpen(false);
  };

  function formatSecondsToTime(seconds: number): string {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    let timeString = "";
    if (min > 0) {
      timeString += `${min}분 `;
    }
    if (sec > 0) {
      timeString += `${sec}초`;
    }
    return timeString.trim();
  }

  function handleBackBtnClick() {
    setModalContent(
      <h6 className="title">
        변경사항을 <strong className="text-orange">저장</strong>하지 않고
        <br />
        페이지를 나가시겠어요?
      </h6>
    );
    setOpen(true);
  }

  function handleRoutineDelete() {
    setModalContent(
      <h6 className="title">
        정말 루틴을
        <br />
        <strong className="text-orange">삭제</strong> 하시겠어요?
      </h6>
    );
    setOpen(true);
  }
  function handleEquipDelete() {
    setModalContent(
      <h6 className="title">
        정말 운동을
        <br />
        <strong className="text-orange">삭제</strong> 하시겠어요?
      </h6>
    );
    setOpen(true);
  }

  function handleNextBtnClick() {
    setModalContent(
      <h6 className="title">
        이 루틴을
        <br />
        <strong className="text-orange">수정</strong>하시겠어요?
      </h6>
    );
    setOpen(true);
  }

  function updateSelectedEquipment(
    eqId: number,
    field: "sets" | "restSeconds",
    changeValue: number
  ) {
    const newEquipmentList = selectedEquipList.map((curEq) => {
      if (curEq.id !== eqId) {
        return curEq;
      } else {
        const updatedValue = Math.max(0, curEq[field] + changeValue);
        let newEquipment = {
          ...curEq,
          [field]: updatedValue,
        };
        // 세트수 조절 시 휴식시간 조건 적용
        if (field === "sets") {
          if (updatedValue >= 2 && newEquipment.restSeconds < 10) {
            newEquipment.restSeconds = 10;
          } else if (updatedValue < 2) {
            newEquipment.restSeconds = 0;
          }
        }
        // 휴식시간 조절 시 세트수 조건 고려
        if (field === "restSeconds") {
          if (newEquipment.sets >= 2 && updatedValue < 10) {
            newEquipment.restSeconds = 10;
          } else {
            newEquipment.restSeconds = updatedValue;
          }
        }
        return newEquipment;
      }
    });
    setSelectedEquipList(newEquipmentList);
  }

  function handleRemoveEquipment(equipId: number) {
    setSelectedEquipList((prevList) =>
      prevList.filter((equip) => equip.id !== equipId)
    );
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
          title={<h2>루틴설정</h2>}
          leftContent={
            <button className="btn btn-icon" onClick={handleBackBtnClick}>
              <ChevronLeft size={24} strokeWidth="2" />
            </button>
          }
          rightContent={
            <button
              type="button"
              className="btn-delete"
              onClick={handleRoutineDelete}
            >
              삭제
            </button>
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
              onChange={(e) => setNewRoutineName(e.target.value)}
            />
          </section>
          <section>
            <p className="label-title">운동 설정</p>
            <button type="button" className="btn-add">
              <CirclePlus />
              운동 추가
            </button>
            <ul className="box-wrap">
              {selectedEquipList.map((equip) => (
                <li className="box" key={equip.id}>
                  <div className="equipment">
                    <input type="checkbox" id={`select-${equip?.name}`} />
                    <label htmlFor={`select-${equip?.name}`}>
                      <CircleCheck />
                    </label>
                    <div className="info">
                      <div className="img">
                        <img src={equip?.imageUrl || "/equipment_01.png"} />
                      </div>
                      <div className="title">
                        <span className="name">{equip?.name}</span>
                      </div>
                    </div>
                    {/* {selectedEquipList.length > 1 && (
                      <button
                        className="btn-delete"
                        onClick={() => handleRemoveEquipment(equip.id)}
                      >
                        <Trash size={16} strokeWidth="1.5" />
                        삭제
                      </button>
                    )} */}
                    <button type="button" className="btn-drag-drop">
                      <GripVertical />
                    </button>
                  </div>
                  <div className="count-wrap">
                    <div className="count set">
                      <span className="title">세트</span>
                      <div className="controller-wrap">
                        <button
                          className="btn btn-icon"
                          onClick={() =>
                            updateSelectedEquipment(equip.id, "sets", -1)
                          }
                          disabled={equip.sets < 2}
                        >
                          <Minus size={20} strokeWidth="1.5" />
                        </button>
                        <span className="count-num">{equip.sets}</span>
                        <button
                          className="btn btn-icon"
                          onClick={() =>
                            updateSelectedEquipment(equip.id, "sets", 1)
                          }
                          disabled={equip.sets > 7}
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
                            equip.restSeconds < 1 ||
                            (equip.sets > 1 && equip.restSeconds < 11)
                          }
                          onClick={() =>
                            updateSelectedEquipment(
                              equip.id,
                              "restSeconds",
                              -10
                            )
                          }
                        >
                          <Minus size={20} strokeWidth="1.5" />
                        </button>
                        <span className="count-num">
                          {equip.restSeconds === 0
                            ? "없음"
                            : formatSecondsToTime(equip.restSeconds)}
                        </span>
                        <button
                          className="btn btn-icon"
                          disabled={equip.sets < 2 || equip.restSeconds > 299}
                          onClick={() =>
                            updateSelectedEquipment(equip.id, "restSeconds", 10)
                          }
                        >
                          <Plus size={20} strokeWidth="1.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
      <BottomButtonWrapper>
        <button className="btn btn-blue" onClick={handleEquipDelete}>
          운동 삭제
        </button>
        <button className="btn btn-orange" onClick={handleNextBtnClick}>
          {/* 비활성화일때 .disabled를 붙여주세요 */}
          {/* <button className="btn btn-blue disabled">운동 삭제</button> */}
          {/* <button className="btn btn-orange disabled" onClick={handleNextBtnClick}> */}
          루틴 수정
        </button>
      </BottomButtonWrapper>

      {/* 모달 */}
      <CustomDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="modal-contents">{modalContent}</div>
        <BottomButtonWrapper>
          <button className="btn btn-blue" onClick={handleClose}>
            취소
          </button>
          <button className="btn btn-orange" onClick={handleClose}>
            확인
          </button>
        </BottomButtonWrapper>
      </CustomDialog>
      {/* 모달 */}
    </motion.div>
  );
}

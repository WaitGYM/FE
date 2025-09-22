import { ChevronLeft, Trash, Plus, Minus } from "lucide-react";
import Header from "../../components/layout/Header";
import { BottomButtonWrapper } from "../../components/ui/Button";
import { useUIStore } from "../../stores/UIStore";

export default function EquipmentDetail() {
  const { workoutMode, planId } = useUIStore();

  return (
    <div className="equipmentDetail-page">
      <div className="content-scroll">
        <Header
          className="header--equipment-detail"
          title={<h2>루틴수정</h2>}
          leftContent={
            <button className="btn btn-icon">
              <ChevronLeft size={24} strokeWidth="2" />
            </button>
          }
          rightContent={<span>삭제</span>}
        />
        <div className="container">
          <section>
            <label htmlFor="routine-name">
              <p className="label-title">루틴 이름</p>
            </label>
            <input
              type="text"
              placeholder="루틴 이름을 입력해주세요"
              value="8월 22일 운동 루틴"
              id="routine-name"
            />
          </section>
          <section>
            <p className="label-title">운동 상세 설정</p>
            <ul className="box-wrap">
              <li className="box">
                <div className="equipment">
                  <div className="img">
                    <img src="/equipment_01.png" />
                  </div>
                  <div className="info">
                    <div className="title">
                      <span className="name">힙어브덕션</span>
                    </div>
                  </div>
                  <button className="btn-delete">
                    <Trash size={16} strokeWidth="1.5" />
                    삭제
                  </button>
                </div>

                <div className="count-wrap">
                  <div className="count set">
                    <span className="title">세트</span>
                    <div className="controller-wrap">
                      <button className="btn btn-icon">
                        <Minus size={20} strokeWidth="1.5" />
                      </button>
                      <span className="count-num">3</span>
                      <button className="btn btn-icon">
                        <Plus size={20} strokeWidth="1.5" />
                      </button>
                    </div>
                  </div>
                  <div className="count break">
                    <span className="title">휴식</span>
                    <div className="controller-wrap">
                      <button className="btn btn-icon">
                        <Minus size={20} strokeWidth="1.5" />
                      </button>
                      <span className="count-num">00:30</span>
                      <button className="btn btn-icon">
                        <Plus size={20} strokeWidth="1.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
              <li className="box">
                <div className="equipment">
                  <div className="img">
                    <img src="/equipment_01.png" />
                  </div>
                  <div className="info">
                    <div className="title">
                      <span className="name">트레드밀</span>
                    </div>
                  </div>
                  <button className="btn-delete">
                    <Trash size={16} strokeWidth="1.5" />
                    삭제
                  </button>
                </div>

                <div className="count-wrap">
                  <div className="count set">
                    <span className="title">세트</span>
                    <div className="controller-wrap">
                      <button className="btn btn-icon">
                        <Minus size={20} strokeWidth="1.5" />
                      </button>
                      <span className="count-num">1</span>
                      <button className="btn btn-icon">
                        <Plus size={20} strokeWidth="1.5" />
                      </button>
                    </div>
                  </div>
                  <div className="count break">
                    <span className="title">휴식</span>
                    <div className="controller-wrap">
                      <button className="btn btn-icon">
                        <Minus size={20} strokeWidth="1.5" />
                      </button>
                      <span className="count-num">없음</span>
                      {/* 세트수가 1일때 휴식시간은 당연히 없음 */}
                      <button className="btn btn-icon">
                        <Plus size={20} strokeWidth="1.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </div>
      <BottomButtonWrapper>
        <button className="btn btn-orange">루틴 수정하기</button>
      </BottomButtonWrapper>
    </div>
  );
}

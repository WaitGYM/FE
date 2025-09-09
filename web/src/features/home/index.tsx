import Footer from "../../components/layout/Footer";
import { Bell, Dumbbell, Plus } from "lucide-react";
import logo from "@img/logo.svg"; //이미지로고
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { usePlanStore } from "../../stores/planStore";
import type { PlanType } from "../../types";

export default function HomePage() {
  const { plans, loading, error, getPlans, clearError } = usePlanStore();

  useEffect(() => {
    getPlans();
  }, [getPlans]);

  return (
    <div className="home-page">
      <div className="content-scroll">
        <header>
          <div className="header-top">
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>
            <div className="icon-bell">
              <Bell size={24} strokeWidth="1.5" />
            </div>
          </div>

          <div className="greeting">
            OO님,
            <br />
            오늘도 루틴대로 운동해볼까요?
          </div>
        </header>
        <div className="container">
          <section>
            {loading ? (
              <div>로딩 중...</div>
            ) : !plans || plans.length < 1 ? (
              <ul className="not-routine">
                <li className="routine">
                  <div className="icon">
                    <Plus size={32} strokeWidth="1.5" />
                  </div>
                  <div className="info">
                    <p className="title">루틴을 등록해주세요</p>
                  </div>
                </li>
              </ul>
            ) : (
              <ul className="routine-list">
                {plans.map((plan: PlanType) => (
                  <li className="routine" key={plan.id}>
                    <div className="icon">
                      <Dumbbell size={32} strokeWidth="1.5" />
                    </div>
                    <div className="info">
                      <p className="title">{plan.name}</p>
                      <div className="detail">
                        <span>{plan.equipmentNum}개 운동</span>
                        <span>예상시간 {plan.duration}분</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {error && (
              <div>
                {error}
                <button onClick={clearError}>×</button>
              </div>
            )}
          </section>
        </div>
      </div>

      <div className="btn-wrap">
        <Link to="/reservation" className="btn btn-blue" id="no-routine">
          바로운동
        </Link>
        <Link to="/" className="btn btn-orange" id="routine-add">
          루틴추가
        </Link>
      </div>
      <Footer />
    </div>
  );
}

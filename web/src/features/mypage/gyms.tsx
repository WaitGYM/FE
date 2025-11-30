import { ChevronLeft, Store, Search, Star } from "lucide-react";
import Header from "../../components/layout/Header";
import { BottomButtonWrapper } from "../../components/ui/Button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Gyms() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="mypage-page"
      id="gyms"
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
        title={<span>이용 헬스장 변경</span>}
      />

      <div className="container">
        <div className="search-bar">
          <input type="search" placeholder="헬스장 이름을 검색해주세요" />
          <button className="btn-search" aria-label="검색">
            <Search size={20} strokeWidth="1.5" aria-hidden="true" />
          </button>
        </div>
        <div className="category-wrap">
          <button className="btn-like active">
            <Star size={20} strokeWidth="1.5" aria-hidden="true" />
            즐겨찾기
          </button>
        </div>

        <div className="gyms-wrap">
          <ul className="gyms-list">
            <li className="selected">
              <button className="gyms">
                <div className="thumb">
                  <Store size={24} strokeWidth="1.5" aria-hidden="true" />
                </div>
                <div className="info">
                  <div className="title">
                    <span className="badge busy">혼잡</span>
                    <span className="name">짐박스 신림점</span>
                    <div className="favorite">
                      <Star
                        size={20}
                        strokeWidth="1.5"
                        aria-hidden="true"
                        className="on"
                      />
                    </div>
                  </div>
                  <div className="address">
                    서울 관악구 신림로59길 14 민속순대타운 5층
                  </div>
                </div>
              </button>
            </li>
            <li className="">
              <button className="gyms">
                <div className="thumb">
                  <Store size={24} strokeWidth="1.5" aria-hidden="true" />
                </div>
                <div className="info">
                  <div className="title">
                    <span className="badge normal">보통</span>
                    <span className="name">짐박스 신림점</span>
                    <div className="favorite">
                      <Star
                        size={20}
                        strokeWidth="1.5"
                        aria-hidden="true"
                        className=""
                      />
                    </div>
                  </div>
                  <div className="address">
                    서울 관악구 신림로59길 14 민속순대타운 5층
                  </div>
                </div>
              </button>
            </li>
            <li className="">
              <button className="gyms">
                <div className="thumb">
                  <Store size={24} strokeWidth="1.5" aria-hidden="true" />
                </div>
                <div className="info">
                  <div className="title">
                    <span className="badge free">여유</span>
                    <span className="name">짐박스 신림점</span>
                    <div className="favorite">
                      <Star
                        size={20}
                        strokeWidth="1.5"
                        aria-hidden="true"
                        className=""
                      />
                    </div>
                  </div>
                  <div className="address">
                    서울 관악구 신림로59길 14 민속순대타운 5층
                  </div>
                </div>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <BottomButtonWrapper>
        <button className="btn btn-orange">수정하기</button>
      </BottomButtonWrapper>
    </motion.div>
  );
}

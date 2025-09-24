import { ChevronLeft, Store, Search, Star } from "lucide-react";
import Header from "../../components/layout/Header";
import { BottomButtonWrapper } from "../../components/ui/Button";

export default function Gyms({
  name = "힙어브덕션",
  imgSrc = "/equipment_01.png",
  isFavorite = true,
}: EquipmentType) {
  return (
    <div className="mypage-page" id="favorites">
      <Header
        className="header--mypage"
        leftContent={
          <button className="btn btn-icon">
            <ChevronLeft size={24} strokeWidth="2" />
          </button>
        }
        title={<span>즐겨찾기한 기구</span>}
      />

      <div className="category-wrap">
        <button className="active">전체</button>
        <button>허벅지</button>
        <button>어깨</button>
        <button>가슴</button>
        <button>팔</button>
        <button>등</button>
        <button>엉덩이</button>
        <button>엉덩이</button>
        <button>복근</button>
      </div>
      <div className="container">
        <div className="equipment-wrap">
          <ul className="equipment-list">
            <li className="">
              <div className="equipment">
                <img src={imgSrc} />
                <div className="info">
                  <div className="title">
                    <span className="name">{name}</span>
                    <div className="favorite">
                      {isFavorite ? (
                        <Star size={18} strokeWidth="1.5" className="on" />
                      ) : (
                        <Star size={18} strokeWidth="1.5" className="" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="">
              <div className="equipment">
                <img src={imgSrc} />
                <div className="info">
                  <div className="title">
                    <span className="name">{name}</span>
                    <div className="favorite">
                      {isFavorite ? (
                        <Star size={18} strokeWidth="1.5" className="on" />
                      ) : (
                        <Star size={18} strokeWidth="1.5" className="" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="">
              <div className="equipment">
                <img src={imgSrc} />
                <div className="info">
                  <div className="title">
                    <span className="name">{name}</span>
                    <div className="favorite">
                      {isFavorite ? (
                        <Star size={18} strokeWidth="1.5" className="on" />
                      ) : (
                        <Star size={18} strokeWidth="1.5" className="" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="">
              <div className="equipment">
                <img src={imgSrc} />
                <div className="info">
                  <div className="title">
                    <span className="name">{name}</span>
                    <div className="favorite">
                      {isFavorite ? (
                        <Star size={18} strokeWidth="1.5" className="on" />
                      ) : (
                        <Star size={18} strokeWidth="1.5" className="" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

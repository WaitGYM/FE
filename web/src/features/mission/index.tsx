import { motion } from "framer-motion";
import { NavLink, Route, Routes } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import TabMission from "./components/Mission";
import TabRanking from "./components/Ranking";
import NotificationButton from "../../components/ui/NotificationButton";

export default function ChallengeScreen() {
  return (
    <motion.div
      className="challenge-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2, ease: "easeInOut" }}
    >
      <div className="content-scroll">
        <Header
          className="header--achive"
          leftContent={
            <nav className="header-tab">
              <NavLink
                to="/challenge/mission"
                replace
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                미션
              </NavLink>
              <NavLink
                to="/challenge/ranking"
                replace
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                랭킹
              </NavLink>
            </nav>
          }
          rightContent={<NotificationButton />}
        />
        <Routes>
          <Route path="mission" element={<TabMission />} />
          <Route path="ranking" element={<TabRanking />} />
        </Routes>
      </div>

      <Footer />
    </motion.div>
  );
}

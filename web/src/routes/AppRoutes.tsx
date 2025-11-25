import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthInit } from "../hooks/useAuthInit";
import { useAuthStore } from "../stores/authStore";
import { socketService } from "../services/socketService";
import Login from "../features/login";
import OAuthSuccess from "../features/login/oauth-success";
import HomeScreen from "../features/home"; //메인
import PushList from "../features/notification/PushList"; //푸시리스트

import ReservationSelectEquipment from "../features/reservation/SelectEquipment"; // 세트설정
import ReservationGoalSetting from "../features/reservation/GoalSetting"; // 세트설정
import ReservationWaitRequest from "../features/reservation/WaitRequest"; // 세트설정

import RoutineSelectEquipment from "../features/routine/SelectEquipment"; // 루틴 추가
import RoutineSetting from "../features/routine/RoutineSetting"; // 루틴 추가

import WorkoutExercising from "../features/workout/Exercising"; //운동중
import WorkoutBreaktimer from "../features/workout/Breaktimer"; //휴식중
import WorkoutCompletePage from "../features/workout/Complete"; //운동완료

import ChallengeScreen from "../features/mission";

import Mypage from "../features/mypage"; //내정보
import Profile from "../features/mypage/profile"; //개인정보 수정
import Gyms from "../features/mypage/gyms"; //헬스장변경
import Favorites from "../features/mypage/favorites"; //즐겨찾기한기구

import NotificationPopup from "../components/ui/NotificationPopup";

export default function AppRoutes() {
  useAuthInit();
  const token = useAuthStore((state) => state.token);

  // 웹소켓 연결
  if (token) socketService.connect(token);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={token ? <Navigate to="/" replace /> : <Login />}
        />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route
          path="/"
          element={token ? <HomeScreen /> : <Navigate to="/login" replace />}
        />
        <Route path="/pushlist" element={<PushList />} />

        <Route
          path="/reservation/select-equipment/:filter?"
          element={<ReservationSelectEquipment />}
        />
        <Route
          path="/reservation/goal-setting"
          element={<ReservationGoalSetting />}
        />
        <Route
          path="/reservation/wait-request"
          element={<ReservationWaitRequest />}
        />

        <Route
          path="/add-routine/select-equipment/:filter?"
          element={<RoutineSelectEquipment />}
        />
        <Route
          path="/add-routine/routine-setting"
          element={<RoutineSetting />}
        />

        <Route path="/workout/exercising" element={<WorkoutExercising />} />
        <Route path="/workout/breaktimer" element={<WorkoutBreaktimer />} />
        <Route path="/workout/complete" element={<WorkoutCompletePage />} />

        <Route
          path="/challenge"
          element={<Navigate to="/challenge/mission" />}
        />
        <Route path="/challenge/*" element={<ChallengeScreen />} />

        <Route path="/mypage" element={<Mypage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/gyms" element={<Gyms />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>

      <WorkoutBreaktimer />
      <NotificationPopup />
    </BrowserRouter>
  );
}

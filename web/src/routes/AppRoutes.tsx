import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthInit } from "../hooks/useAuthInit";
import { useAuthStore } from "../stores/authStore";
import Login from "../features/login";
import OAuthSuccess from "../features/login/oauth-success";
import HomePage from "../features/home"; //메인
// import EquipmentList from "../features/equipment/equipmentList"; //기구리스트
// import EquipmentDetail from "../features/equipment/equipmentDetail"; //세트수정
import ReservationGoalSetting from "../features/reservation/GoalSetting"; // 세트설정
import ReservationSelectEquipment from "../features/reservation/SelectEquipment"; // 세트설정
import ReservationWaitRequest from "../features/reservation/WaitRequest"; // 세트설정
import Plan from "../features/plan"; // 루틴 추가
import WorkoutBooking from "../features/reservation/WaitRequest"; // 대기 요청
import WorkoutExercising from "../features/workout/Exercising"; //운동중
import WorkoutBreaktimer from "../features/workout/Breaktimer"; //휴식중
import WorkoutCompletePage from "../features/workout/Complete"; //운동완료
import WorkoutReservation from "../features/workout/Reservation"; //운동예약

export default function AppRoutes() {
  useAuthInit();
  const token = useAuthStore((state) => state.token);

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
          element={token ? <HomePage /> : <Navigate to="/login" replace />}
        />
        {/* <Route path="/equipment-list" element={<EquipmentList />} />
        <Route path="/equipment-detail" element={<EquipmentDetail />} /> */}
        <Route
          path="/reservation/select-equipment"
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
        <Route path="/add-plan" element={<Plan />} />
        <Route path="/workout/booking" element={<WorkoutBooking />} />
        <Route path="/workout/exercising" element={<WorkoutExercising />} />
        <Route path="/workout/breaktimer" element={<WorkoutBreaktimer />} />
        <Route path="/workout/complete" element={<WorkoutCompletePage />} />
        {/* <Route path="/workout/reservation" element={<WorkoutReservation />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

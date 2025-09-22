import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthInit } from "../hooks/useAuthInit";
import { useAuthStore } from "../stores/authStore";
import Login from "../features/login";
import OAuthSuccess from "../features/login/oauth-success";
import HomePage from "../features/home"; //메인
import PushList from "../features/home/PushList"; //푸시리스트
import EquipmentList from "../features/equipment/equipmentList"; //기구리스트
import EquipmentDetail from "../features/equipment/equipmentDetail"; //세트수정
import WorkoutBooking from "../features/workout/Booking"; //예약중
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
        <Route path="/home/pushlist" element={<PushList />} />
        <Route path="/equipmentList" element={<EquipmentList />} />
        <Route path="/equipmentDetail" element={<EquipmentDetail />} />
        <Route path="/workout/booking" element={<WorkoutBooking />} />
        <Route path="/workout/exercising" element={<WorkoutExercising />} />
        <Route path="/workout/breaktimer" element={<WorkoutBreaktimer />} />
        <Route path="/workout/complete" element={<WorkoutCompletePage />} />
        <Route path="/workout/reservation" element={<WorkoutReservation />} />
      </Routes>
    </BrowserRouter>
  );
}

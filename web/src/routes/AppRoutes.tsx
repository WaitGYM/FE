import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../features/login";
import OauthSuccess from "../features/login/oauth-success";
import HomePage from "../features/home";
import Reservation from "../features/reservation";
import WorkoutBooking from "../features/workout/booking"; //예약중
import WorkoutExercising from "../features/workout/exercising"; //운동중
import WorkoutCompletePage from "../features/workout/Complete";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/oauth-success" element={<OauthSuccess />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/workout/booking" element={<WorkoutBooking />} />
        <Route path="/workout/exercising" element={<WorkoutExercising />} />
        <Route path="/workout/complete" element={<WorkoutCompletePage />} />
      </Routes>
    </BrowserRouter>
  );
}

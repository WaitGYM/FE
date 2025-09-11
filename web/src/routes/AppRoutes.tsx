import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../features/login";
import OauthSuccess from "../features/login/oauth-success";
import HomePage from "../features/home";
import Reservation from "../features/reservation";
import WorkoutBooking from "../features/workout/Booking"; //예약중
import WorkoutExercising from "../features/workout/Exercising"; //운동중
import WorkoutBreaktimer from "../features/workout/Breaktimer";
import WorkoutCompletePage from "../features/workout/Complete";
import WorkoutReservation from "../features/workout/Reservation"; //운동예약

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
        <Route path="/workout/breaktimer" element={<WorkoutBreaktimer />} />
        <Route path="/workout/complete" element={<WorkoutCompletePage />} />

        <Route path="/workout/reservation" element={<WorkoutReservation />} />
      </Routes>
    </BrowserRouter>
  );
}

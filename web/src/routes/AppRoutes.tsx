import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../features/home";

import WorkoutCompletePage from "../features/workout/Complete";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        <Route path="/workout/complete" element={<WorkoutCompletePage />} />
      </Routes>
    </BrowserRouter>
  );
}

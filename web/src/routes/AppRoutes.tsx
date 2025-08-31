import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../features/home";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

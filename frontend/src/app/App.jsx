import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import UnitDetailsPage from "../pages/UnitDetailsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/units/:id" element={<UnitDetailsPage />} />
    </Routes>
  );
}
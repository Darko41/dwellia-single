import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import UnitDetailsPage from "../pages/UnitDetailsPage";
import BookingPage from "../pages/BookingPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/unit/:id" element={<UnitDetailsPage />} />
        <Route path="/book/:unitId" element={<BookingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
import { Routes, Route } from "react-router-dom";

import HomePage from "@/pages/HomePage";
import UnitDetailsPage from "@/pages/UnitDetailsPage";

import AdminLayout from "@/features/admin/layout/AdminLayout";
import AdminDashboard from "@/features/admin/pages/AdminDashboard";
import AdminUnits from "@/features/admin/pages/AdminUnits";
import AdminBookings from "@/features/admin/pages/AdminBookings";

export default function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<HomePage />} />
      <Route path="/units/:id" element={<UnitDetailsPage />} />

      {/* ADMIN */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="units" element={<AdminUnits />} />
        <Route path="bookings" element={<AdminBookings />} />
      </Route>
    </Routes>
  );
}
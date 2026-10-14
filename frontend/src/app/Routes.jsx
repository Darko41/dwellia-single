import { Routes, Route } from "react-router-dom";

import HomePage from "@/pages/HomePage";
import BookingPage from "@/pages/BookingPage";
import UnitDetailsPage from "@/pages/UnitDetailsPage";

import AdminLayout from "@/features/admin/layout/AdminLayout";
import AdminUnits from "@/features/admin/pages/AdminUnits";
import AdminShowings from "@/features/admin/pages/AdminShowings";
import AdminApplications from "@/features/admin/pages/AdminApplications";
import AdminApplicationCreate from "@/features/admin/pages/AdminApplicationCreate";
import AdminApplicationDetail from "@/features/admin/pages/AdminApplicationDetail";

import LoginPage from "@/features/auth/pages/LoginPage";
import ProtectedRoute from "@/features/auth/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<HomePage />} />
      <Route path="/units/:id" element={<UnitDetailsPage />} />
      <Route path="/book/:unitId" element={<BookingPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="units" element={<AdminUnits />} />
        <Route path="showings" element={<AdminShowings />} />

        <Route path="applications" element={<AdminApplications />} />
        <Route
          path="applications/new"
          element={<AdminApplicationCreate />}
        />
        <Route
          path="applications/:id"
          element={<AdminApplicationDetail />}
        />
      </Route>
    </Routes>
  );
}
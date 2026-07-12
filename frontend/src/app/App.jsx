import { Routes, Route } from "react-router-dom";

import Header from "@/shared/components/Header/Header";
import Footer from "@/shared/components/Footer/Footer";

import HomePage from "@/pages/HomePage";
import BookingPage from "@/pages/BookingPage";
import UnitDetailsPage from "@/pages/UnitDetailsPage";

import AdminLayout from "@/features/admin/layout/AdminLayout";
import AdminUnits from "@/features/admin/pages/AdminUnits";
import AdminBookings from "@/features/admin/pages/AdminBookings";

import LoginPage from "@/features/auth/pages/LoginPage";

import ProtectedRoute from "@/features/auth/ProtectedRoute";

function App() {
  return (
    <>
      <Header />

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
          <Route path="bookings" element={<AdminBookings />} />
        </Route>
      </Routes>

      <Footer />
    </>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import HomePage from "../pages/HomePage";
import BookingPage from "../pages/BookingPage";
import UnitDetailsPage from "../pages/UnitDetailsPage";

import AdminLayout from "../features/admin/layout/AdminLayout";
import AdminDashboard from "../features/admin/pages/AdminDashboard";
import AdminUnits from "../features/admin/pages/AdminUnits";
import AdminBookings from "../features/admin/pages/AdminBookings";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<HomePage />} />
        <Route path="/units/:id" element={<UnitDetailsPage />} />
        <Route path="/book/:unitId" element={<BookingPage />} />

        {/* ADMIN CMS */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="units" element={<AdminUnits />} />
          <Route path="bookings" element={<AdminBookings />} />
        </Route>
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
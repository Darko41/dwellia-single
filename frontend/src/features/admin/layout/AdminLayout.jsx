import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar />

      <main style={{ flex: 1, padding: 20, background: "#fafafa" }}>
        <Outlet />
      </main>
    </div>
  );
}
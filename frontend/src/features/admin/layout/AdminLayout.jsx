import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div style={{ display: "flex" }}>
      {/* SIDEBAR */}
      <aside style={{
        width: 220,
        padding: 20,
        background: "#111",
        color: "white",
        minHeight: "100vh"
      }}>
        <h2>Admin</h2>

        <nav style={{ display: "grid", gap: 10 }}>
          <Link to="/admin" style={{ color: "white" }}>Dashboard</Link>
          <Link to="/admin/units" style={{ color: "white" }}>Units</Link>
          <Link to="/admin/bookings" style={{ color: "white" }}>Bookings</Link>
        </nav>
      </aside>

      {/* CONTENT */}
      <main style={{ padding: 20, flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
}
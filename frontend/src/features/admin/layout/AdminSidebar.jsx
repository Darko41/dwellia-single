import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <aside
      style={{
        width: 240,
        borderRight: "1px solid #ddd",
        padding: 20,
        background: "#fff",
      }}
    >
      <h2 style={{ marginBottom: 20 }}>CMS Admin</h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <NavLink to="/admin">Dashboard</NavLink>
        <NavLink to="/admin/units">Units</NavLink>
        <NavLink to="/admin/bookings">Bookings</NavLink>
      </nav>
    </aside>
  );
}
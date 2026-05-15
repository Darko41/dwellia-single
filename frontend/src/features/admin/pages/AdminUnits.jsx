import { useUnits } from "@/features/units/hooks/useUnits";
import { useState } from "react";
import { apiClient } from "@/lib/apiClient";

export default function AdminUnits() {
  const { data = [], refetch } = useUnits();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    bedrooms: "",
    bathrooms: ""
  });

  const createUnit = async () => {
    await apiClient.post("/units", form);
    refetch();
  };

  return (
    <div>
      <h1>Manage Units</h1>

      {/* CREATE FORM */}
      <div style={{ display: "grid", gap: 10, maxWidth: 400 }}>
        <input placeholder="Title"
          onChange={e => setForm({ ...form, title: e.target.value })} />

        <input placeholder="Description"
          onChange={e => setForm({ ...form, description: e.target.value })} />

        <input placeholder="Price"
          onChange={e => setForm({ ...form, price: e.target.value })} />

        <input placeholder="Bedrooms"
          onChange={e => setForm({ ...form, bedrooms: e.target.value })} />

        <input placeholder="Bathrooms"
          onChange={e => setForm({ ...form, bathrooms: e.target.value })} />

        <button onClick={createUnit}>
          Create Unit
        </button>
      </div>

      {/* LIST */}
      <h2 style={{ marginTop: 30 }}>Existing Units</h2>

      <ul>
        {data.map(u => (
          <li key={u.id}>
            {u.title} — ${u.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
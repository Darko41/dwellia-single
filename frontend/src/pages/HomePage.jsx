import { useUnits } from "@/features/units/hooks/useUnits";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { data = [], isLoading, isError } = useUnits();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading units</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Available Units</h1>

      <div style={{ display: "grid", gap: 12 }}>
        {data.map((unit) => (
          <Link
            key={unit.id}
            to={`/units/${unit.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              border: "1px solid #ccc",
              padding: 12,
              display: "block",
            }}
          >
            <h3>{unit.title}</h3>
            <p>${unit.price}</p>
            <p>{unit.bedrooms} bed / {unit.bathrooms} bath</p>
            <strong>{unit.status}</strong>
          </Link>
        ))}
      </div>
    </div>
  );
}
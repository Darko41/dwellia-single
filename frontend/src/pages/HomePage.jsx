import { useEffect, useState } from "react";
import { getUnits } from "../features/units/services/unitsApi";

export default function HomePage() {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUnits()
      .then((data) => {
        setUnits(Array.isArray(data) ? data : []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Units</h1>

      {units.map((u) => (
        <div key={u.id}>
          <h3>{u.title}</h3>
          <p>{u.price}</p>
        </div>
      ))}
    </div>
  );
}
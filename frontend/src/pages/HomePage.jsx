import { useUnits } from "@/features/units/hooks/useUnits";
import UnitCard from "@/features/units/components/UnitCard";

export default function HomePage() {
  const { data = [], isLoading, isError } = useUnits();

  if (isLoading) return <p className="state">Loading units...</p>;
  if (isError) return <p className="state">Failed to load units</p>;

  return (
    <div className="page">
      <h1 className="title">Available Units</h1>

      <div className="grid">
        {data.map((unit) => (
          <UnitCard key={unit.id} unit={unit} />
        ))}
      </div>
    </div>
  );
}
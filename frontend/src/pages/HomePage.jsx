import { useUnits } from "../features/units/hooks/useUnits";
import UnitCard from "../features/units/components/UnitCard";

export default function HomePage() {
  const { data, isLoading } = useUnits();

  if (isLoading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {data.map(unit => (
        <UnitCard key={unit.id} unit={unit} />
      ))}
    </div>
  );
}
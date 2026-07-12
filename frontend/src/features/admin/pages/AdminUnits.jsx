import { useUnits } from "@/features/units/hooks/useUnits";

export default function AdminUnits() {
  const { data: units, isLoading, error } = useUnits();

  if (isLoading) return <p>Loading units...</p>;
  if (error) return <p>Failed to load units</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Units</h1>

      <div className="grid gap-3">
        {units?.map((unit) => (
          <div key={unit.id} className="border p-3 rounded">
            <h3 className="font-bold">{unit.title}</h3>
            <p>{unit.description}</p>
            <p>${unit.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
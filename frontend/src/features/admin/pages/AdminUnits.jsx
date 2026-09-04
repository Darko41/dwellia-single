import useUnits from "@/features/units/hooks/useUnits";

export default function AdminUnits() {
  const { data: units, isLoading, error } = useUnits();

  if (isLoading) {
    return <p>Loading units...</p>;
  }

  if (error) {
    return <p>Failed to load units</p>;
  }

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">
        Units
      </h1>

      <div className="grid gap-3">
        {units?.map((unit) => (
          <div
            key={unit.id}
            className="rounded border p-3"
          >
            <h3 className="font-bold">
              {unit.unitTypeName} — Unit {unit.unitNumber}
            </h3>

            <p>
              {unit.propertyName}, {unit.cityName}
            </p>

            <p>
              {unit.bedrooms} bed / {unit.bathrooms} bath
            </p>

            <p>
              ${unit.rent}
            </p>

            <p>
              Status: {unit.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
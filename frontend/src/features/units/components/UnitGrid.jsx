import UnitCard from "./UnitCard";

export default function UnitGrid({ units }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {units.map((unit) => (
        <UnitCard
          key={unit.id}
          unit={unit}
        />
      ))}
    </div>
  );
}
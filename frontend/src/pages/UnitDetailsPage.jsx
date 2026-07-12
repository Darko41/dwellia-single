import { useParams } from "react-router-dom";
import { useUnit } from "@/features/units/hooks/useUnit";

export default function UnitDetailsPage() {
  const { id } = useParams();
  const { data: unit, isLoading } = useUnit(id);

  if (isLoading) return <p>Loading...</p>;

  if (!unit) return <p>Unit not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{unit.title}</h1>
      <p>{unit.description}</p>
      <p className="mt-2 font-semibold">${unit.price}</p>
    </div>
  );
}
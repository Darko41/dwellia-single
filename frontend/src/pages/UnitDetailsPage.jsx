import { useParams } from "react-router-dom";

import useUnit from "@/features/units/hooks/useUnit";
import UnitDetails from "@/features/units/components/UnitDetails";


export default function UnitDetailsPage() {

  const { id } = useParams();


  const {
    data: unit,
    isLoading,
    error,
  } = useUnit(id);


  if (isLoading) {
    return (
      <div className="p-8">
        Loading unit...
      </div>
    );
  }


  if (error || !unit) {
    return (
      <div className="p-8 text-red-600">
        Unit not found.
      </div>
    );
  }


  return (
    <main className="mx-auto max-w-4xl p-8">

      <UnitDetails unit={unit} />

    </main>
  );
}
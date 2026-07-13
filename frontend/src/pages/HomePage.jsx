import useUnits from "@/features/units/hooks/useUnits";
import UnitGrid from "@/features/units/components/UnitGrid";

export default function HomePage() {
  const {
    data: units = [],
    isLoading,
    error,
  } = useUnits();

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        Loading available units...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        Failed to load units.
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl p-8">
      <h1 className="mb-8 text-3xl font-bold">
        Available Units
      </h1>

      <UnitGrid units={units} />
    </main>
  );
}
import { useQuery } from "@tanstack/react-query";
import { getUnitById } from "@/features/units/api/unitsApi";

export default function useUnit(id) {
  return useQuery({
    queryKey: ["unit", id],
    queryFn: () => getUnitById(id),
    enabled: !!id,
  });
}
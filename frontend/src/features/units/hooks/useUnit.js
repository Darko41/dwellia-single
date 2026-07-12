import { useQuery } from "@tanstack/react-query";
import { getUnitById } from "../api/unitsApi";

export function useUnit(id) {
  return useQuery({
    queryKey: ["unit", id],
    queryFn: () => getUnitById(id),
    enabled: !!id,
  });
}
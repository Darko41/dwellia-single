import { useQuery } from "@tanstack/react-query";
import { getUnitById } from "../services/unitsApi";

export const useUnit = (id) => {
  return useQuery({
    queryKey: ["unit", id],
    queryFn: () => getUnitById(id),
    enabled: !!id,
  });
};
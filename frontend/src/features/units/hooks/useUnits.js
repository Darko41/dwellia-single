import { useQuery } from "@tanstack/react-query";
import { getUnits } from "../api/unitsApi";

export function useUnits() {
  return useQuery({
    queryKey: ["units"],
    queryFn: getUnits,
  });
}
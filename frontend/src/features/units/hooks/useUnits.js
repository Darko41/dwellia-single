import { useQuery } from "@tanstack/react-query";
import { getUnits } from "@/features/units/api/unitsApi";

export default function useUnits() {
  return useQuery({
    queryKey: ["units"],
    queryFn: getUnits,
  });
}
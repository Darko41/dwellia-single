import { useQuery } from "@tanstack/react-query";
import { getUnits } from "../services/unitsApi";

export const useUnits = () => {
  return useQuery({
    queryKey: ["units"],
    queryFn: getUnits,
  });
};
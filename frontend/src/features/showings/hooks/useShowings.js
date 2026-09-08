import { useQuery } from "@tanstack/react-query";
import { getShowings } from "@/features/showings/api/showingApi";

export default function useShowings() {
  return useQuery({
    queryKey: ["showings"],
    queryFn: getShowings,
  });
}
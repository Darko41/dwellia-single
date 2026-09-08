import { useMutation } from "@tanstack/react-query";
import { createShowing } from "@/features/showings/api/showingApi";

export default function useCreateShowing() {
  return useMutation({
    mutationFn: createShowing,
  });
}
import { useMutation } from "@tanstack/react-query";
import { createLead } from "@/features/showings/api/showingApi";

export default function useCreateLead() {
  return useMutation({
    mutationFn: createLead,
  });
}
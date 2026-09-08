import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rescheduleShowing } from "@/features/showings/api/showingApi";

export default function useRescheduleShowing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ showingId, scheduledAt }) =>
      rescheduleShowing(showingId, scheduledAt),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["showings"],
      });
    },
  });
}
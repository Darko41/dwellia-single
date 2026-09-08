import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateShowingStatus } from "@/features/showings/api/showingApi";

export default function useUpdateShowingStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ showingId, status }) =>
      updateShowingStatus(showingId, status),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["showings"],
      });
    },
  });
}
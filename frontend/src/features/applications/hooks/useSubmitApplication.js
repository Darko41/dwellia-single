import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitApplication } from "@/features/applications/api/applicationApi";

export default function useSubmitApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitApplication,
    onSuccess: (updated) => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });

      queryClient.invalidateQueries({
        queryKey: ["application", updated.id],
      });
    },
  });
}
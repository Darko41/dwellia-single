import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createApplication } from "@/features/applications/api/applicationApi";

export default function useCreateApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });
    },
  });
}
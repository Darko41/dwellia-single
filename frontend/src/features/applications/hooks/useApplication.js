import { useQuery } from "@tanstack/react-query";
import { getApplication } from "@/features/applications/api/applicationApi";

export default function useApplication(applicationId) {
  const normalizedId =
    applicationId != null ? Number(applicationId) : applicationId;

  return useQuery({
    queryKey: ["application", normalizedId],
    queryFn: () => getApplication(normalizedId),
    enabled: normalizedId != null && !Number.isNaN(normalizedId),
  });
}
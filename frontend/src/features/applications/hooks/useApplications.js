import { useQuery } from "@tanstack/react-query";
import { getApplications } from "@/features/applications/api/applicationApi";

// TODO_COMPANY: Remove once User -> Company exists.
// This hook does not accept a companyId; getApplications currently
// fills it in from TEMP_COMPANY_ID inside applicationApi.js.
// When the auth refactor lands, thread companyId through here instead
// of relying on the constant.
export default function useApplications({ leadId, status } = {}) {
  return useQuery({
    queryKey: ["applications", { leadId: leadId ?? null, status: status ?? null }],
    queryFn: () => getApplications({ leadId, status }),
  });
}
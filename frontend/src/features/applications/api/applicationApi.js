import { axiosInstance } from "@/shared/api/client";

// TODO_COMPANY: Remove once User -> Company exists.
// The authenticated user does not carry a company yet, so we pin it here
// in one place. GET /api/applications requires companyId as a request param.
// When the auth refactor lands, replace TEMP_COMPANY_ID with
// useAuth().user.companyId at the call site and delete this constant.
const TEMP_COMPANY_ID = 1;

export const createApplication = async ({ leadId, unitId, showingId }) => {
  const res = await axiosInstance.post("/api/applications", {
    leadId,
    unitId,
    showingId,
  });

  return res.data;
};

export const submitApplication = async (applicationId) => {
  const res = await axiosInstance.post(
    `/api/applications/${applicationId}/submit`
  );

  return res.data;
};

export const getApplication = async (applicationId) => {
  const res = await axiosInstance.get(
    `/api/applications/${applicationId}`
  );

  return res.data;
};

export const getApplications = async ({ leadId, status } = {}) => {
  const params = {
    companyId: TEMP_COMPANY_ID,
  };

  if (leadId != null) {
    params.leadId = leadId;
  }

  if (status != null) {
    params.status = status;
  }

  const res = await axiosInstance.get("/api/applications", {
    params,
  });

  return res.data;
};

export const updateApplicationStatus = async (applicationId, status) => {
  const res = await axiosInstance.patch(
    `/api/applications/${applicationId}/status`,
    null,
    {
      params: {
        status,
      },
    }
  );

  return res.data;
};
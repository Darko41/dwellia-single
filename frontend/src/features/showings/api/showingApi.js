import { axiosInstance } from "@/shared/api/client";

export const createLead = async ({
  firstName,
  lastName,
  email,
  phone,
  unitId,
}) => {
  const res = await axiosInstance.post("/api/leads", {
    firstName,
    lastName,
    email,
    phone,
    unitId,
  });

  return res.data;
};

export const createShowing = async ({
  unitId,
  leadId,
  scheduledAt,
  notes,
}) => {
  const res = await axiosInstance.post(`/api/showings/${unitId}`, {
    leadId,
    scheduledAt,
    notes,
  });

  return res.data;
};

export const getShowings = async () => {
  const res = await axiosInstance.get("/api/showings");
  return res.data;
};

export const updateShowingStatus = async (showingId, status) => {
  const res = await axiosInstance.patch(
    `/api/showings/${showingId}/status`,
    null,
    {
      params: {
        status,
      },
    }
  );

  return res.data;
};

export const rescheduleShowing = async (showingId, scheduledAt) => {
  const res = await axiosInstance.patch(
    `/api/showings/${showingId}/schedule`,
    {
      scheduledAt,
    }
  );

  return res.data;
};
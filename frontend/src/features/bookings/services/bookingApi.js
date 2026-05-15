import { apiClient } from "@/lib/apiClient";

export const createBooking = async (unitId, data) => {
  const res = await apiClient.post(`/bookings/${unitId}`, data);
  return res.data;
};
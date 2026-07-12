import { axiosInstance } from "@/shared/api/client";

export const createBooking = async (unitId, data) => {
  const res = await axiosInstance.post(`/bookings/${unitId}`, data);
  return res.data;
};

export const getBookings = async () => {
  const res = await axiosInstance.get("/bookings");
  return res.data;
};
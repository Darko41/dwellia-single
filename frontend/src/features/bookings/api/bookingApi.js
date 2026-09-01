import { axiosInstance } from "@/shared/api/client";

export const createBooking = async (unitId, data) => {
  const res = await axiosInstance.post(
    `/api/bookings/${unitId}`,
    data
  );

  return res.data;
};

export const getBookings = async () => {
  const res = await axiosInstance.get("/api/bookings");

  return res.data;
};

export const updateBookingStatus = async (bookingId, status) => {
  const res = await axiosInstance.patch(
    `/api/bookings/${bookingId}/status`,
    null,
    {
      params: {
        status,
      },
    }
  );

  return res.data;
};
import { useMutation } from "@tanstack/react-query";
import { createBooking } from "@/features/bookings/api/bookingApi";

export default function useCreateBooking() {
  return useMutation({
    mutationFn: ({ unitId, data }) =>
      createBooking(unitId, data),
  });
}
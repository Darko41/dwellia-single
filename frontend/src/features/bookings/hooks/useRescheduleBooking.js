import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rescheduleBooking } from "@/features/bookings/api/bookingApi";

export default function useRescheduleBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookingId, scheduledAt }) =>
      rescheduleBooking(bookingId, scheduledAt),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
  });
}
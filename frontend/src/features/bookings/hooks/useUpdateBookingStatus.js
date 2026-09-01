import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBookingStatus } from "@/features/bookings/api/bookingApi";

export default function useUpdateBookingStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookingId, status }) =>
      updateBookingStatus(bookingId, status),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
  });
}
import { useMutation } from "@tanstack/react-query";
import { createBooking } from "../services/bookingApi";

export const useCreateBooking = () => {
  return useMutation({
    mutationFn: ({ unitId, data }) => createBooking(unitId, data),
  });
};
import { useQuery } from "@tanstack/react-query";
import { getBookings } from "@/features/bookings/api/bookingApi";


export default function useBookings() {

  return useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

}
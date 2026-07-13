import useBookings from "@/features/bookings/hooks/useBookings";


export default function AdminBookings() {

  const {
    data: bookings,
    isLoading,
    error,
  } = useBookings();


  if (isLoading) {
    return <p>Loading bookings...</p>;
  }


  if (error) {
    return (
      <p>
        Failed to load bookings
      </p>
    );
  }


  return (
    <div>

      <h1 className="mb-6 text-2xl font-bold">
        Bookings
      </h1>


      <div className="grid gap-4">

        {bookings?.map((booking) => (

          <div
            key={booking.id}
            className="rounded border p-4"
          >

            <h2 className="font-bold">
              {booking.fullName}
            </h2>


            <p>
              Email: {booking.email}
            </p>


            <p>
              Phone: {booking.phone}
            </p>


            <p>
              Unit: {booking.unit?.title}
            </p>


            <p>
              Status: {booking.status}
            </p>


            <p className="text-sm text-gray-500">
              Created: {booking.createdAt}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}
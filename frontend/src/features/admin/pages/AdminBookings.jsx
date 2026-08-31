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
    console.error(error);
    return <p>Failed to load bookings.</p>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">
        Bookings
      </h1>

      {bookings?.length === 0 && (
        <p>No bookings found.</p>
      )}

      <div className="grid gap-4">
        {bookings?.map((booking) => (
          <div
            key={booking.id}
            className="border rounded p-4"
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
              Unit ID: {booking.unit?.id}
            </p>

            <p>
              Scheduled:{" "}
              {booking.scheduledAt
                ? new Date(booking.scheduledAt).toLocaleString()
                : "Not scheduled"}
            </p>

            <p>
              Booking status: {booking.status}
            </p>

            <p>
              Unit status: {booking.unit?.status}
            </p>

            <p>
              Created:{" "}
              {booking.createdAt
                ? new Date(booking.createdAt).toLocaleString()
                : "—"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
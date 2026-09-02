import useBookings from "@/features/bookings/hooks/useBookings";
import useUpdateBookingStatus from "@/features/bookings/hooks/useUpdateBookingStatus";

export default function AdminBookings() {
  const {
    data: bookings,
    isLoading,
    error,
  } = useBookings();

  const updateStatus = useUpdateBookingStatus();

  if (isLoading) {
    return <p>Loading bookings...</p>;
  }

  if (error) {
    console.error(error);
    return <p>Failed to load bookings.</p>;
  }

  const handleStatusChange = async (bookingId, status) => {
    try {
      await updateStatus.mutateAsync({
        bookingId,
        status,
      });
    } catch (error) {
      console.error(error);
      alert("Failed to update booking status.");
    }
  };

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
              Booking status:{" "}
              <span className="font-semibold">
                {booking.status}
              </span>
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

            {booking.status === "NEW" && (
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() =>
                    handleStatusChange(
                      booking.id,
                      "CONFIRMED"
                    )
                  }
                  disabled={updateStatus.isPending}
                  className="rounded bg-green-600 px-3 py-2 text-white"
                >
                  Confirm
                </button>

                <button
                  onClick={() => {
                    const confirmed = window.confirm(
                      "Are you sure you want to cancel this booking?"
                    );

                    if (confirmed) {
                      handleStatusChange(
                        booking.id,
                        "CANCELLED"
                      );
                    }
                  }}
                  disabled={updateStatus.isPending}
                  className="rounded bg-red-600 px-3 py-2 text-white"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
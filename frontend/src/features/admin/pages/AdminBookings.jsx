import { useState } from "react";

import useBookings from "@/features/bookings/hooks/useBookings";
import useUpdateBookingStatus from "@/features/bookings/hooks/useUpdateBookingStatus";
import useRescheduleBooking from "@/features/bookings/hooks/useRescheduleBooking";

export default function AdminBookings() {
  const {
    data: bookings,
    isLoading,
    error,
  } = useBookings();

  const updateStatus = useUpdateBookingStatus();
  const reschedule = useRescheduleBooking();
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("ASC");

  const filteredBookings =
    statusFilter === "ALL"
      ? bookings
      : bookings?.filter(
          (booking) => booking.status === statusFilter
        );

  const sortedBookings = [...(filteredBookings || [])].sort(
    (a, b) => {
      const dateA = new Date(a.scheduledAt);
      const dateB = new Date(b.scheduledAt);

      return sortOrder === "ASC"
        ? dateA - dateB
        : dateB - dateA;
    }
  );

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

  const handleReschedule = async (bookingId, scheduledAt) => {
    if (!scheduledAt) {
      return;
    }

    try {
      await reschedule.mutateAsync({
        bookingId,
        scheduledAt,
      });

      alert("Booking rescheduled successfully.");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to reschedule booking."
      );
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">
        Bookings
      </h1>

      <div className="mb-4">
        <label className="mr-2 font-semibold">
          Filter by status:
        </label>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded p-2"
        >
          <option value="ALL">All</option>
          <option value="NEW">New</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="mr-2 font-semibold">
          Sort by tour time:
        </label>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border rounded p-2"
        >
          <option value="ASC">Soonest first</option>
          <option value="DESC">Latest first</option>
        </select>
      </div>

      {filteredBookings?.length === 0 && (
        <p>No bookings found for this filter.</p>
      )}

      <div className="grid gap-4">
        {sortedBookings.map((booking) => (
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
              <span
                className={`inline-block rounded px-2 py-1 text-sm font-semibold ${
                  booking.status === "NEW"
                    ? "bg-yellow-100 text-yellow-800"
                    : booking.status === "CONFIRMED"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
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

            {(booking.status === "NEW" ||
              booking.status === "CONFIRMED") && (
              <div className="flex gap-2 mt-4">

                {booking.status === "NEW" && (
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
                )}

                <input
                  type="datetime-local"
                  min={new Date()
                    .toISOString()
                    .slice(0, 16)}
                  defaultValue={
                    booking.scheduledAt
                      ? new Date(booking.scheduledAt)
                          .toISOString()
                          .slice(0, 16)
                      : ""
                  }
                  id={`reschedule-${booking.id}`}
                  className="border p-2"
                />

                <button
                  onClick={() => {
                    const input = document.getElementById(
                      `reschedule-${booking.id}`
                    );

                    if (!input.value) {
                      alert("Please choose a new date and time.");
                      return;
                    }

                    const confirmed = window.confirm(
                      "Are you sure you want to reschedule this booking?"
                    );

                    if (confirmed) {
                      handleReschedule(
                        booking.id,
                        input.value
                      );
                    }
                  }}
                  disabled={reschedule.isPending}
                  className="rounded bg-blue-600 px-3 py-2 text-white"
                >
                  {reschedule.isPending
                    ? "Rescheduling..."
                    : "Reschedule"}
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
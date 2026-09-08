import useShowings from "@/features/showings/hooks/useShowings";
import useUpdateShowingStatus from "@/features/showings/hooks/useUpdateShowingStatus";
import useRescheduleShowing from "@/features/showings/hooks/useRescheduleShowing";

import { useMemo, useState } from "react";

export default function AdminShowings() {
  const {
    data: showings = [],
    isLoading,
    error,
  } = useShowings();

  const updateStatusMutation = useUpdateShowingStatus();
  const rescheduleMutation = useRescheduleShowing();

  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortDirection, setSortDirection] = useState("ASC");

  const [rescheduleShowingId, setRescheduleShowingId] = useState(null);
  const [newScheduledAt, setNewScheduledAt] = useState("");

  const filteredAndSortedShowings = useMemo(() => {
    let result = [...showings];

    if (statusFilter !== "ALL") {
      result = result.filter(
        (showing) => showing.status === statusFilter
      );
    }

    result.sort((a, b) => {
      const dateA = new Date(a.scheduledAt).getTime();
      const dateB = new Date(b.scheduledAt).getTime();

      return sortDirection === "ASC"
        ? dateA - dateB
        : dateB - dateA;
    });

    return result;
  }, [showings, statusFilter, sortDirection]);

  const handleConfirm = async (showingId) => {
    try {
      await updateStatusMutation.mutateAsync({
        showingId,
        status: "CONFIRMED",
      });
    } catch (err) {
      alert(
        err?.response?.data?.message ||
          "Failed to confirm showing."
      );
    }
  };

  const handleCancel = async (showingId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this showing?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await updateStatusMutation.mutateAsync({
        showingId,
        status: "CANCELLED",
      });
    } catch (err) {
      alert(
        err?.response?.data?.message ||
          "Failed to cancel showing."
      );
    }
  };

  const openReschedule = (showing) => {
    const date = new Date(showing.scheduledAt);

    const timezoneOffset = date.getTimezoneOffset();

    const localDateTime = new Date(
      date.getTime() - timezoneOffset * 60000
    )
      .toISOString()
      .slice(0, 16);

    setRescheduleShowingId(showing.id);
    setNewScheduledAt(localDateTime);
  };

  const handleReschedule = async () => {
    if (!newScheduledAt) {
      alert("Please choose a new showing date and time.");
      return;
    }

    const selectedDate = new Date(newScheduledAt);

    if (selectedDate <= new Date()) {
      alert("The showing date and time must be in the future.");
      return;
    }

    try {
      await rescheduleMutation.mutateAsync({
        showingId: rescheduleShowingId,
        scheduledAt: newScheduledAt,
      });

      setRescheduleShowingId(null);
      setNewScheduledAt("");
    } catch (err) {
      alert(
        err?.response?.data?.message ||
          "Failed to reschedule showing."
      );
    }
  };

  if (isLoading) {
    return <p>Loading showings...</p>;
  }

  if (error) {
    return <p>Failed to load showings.</p>;
  }

  return (
    <div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl font-bold">
          Showings
        </h1>

        <div className="flex flex-wrap gap-3">

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            className="rounded border px-3 py-2"
          >
            <option value="ALL">All</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="NO_SHOW">No Show</option>
          </select>

          <button
            type="button"
            onClick={() =>
              setSortDirection((current) =>
                current === "ASC" ? "DESC" : "ASC"
              )
            }
            className="rounded border px-3 py-2"
          >
            Tour time:{" "}
            {sortDirection === "ASC"
              ? "Earliest first"
              : "Latest first"}
          </button>

        </div>
      </div>

      <div className="grid gap-4">

        {filteredAndSortedShowings.length === 0 && (
          <p className="text-gray-500">
            No showings found.
          </p>
        )}

        {filteredAndSortedShowings.map((showing) => (

          <div
            key={showing.id}
            className="rounded border bg-white p-4 shadow-sm"
          >

            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">

              <div>
                <h2 className="font-semibold">
                  {showing.leadName}
                </h2>

                <p className="text-sm text-gray-600">
                  {showing.leadEmail}
                </p>
              </div>

              <span className="rounded bg-gray-100 px-2 py-1 text-sm">
                {showing.status}
              </span>

            </div>

            <div className="mb-4 grid gap-2 text-sm md:grid-cols-2">

              <p>
                <span className="font-medium">
                  Unit:
                </span>{" "}
                {showing.unitNumber}
              </p>

              <p>
                <span className="font-medium">
                  Property:
                </span>{" "}
                {showing.propertyName}
              </p>

              <p>
                <span className="font-medium">
                  Tour:
                </span>{" "}
                {new Date(
                  showing.scheduledAt
                ).toLocaleString()}
              </p>

              {showing.notes && (
                <p>
                  <span className="font-medium">
                    Notes:
                  </span>{" "}
                  {showing.notes}
                </p>
              )}

            </div>

            <div className="flex flex-wrap gap-2">

              {showing.status === "SCHEDULED" && (
                <button
                  type="button"
                  onClick={() =>
                    handleConfirm(showing.id)
                  }
                  disabled={updateStatusMutation.isPending}
                  className="rounded bg-green-600 px-3 py-2 text-white hover:bg-green-700 disabled:opacity-50"
                >
                  Confirm
                </button>
              )}

              {(showing.status === "SCHEDULED" ||
                showing.status === "CONFIRMED") && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      openReschedule(showing)
                    }
                    className="rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
                  >
                    Reschedule
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleCancel(showing.id)
                    }
                    disabled={updateStatusMutation.isPending}
                    className="rounded bg-red-600 px-3 py-2 text-white hover:bg-red-700 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </>
              )}

            </div>

            {rescheduleShowingId === showing.id && (
              <div className="mt-4 border-t pt-4">

                <label
                  htmlFor={`reschedule-${showing.id}`}
                  className="mb-1 block text-sm font-medium"
                >
                  New date and time
                </label>

                <input
                  id={`reschedule-${showing.id}`}
                  type="datetime-local"
                  value={newScheduledAt}
                  onChange={(event) =>
                    setNewScheduledAt(
                      event.target.value
                    )
                  }
                  className="mr-2 rounded border px-3 py-2"
                />

                <button
                  type="button"
                  onClick={handleReschedule}
                  disabled={rescheduleMutation.isPending}
                  className="mr-2 rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  Save
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setRescheduleShowingId(null);
                    setNewScheduledAt("");
                  }}
                  className="rounded border px-3 py-2"
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
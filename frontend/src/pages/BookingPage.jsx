import { useParams } from "react-router-dom";
import { useState } from "react";

import useUnit from "@/features/units/hooks/useUnit";
import useCreateLead from "@/features/showings/hooks/useCreateLead";
import useCreateShowing from "@/features/showings/hooks/useCreateShowing";

export default function BookingPage() {
  const { unitId } = useParams();

  const {
    data: unit,
    isLoading: isUnitLoading,
    error: unitError,
  } = useUnit(unitId);

  const createLeadMutation = useCreateLead();
  const createShowingMutation = useCreateShowing();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    scheduledAt: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSuccess(false);
    setError("");

    if (!form.scheduledAt) {
      setError("Please choose a tour date and time.");
      return;
    }

    const selectedDate = new Date(form.scheduledAt);
    const now = new Date();

    if (selectedDate <= now) {
      setError("The tour date and time must be in the future.");
      return;
    }

    const nameParts = form.fullName.trim().split(/\s+/);

    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ");

    if (!firstName || !lastName) {
      setError("Please enter your full name.");
      return;
    }

    try {
      const lead = await createLeadMutation.mutateAsync({
        firstName,
        lastName,
        email: form.email,
        phone: form.phone,
        unitId: Number(unitId),
      });

      await createShowingMutation.mutateAsync({
        unitId: Number(unitId),
        leadId: lead.id,
        scheduledAt: form.scheduledAt,
      });

      setSuccess(true);

      setForm({
        fullName: "",
        email: "",
        phone: "",
        scheduledAt: "",
      });
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Failed to book the tour. Please try again.";

      setError(message);
    }
  };

  if (isUnitLoading) {
    return (
      <div className="p-8">
        Loading unit...
      </div>
    );
  }

  if (unitError || !unit) {
    return (
      <div className="p-8 text-red-600">
        Unit not found.
      </div>
    );
  }

  const submitting =
    createLeadMutation.isPending ||
    createShowingMutation.isPending;

  const minimumDateTime = new Date();
  const timezoneOffset = minimumDateTime.getTimezoneOffset();

  const localDateTime = new Date(
    minimumDateTime.getTime() - timezoneOffset * 60000
  )
    .toISOString()
    .slice(0, 16);

  return (
    <main className="mx-auto max-w-2xl p-8">

      <h1 className="mb-2 text-3xl font-bold">
        Book a Tour
      </h1>

      <p className="mb-6 text-gray-600">
        {unit.unitTypeName} — Unit {unit.unitNumber}
      </p>

      {success && (
        <div className="mb-6 rounded border border-green-300 bg-green-50 p-4 text-green-700">
          Your tour has been scheduled successfully.
        </div>
      )}

      {error && (
        <div className="mb-6 rounded border border-red-300 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl border bg-white p-6 shadow"
      >

        <div>
          <label
            htmlFor="fullName"
            className="mb-1 block text-sm font-medium"
          >
            Full name
          </label>

          <input
            id="fullName"
            name="fullName"
            type="text"
            value={form.fullName}
            onChange={handleChange}
            required
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium"
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="mb-1 block text-sm font-medium"
          >
            Phone
          </label>

          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div>
          <label
            htmlFor="scheduledAt"
            className="mb-1 block text-sm font-medium"
          >
            Tour date and time
          </label>

          <input
            id="scheduledAt"
            name="scheduledAt"
            type="datetime-local"
            value={form.scheduledAt}
            onChange={handleChange}
            min={localDateTime}
            required
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Booking..." : "Book Tour"}
        </button>

      </form>

    </main>
  );
}
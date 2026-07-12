import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCreateBooking } from "@/features/bookings/hooks/useCreateBooking";

export default function BookingPage() {
  const { unitId } = useParams();

  const { mutate: createBooking, isPending } = useCreateBooking();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    scheduledAt: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    createBooking(
      {
        ...form,
        unitId,
      },
      {
        onSuccess: () => {
          alert("Booking successful!");
        },
        onError: () => {
          alert("Booking failed!");
        },
      }
    );
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Book Tour</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          placeholder="Name"
          className="border p-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          className="border p-2"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Phone"
          className="border p-2"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <input
          type="datetime-local"
          className="border p-2"
          value={form.scheduledAt}
          onChange={(e) =>
            setForm({ ...form, scheduledAt: e.target.value })
          }
        />

        <button
          className="bg-blue-600 text-white p-2 rounded"
          disabled={isPending}
        >
          {isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
import { useState } from "react";
import { useCreateBooking } from "../hooks/useCreateBooking";

export default function BookingForm({ unitId }) {
  const { mutate, isPending, isSuccess } = useCreateBooking();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate({
      unitId,
      data: form,
    });
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Book this unit</h3>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10 }}>
        <input
          placeholder="Full name"
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />

        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Phone"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <button disabled={isPending}>
          {isPending ? "Booking..." : "Book Unit"}
        </button>

        {isSuccess && <p>Booking successful!</p>}
      </form>
    </div>
  );
}
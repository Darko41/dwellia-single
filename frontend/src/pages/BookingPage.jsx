import { useState } from "react";
import { useParams } from "react-router-dom";

import useCreateBooking from "@/features/bookings/hooks/useCreateBooking";


export default function BookingPage() {

  const { unitId } = useParams();

  const createBooking = useCreateBooking();


  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    scheduledAt: "",
  });


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createBooking.mutateAsync({
        unitId,
        data: form,
      });

      alert("Booking successful!");

    } catch (error) {
      console.error(error);

      if (
        error.response?.status === 409 ||
        error.response?.data?.message?.includes("already booked")
      ) {
        alert("This time slot is already booked. Please choose another time.");
      } else {
        alert("We couldn't complete your booking. Please try again.");
      }
    }
  };


  return (
    <div className="mx-auto max-w-md p-6">

      <h1 className="mb-4 text-xl font-bold">
        Book Tour
      </h1>


      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3"
      >

        <input
          className="border p-2"
          placeholder="Full name"
          value={form.fullName}
          onChange={(e) =>
            setForm({
              ...form,
              fullName: e.target.value,
            })
          }
        />


        <input
          className="border p-2"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />


        <input
          className="border p-2"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({
              ...form,
              phone: e.target.value,
            })
          }
        />


        <input
          type="datetime-local"
          className="border p-2"
          value={form.scheduledAt}
          onChange={(e) =>
            setForm({
              ...form,
              scheduledAt: e.target.value,
            })
          }
        />


        <button
          disabled={createBooking.isPending}
          className="rounded bg-blue-600 p-2 text-white"
        >
          {createBooking.isPending
            ? "Sending..."
            : "Submit"}
        </button>

      </form>

    </div>
  );
}
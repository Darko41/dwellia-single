import { useState } from "react";
import { useParams } from "react-router-dom";

import useCreateBooking from "@/features/bookings/hooks/useCreateBooking";


export default function BookingPage() {

  const { unitId } = useParams();

  const createBooking = useCreateBooking();


  const [form, setForm] = useState({
    name: "",
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
      alert("Booking failed");
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
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
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
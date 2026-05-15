import { useEffect, useState } from "react";
import { apiClient } from "@/lib/apiClient";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    apiClient.get("/bookings")
      .then(res => setBookings(res.data));
  }, []);

  return (
    <div>
      <h1>Bookings</h1>

      <ul>
        {bookings.map(b => (
          <li key={b.id}>
            {b.fullName} → Unit {b.unit?.id}
          </li>
        ))}
      </ul>
    </div>
  );
}
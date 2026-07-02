import { useParams } from "react-router-dom";
import { useUnit } from "../features/units/hooks/useUnit";
import BookingForm from "../features/bookings/components/BookingForm";

export default function UnitDetailsPage() {
  const { id } = useParams();
  const { data, isLoading } = useUnit(id);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <h3>${data.price}</h3>

      {data.status === "AVAILABLE" && (
        <BookingForm unitId={id} />
      )}
    </div>
  );
}
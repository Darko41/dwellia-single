import { useParams, Link } from "react-router-dom";
import { useUnit } from "@/features/units/hooks/useUnit";

export default function UnitDetailsPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useUnit(id);

  if (isLoading) return <p>Loading unit...</p>;
  if (isError) return <p>Error loading unit</p>;

  return (
    <div style={{ padding: 20 }}>
      <Link to="/">← Back</Link>

      <h1>{data.title}</h1>
      <p>{data.description}</p>

      <h3>${data.price}</h3>

      <p>
        {data.bedrooms} bed / {data.bathrooms} bath
      </p>

      <p>Status: {data.status}</p>
    </div>
  );
}
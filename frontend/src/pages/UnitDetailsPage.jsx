import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUnitById } from "../features/units/services/unitsApi";

export default function UnitDetailsPage() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["unit", id],
    queryFn: () => getUnitById(id),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <img
        src={data.images?.[0] || "https://via.placeholder.com/400"}
        className="w-full h-64 object-cover rounded"
      />

      <h1 className="text-2xl font-bold mt-4">${data.price}</h1>
      <p>{data.bedrooms} bedrooms</p>

      <div className="mt-4 flex gap-4">
        <Link
          to={`/book/${data.id}`}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Book Tour
        </Link>
      </div>
    </div>
  );
}
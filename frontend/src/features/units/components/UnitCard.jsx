import { Link } from "react-router-dom";

export default function UnitCard({ unit }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <img
        src={unit.images?.[0] || "https://via.placeholder.com/300"}
        className="w-full h-40 object-cover rounded"
      />

      <div className="mt-3">
        <h2 className="text-lg font-semibold">${unit.price}</h2>
        <p>{unit.bedrooms} bed</p>

        <Link
          to={`/unit/${unit.id}`}
          className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded"
        >
          View
        </Link>
      </div>
    </div>
  );
}
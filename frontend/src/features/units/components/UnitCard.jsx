import { Link } from "react-router-dom";

export default function UnitCard({ unit }) {
  return (
    <article className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-lg">

      {/* Image placeholder */}
      <div className="flex h-48 items-center justify-center bg-gray-200 text-gray-500">
        No image
      </div>

      <div className="p-5">

        <div className="mb-3 flex items-start justify-between gap-3">
          <h2 className="text-xl font-semibold">
            {unit.title}
          </h2>

          <span className="rounded bg-blue-100 px-2 py-1 text-sm text-blue-700">
            {unit.status}
          </span>
        </div>


        <p className="mb-4 text-gray-600">
          {unit.description}
        </p>


        <div className="mb-4 flex gap-4 text-sm text-gray-700">
          <span>
            🛏 {unit.bedrooms} beds
          </span>

          <span>
            🚿 {unit.bathrooms} baths
          </span>
        </div>


        <div className="flex items-center justify-between">

          <p className="text-xl font-bold text-blue-600">
            ${unit.price}
          </p>


          <Link
            to={`/units/${unit.id}`}
            className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            Details
          </Link>

        </div>

      </div>

    </article>
  );
}
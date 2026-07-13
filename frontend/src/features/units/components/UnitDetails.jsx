import { Link } from "react-router-dom";

export default function UnitDetails({ unit }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow">

      <h1 className="mb-4 text-3xl font-bold">
        {unit.title}
      </h1>

      <p className="mb-6 text-gray-600">
        {unit.description}
      </p>


      <div className="grid grid-cols-2 gap-4">

        <div>
          <p className="text-sm text-gray-500">
            Bedrooms
          </p>
          <p className="font-semibold">
            {unit.bedrooms}
          </p>
        </div>


        <div>
          <p className="text-sm text-gray-500">
            Bathrooms
          </p>
          <p className="font-semibold">
            {unit.bathrooms}
          </p>
        </div>


        <div>
          <p className="text-sm text-gray-500">
            Status
          </p>
          <p className="font-semibold">
            {unit.status}
          </p>
        </div>


        <div>
          <p className="text-sm text-gray-500">
            Price
          </p>
          <p className="font-semibold text-blue-600">
            ${unit.price}
          </p>
        </div>

      </div>


      <Link
        to={`/book/${unit.id}`}
        className="mt-6 inline-block rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        Book Tour
      </Link>

    </div>
  );
}
import { Link } from "react-router-dom";

export default function UnitDetails({ unit }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow">

      <h1 className="mb-2 text-3xl font-bold">
        {unit.unitTypeName} — Unit {unit.unitNumber}
      </h1>

      <p className="mb-1 text-gray-600">
        {unit.propertyName}
      </p>

      <p className="mb-6 text-gray-500">
        {unit.cityName}
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
            Rent
          </p>
          <p className="font-semibold text-blue-600">
            ${unit.rent}
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

        {unit.squareFeet && (
          <div>
            <p className="text-sm text-gray-500">
              Square Feet
            </p>
            <p className="font-semibold">
              {unit.squareFeet}
            </p>
          </div>
        )}

        {unit.availabilityDate && (
          <div>
            <p className="text-sm text-gray-500">
              Available From
            </p>
            <p className="font-semibold">
              {unit.availabilityDate}
            </p>
          </div>
        )}

      </div>

      {unit.status === "AVAILABLE" && (
        <Link
          to={`/book/${unit.id}`}
          className="mt-6 inline-block rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Book Tour
        </Link>
      )}

    </div>
  );
}
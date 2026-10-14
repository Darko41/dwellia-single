import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useApplications from "@/features/applications/hooks/useApplications";

// TODO_COMPANY: Remove once User -> Company exists.
// useApplications currently relies on TEMP_COMPANY_ID inside
// applicationApi.js. When the auth refactor lands, this page will pass
// the real companyId (from useAuth) into the hook instead.
export default function AdminApplications() {
  const { data: applications = [], isLoading, error } = useApplications();

  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortDirection, setSortDirection] = useState("DESC");

  const filteredAndSortedApplications = useMemo(() => {
    let result = [...applications];

    if (statusFilter !== "ALL") {
      result = result.filter(
        (application) => application.status === statusFilter
      );
    }

    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();

      return sortDirection === "DESC" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [applications, statusFilter, sortDirection]);

  if (isLoading) {
    return <p>Loading applications...</p>;
  }

  if (error) {
    return <p>Failed to load applications.</p>;
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl font-bold">Applications</h1>

        <div className="flex flex-wrap gap-3">
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded border px-3 py-2"
          >
            <option value="ALL">All</option>
            <option value="DRAFT">Draft</option>
            <option value="SUBMITTED">Submitted</option>
            <option value="UNDER_REVIEW">Under Review</option>
            <option value="SCREENING">Screening</option>
            <option value="APPROVED">Approved</option>
            <option value="CONDITIONALLY_APPROVED">
              Conditionally Approved
            </option>
            <option value="DECLINED">Declined</option>
            <option value="WITHDRAWN">Withdrawn</option>
            <option value="EXPIRED">Expired</option>
          </select>

          <button
            type="button"
            onClick={() =>
              setSortDirection((current) =>
                current === "ASC" ? "DESC" : "ASC"
              )
            }
            className="rounded border px-3 py-2"
          >
            Created:{" "}
            {sortDirection === "DESC" ? "Newest first" : "Oldest first"}
          </button>

          <Link
            to="/admin/applications/new"
            className="rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
          >
            New Application
          </Link>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredAndSortedApplications.length === 0 && (
          <p className="text-gray-500">No applications found.</p>
        )}

        {filteredAndSortedApplications.map((application) => (
          <div
            key={application.id}
            className="rounded border bg-white p-4 shadow-sm"
          >
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold">
                  {application.applicationNumber}
                </h2>

                <p className="text-sm text-gray-600">
                  Lead #{application.leadId} · Unit #{application.unitId}
                </p>
              </div>

              <span className="rounded bg-gray-100 px-2 py-1 text-sm">
                {application.status}
              </span>
            </div>

            <div className="mb-4 grid gap-2 text-sm md:grid-cols-2">
              <p>
                <span className="font-medium">Property:</span>{" "}
                #{application.propertyId}
              </p>

              {application.unitTypeId != null && (
                <p>
                  <span className="font-medium">Unit type:</span>{" "}
                  #{application.unitTypeId}
                </p>
              )}

              <p>
                <span className="font-medium">Created:</span>{" "}
                {new Date(application.createdAt).toLocaleString()}
              </p>

              {application.submittedAt && (
                <p>
                  <span className="font-medium">Submitted:</span>{" "}
                  {new Date(application.submittedAt).toLocaleString()}
                </p>
              )}

              {application.expiresAt && (
                <p>
                  <span className="font-medium">Expires:</span>{" "}
                  {new Date(application.expiresAt).toLocaleString()}
                </p>
              )}

              {application.showingId != null && (
                <p>
                  <span className="font-medium">Showing:</span>{" "}
                  #{application.showingId}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                to={`/admin/applications/${application.id}`}
                className="rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
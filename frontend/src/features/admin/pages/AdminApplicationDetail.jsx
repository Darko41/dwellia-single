import { useParams, useNavigate, Link } from "react-router-dom";
import useApplication from "@/features/applications/hooks/useApplication";
import useSubmitApplication from "@/features/applications/hooks/useSubmitApplication";

export default function AdminApplicationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: application, isLoading, error } = useApplication(id);
  const submitMutation = useSubmitApplication();

  const handleSubmit = async () => {
    const confirmed = window.confirm(
      "Submit this application? It will no longer be editable as a draft."
    );

    if (!confirmed) {
      return;
    }

    try {
      await submitMutation.mutateAsync(application.id);
    } catch (err) {
      alert(
        err?.response?.data?.message || "Failed to submit application."
      );
    }
  };

  if (isLoading) {
    return <p>Loading application...</p>;
  }

  if (error) {
    return <p>Failed to load application.</p>;
  }

  if (!application) {
    return <p>Application not found.</p>;
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold">
            {application.applicationNumber}
          </h1>
          <p className="text-sm text-gray-600">
            Application #{application.id}
          </p>
        </div>

        <span className="rounded bg-gray-100 px-2 py-1 text-sm">
          {application.status}
        </span>
      </div>

      <div className="mb-6 grid gap-4 rounded border bg-white p-4 shadow-sm md:grid-cols-2">
        <p>
          <span className="font-medium">Lead:</span> #{application.leadId}
        </p>

        <p>
          <span className="font-medium">Property:</span> #
          {application.propertyId}
        </p>

        <p>
          <span className="font-medium">Unit:</span> #{application.unitId}
        </p>

        {application.unitTypeId != null && (
          <p>
            <span className="font-medium">Unit type:</span> #
            {application.unitTypeId}
          </p>
        )}

        {application.showingId != null && (
          <p>
            <span className="font-medium">Showing:</span> #
            {application.showingId}
          </p>
        )}

        <p>
          <span className="font-medium">Created:</span>{" "}
          {new Date(application.createdAt).toLocaleString()}
        </p>

        <p>
          <span className="font-medium">Updated:</span>{" "}
          {new Date(application.updatedAt).toLocaleString()}
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
      </div>

      <div className="flex flex-wrap gap-2">
        {application.status === "DRAFT" && (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitMutation.isPending}
            className="rounded bg-green-600 px-3 py-2 text-white hover:bg-green-700 disabled:opacity-50"
          >
            {submitMutation.isPending ? "Submitting..." : "Submit Application"}
          </button>
        )}

        <Link
          to="/admin/applications"
          className="rounded border px-3 py-2"
        >
          Back to list
        </Link>
      </div>
    </div>
  );
}
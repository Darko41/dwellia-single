import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCreateApplication from "@/features/applications/hooks/useCreateApplication";

export default function AdminApplicationCreate() {
  const navigate = useNavigate();
  const createMutation = useCreateApplication();

  const [leadId, setLeadId] = useState("");
  const [unitId, setUnitId] = useState("");
  const [showingId, setShowingId] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!leadId || !unitId) {
      alert("Lead and Unit are required.");
      return;
    }

    try {
      const created = await createMutation.mutateAsync({
        leadId: Number(leadId),
        unitId: Number(unitId),
        showingId: showingId ? Number(showingId) : undefined,
      });

      navigate(`/admin/applications/${created.id}`);
    } catch (err) {
      alert(
        err?.response?.data?.message || "Failed to create application."
      );
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold">New Application</h1>
        <p className="text-sm text-gray-600">
          Create a draft application for a lead and a unit.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid max-w-xl gap-4 rounded border bg-white p-4 shadow-sm"
      >
        <div>
          <label
            htmlFor="leadId"
            className="mb-1 block text-sm font-medium"
          >
            Lead ID
          </label>
          <input
            id="leadId"
            type="number"
            min="1"
            value={leadId}
            onChange={(event) => setLeadId(event.target.value)}
            className="w-full rounded border px-3 py-2"
            required
          />
        </div>

        <div>
          <label
            htmlFor="unitId"
            className="mb-1 block text-sm font-medium"
          >
            Unit ID
          </label>
          <input
            id="unitId"
            type="number"
            min="1"
            value={unitId}
            onChange={(event) => setUnitId(event.target.value)}
            className="w-full rounded border px-3 py-2"
            required
          />
        </div>

        <div>
          <label
            htmlFor="showingId"
            className="mb-1 block text-sm font-medium"
          >
            Showing ID (optional)
          </label>
          <input
            id="showingId"
            type="number"
            min="1"
            value={showingId}
            onChange={(event) => setShowingId(event.target.value)}
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="submit"
            disabled={createMutation.isPending}
            className="rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {createMutation.isPending ? "Creating..." : "Create"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/applications")}
            className="rounded border px-3 py-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
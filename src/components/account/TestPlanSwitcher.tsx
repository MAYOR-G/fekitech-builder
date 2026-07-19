"use client";

import { useState } from "react";
import { FlaskConical } from "lucide-react";
import { PLAN_IDS, PLANS, type PlanId } from "@/lib/plans";

export function TestPlanSwitcher({ currentPlan }: { currentPlan: PlanId }) {
  const [planId, setPlanId] = useState<PlanId>(currentPlan);
  const [status, setStatus] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState(false);

  async function updatePlan(nextPlan: PlanId) {
    setPlanId(nextPlan);
    setIsUpdating(true);
    setStatus("");

    try {
      const response = await fetch("/api/admin/test-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: nextPlan }),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(payload.error ?? "Unable to change the test plan.");
      setStatus(`${PLANS[nextPlan].name} permissions are active for 24 hours.`);
      window.setTimeout(() => window.location.reload(), 700);
    } catch (error) {
      setPlanId(currentPlan);
      setStatus(error instanceof Error ? error.message : "Unable to change the test plan.");
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <section className="mb-8 rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-950" aria-labelledby="test-mode-title">
      <div className="flex flex-wrap items-center gap-3">
        <FlaskConical aria-hidden="true" size={20} />
        <div className="min-w-0 flex-1">
          <h2 id="test-mode-title" className="font-semibold">Test Mode</h2>
          <p className="text-sm">No payment is created. Server permissions use the selected test plan.</p>
        </div>
        <label className="flex items-center gap-2 text-sm font-medium">
          Plan
          <select
            value={planId}
            disabled={isUpdating}
            onChange={(event) => void updatePlan(event.target.value as PlanId)}
            className="min-h-11 rounded-lg border border-amber-400 bg-white px-3 text-ft-ink disabled:cursor-wait disabled:opacity-60"
          >
            {PLAN_IDS.map((id) => (
              <option key={id} value={id}>{PLANS[id].name}</option>
            ))}
          </select>
        </label>
      </div>
      {status ? <p className="mt-3 text-sm" role="status">{status}</p> : null}
    </section>
  );
}

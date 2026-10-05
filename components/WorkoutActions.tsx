
"use client";

import { usePlan } from "@/components/PlanContext";

export default function WorkoutActions({
  id,
}: {
  id: number;
}) {
  const {
    addToPlan,
    isInPlan,
    toggleSave,
    isSaved,
  } = usePlan();

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => addToPlan(id)}
        disabled={isInPlan(id)}
        className="btn border-0 bg-[#c8f31d] font-bold text-black hover:bg-[#d6ff3a] disabled:bg-[#c8f31d]/50 disabled:text-black/60"
      >
        {isInPlan(id)
          ? "Added to plan"
          : "Add to today's plan"}
      </button>

      <button
        onClick={() => toggleSave(id)}
        className="btn btn-outline border-white/20 text-white hover:bg-white/10"
      >
        {isSaved(id)
          ? "Saved"
          : "Save for later"}
      </button>
    </div>
  );
}


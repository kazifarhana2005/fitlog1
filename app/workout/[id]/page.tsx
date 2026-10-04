"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import{usePlan}from "@/components/PlanContext"

type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
};

export default function WorkoutDetailPage() {
    const {addToPlan,isInPlan,saveWorkout,isSaved}=usePlan();
  const params = useParams();
  const id = params.id;

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWorkout() {
      try {
        const response = await fetch(
          "https://api.abcz.workers.dev/api/fitlog"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch workout");
        }

        const data: Workout[] = await response.json();

        const selectedWorkout = data.find(
          (item) => item.id === Number(id)
        );

        setWorkout(selectedWorkout || null);
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchWorkout();
    }
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#1E1E1E] p-10 text-white">
        <p className="text-center text-white/60">
          Loading workout...
        </p>
      </main>
    );
  }

  if (!workout) {
    return (
      <main className="min-h-screen bg-[#1E1E1E] p-10 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold">
            Workout not found
          </h1>

          <Link
            href="/"
            className="mt-5 inline-block rounded-lg bg-[#C8F31D] px-5 py-3 font-bold text-black"
          >
            Back to Library
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#1E1E1E] px-6 py-10 text-white sm:px-10">

      <div className="mx-auto max-w-6xl">

        {/* MAIN DETAIL AREA */}
        <div className="grid gap-8 lg:grid-cols-2">

          {/* ================= LEFT SIDE ================= */}
          <div className="overflow-hidden rounded-xl">
            <img
              src={workout.image}
              alt={workout.name}
              className="h-[520px] w-full object-cover"
            />
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="flex flex-col">

            {/* WORKOUT NAME */}
            <h1 className="text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">
              {workout.name}
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/60">
              {workout.description}
            </p>

            {/* TAGS */}
            <div className="mt-4 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-[#C8F31D] px-3 py-1 text-[10px] font-bold uppercase text-black"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* INFORMATION BOX */}
            <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-[#222630]">

              {/* EQUIPMENT */}
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <span className="text-[10px] font-bold uppercase tracking-wide text-white/50">
                  Equipment
                </span>

                <span className="text-sm text-white">
                  {workout.equipment}
                </span>
              </div>

              {/* DIFFICULTY */}
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <span className="text-[10px] font-bold uppercase tracking-wide text-white/50">
                  Difficulty
                </span>

                <span className="text-sm text-white">
                  {workout.difficulty}
                </span>
              </div>

              {/* SETS */}
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <span className="text-[10px] font-bold uppercase tracking-wide text-white/50">
                  Sets
                </span>

                <span className="text-sm text-white">
                  {workout.sets}
                </span>
              </div>

              {/* REPS */}
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <span className="text-[10px] font-bold uppercase tracking-wide text-white/50">
                  Reps
                </span>

                <span className="text-sm text-white">
                  {workout.reps}
                </span>
              </div>

              {/* DURATION */}
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <span className="text-[10px] font-bold uppercase tracking-wide text-white/50">
                  Duration
                </span>

                <span className="text-sm text-white">
                  {workout.duration} min
                </span>
              </div>

              {/* CALORIES */}
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <span className="text-[10px] font-bold uppercase tracking-wide text-white/50">
                  Calories
                </span>

                <span className="text-sm text-white">
                  {workout.caloriesBurned} kcal
                </span>
              </div>

              {/* RATING */}
              <div className="flex items-center justify-between px-5 py-4">
                <span className="text-[10px] font-bold uppercase tracking-wide text-white/50">
                  Rating
                </span>

                <span className="text-sm text-white">
                  {workout.rating}
                </span>
              </div>

            </div>

            {/* INSTRUCTIONS */}
            <div className="mt-6">

              <h2 className="text-sm font-extrabold uppercase tracking-wide">
                Instructions
              </h2>

              <div className="mt-3 space-y-2">
                {workout.instructions.map((instruction, index) => (
                  <div
                    key={index}
                    className="flex gap-3 text-xs leading-5 text-white/70"
                  >
                    <span className="font-bold text-white">
                      {index + 1}.
                    </span>

                    <span>{instruction}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* BUTTONS */}
        
<div className="mt-7 flex flex-wrap gap-3">

  {/* BUTTONS */}
<div className="mt-7 flex flex-wrap gap-3">

  {/* ADD TO PLAN */}
  <button
    onClick={() => addToPlan(workout.id)}
    disabled={isInPlan(workout.id)}
    className={`rounded-lg px-5 py-3 text-xs font-bold transition ${
      isInPlan(workout.id)
        ? "bg-white/10 text-white/40"
        : "bg-[#C8F31D] text-black hover:opacity-90"
    }`}
  >
    {isInPlan(workout.id)
      ? "✓ Added to today's plan"
      : "▣ Add to today's plan"}
  </button>


  {/* SAVE FOR LATER */}
  <button
    onClick={() => saveWorkout(workout.id)}
    disabled={isSaved(workout.id)}
    className={`rounded-lg border px-5 py-3 text-xs font-bold transition ${
      isSaved(workout.id)
        ? "border-white/10 bg-white/10 text-white/40"
        : "border-white/20 text-white hover:bg-white/10"
    }`}
  >
    {isSaved(workout.id)
      ? "✓ Saved"
      : "♧ Save for later"}
  </button>

</div>
</div>

          </div>
        </div>

      </div>
    </main>
  );
}
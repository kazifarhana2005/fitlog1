"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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
};

export default function SavedWorkoutDetail() {
  const params = useParams();
  const id = Number(params.id);

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getWorkout() {
      try {
        const response = await fetch(
          `https://api.abcz.workers.dev/api/fitlog/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch workout");
        }

        const data: Workout = await response.json();

        setWorkout(data);
      } catch (error) {
        console.error("Saved workout API error:", error);
      } finally {
        setLoading(false);
      }
    }

    if (!Number.isNaN(id)) {
      getWorkout();
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0b0b0b] flex items-center justify-center">
        <p className="text-white/60">
          Loading workout...
        </p>
      </main>
    );
  }

  if (!workout) {
    return (
      <main className="min-h-screen bg-[#0b0b0b] px-6 py-10 text-white">
        <div className="mx-auto max-w-5xl">

          <Link
            href="/saved"
            className="text-sm text-white/60 hover:text-[#c8f31d]"
          >
            ← Back to Saved
          </Link>

          <div className="mt-20 text-center">
            <h1 className="text-2xl font-bold">
              Workout not found
            </h1>

            <p className="mt-2 text-white/50">
              This workout could not be loaded from the API.
            </p>
          </div>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-6 py-8 sm:px-10">

      <div className="mx-auto max-w-6xl">

        {/* BACK */}
        <Link
          href="/saved"
          className="inline-block text-sm text-white/60 transition hover:text-[#c8f31d]"
        >
          ← Back to Saved
        </Link>

        {/* DETAIL CARD */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#111]">

          <div className="grid lg:grid-cols-2">

            {/* IMAGE */}
            <div className="h-full min-h-[350px]">
              <img
                src={workout.image}
                alt={workout.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* DETAILS */}
            <div className="p-6 sm:p-8">

              {/* TAGS */}
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(workout.muscleGroups)
                  ? workout.muscleGroups
                  : []
                ).map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-[#c8f31d] px-3 py-1 text-[10px] font-bold uppercase text-black"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* NAME */}
              <h1 className="mt-4 text-3xl font-bold uppercase text-white sm:text-4xl">
                {workout.name}
              </h1>

              {/* EQUIPMENT */}
              <p className="mt-2 text-sm text-white/50">
                {workout.equipment}
              </p>

              {/* DIFFICULTY */}
              <p className="mt-1 text-sm text-white/50">
                Difficulty:{" "}
                <span className="text-white">
                  {workout.difficulty}
                </span>
              </p>

              {/* STATS */}
              <div className="mt-8 grid grid-cols-2 gap-4">

                {/* DURATION */}
                <div className="rounded-xl border border-white/10 bg-[#0b0b0b] p-4">
                  <p className="text-xs text-white/40">
                    Duration
                  </p>

                  <p className="mt-1 text-xl font-bold text-white">
                    {Number(workout.duration || 0)} min
                  </p>
                </div>

                {/* CALORIES */}
                <div className="rounded-xl border border-white/10 bg-[#0b0b0b] p-4">
                  <p className="text-xs text-white/40">
                    Calories
                  </p>

                  <p className="mt-1 text-xl font-bold text-white">
                    {Number(workout.caloriesBurned || 0)} kcal
                  </p>
                </div>

                {/* SETS */}
                <div className="rounded-xl border border-white/10 bg-[#0b0b0b] p-4">
                  <p className="text-xs text-white/40">
                    Sets
                  </p>

                  <p className="mt-1 text-xl font-bold text-white">
                    {workout.sets}
                  </p>
                </div>

                {/* REPS */}
                <div className="rounded-xl border border-white/10 bg-[#0b0b0b] p-4">
                  <p className="text-xs text-white/40">
                    Reps
                  </p>

                  <p className="mt-1 text-xl font-bold text-white">
                    {workout.reps}
                  </p>
                </div>

              </div>

              {/* RATING */}
              <div className="mt-6">
                <span className="text-[#c8f31d]">
                  ★
                </span>

                <span className="ml-2 font-semibold text-white">
                  {workout.rating}
                </span>

                <span className="ml-1 text-white/40">
                  / 5
                </span>
              </div>

              {/* SAVED STATUS */}
              <div className="mt-8 rounded-xl border border-[#c8f31d]/20 bg-[#c8f31d]/5 px-4 py-3">
                <p className="text-sm font-semibold text-[#c8f31d]">
                  ✓ Saved Workout
                </p>

                <p className="mt-1 text-xs text-white/40">
                  This workout is in your saved collection.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
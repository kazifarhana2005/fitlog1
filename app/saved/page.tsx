"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

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

export default function SavedPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // GET SAVED IDS
  // =========================
  useEffect(() => {
    try {
      const saved = localStorage.getItem("fitlog-saved");

      if (!saved) {
        setSavedIds([]);
        return;
      }

      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        /*
          Supports both:
          [1, 2, 3]

          and old saved workout objects:
          [{ id: 1, name: "..." }]
        */

        const ids = parsed
          .map((item) => {
            if (typeof item === "number") {
              return item;
            }

            if (typeof item === "string") {
              return Number(item);
            }

            if (
              typeof item === "object" &&
              item !== null &&
              "id" in item
            ) {
              return Number(item.id);
            }

            return NaN;
          })
          .filter((id) => !Number.isNaN(id));

        setSavedIds(ids);
      }
    } catch (error) {
      console.error("Saved data error:", error);
      setSavedIds([]);
    }
  }, []);

  // =========================
  // GET ALL WORKOUTS FROM API
  // =========================
  useEffect(() => {
    async function getWorkouts() {
      try {
        const response = await fetch(
          "https://api.abcz.workers.dev/api/fitlog"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data: Workout[] = await response.json();

        setWorkouts(data);
      } catch (error) {
        console.error("Workout API Error:", error);
      } finally {
        setLoading(false);
      }
    }

    getWorkouts();
  }, []);

  // =========================
  // GET ONLY SAVED WORKOUTS
  // =========================
  const savedWorkouts = useMemo(() => {
    return workouts.filter((workout) =>
      savedIds.includes(Number(workout.id))
    );
  }, [workouts, savedIds]);

  // =========================
  // TOTAL MINUTES
  // =========================
  const totalMinutes = savedWorkouts.reduce(
    (total, workout) =>
      total + Number(workout.duration || 0),
    0
  );

  // =========================
  // TOTAL CALORIES
  // =========================
  const totalCalories = savedWorkouts.reduce(
    (total, workout) =>
      total + Number(workout.caloriesBurned || 0),
    0
  );

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <main className="min-h-screen bg-[#0b0b0b] px-6 py-10 text-white sm:px-10">
        <div className="mx-auto max-w-6xl">

          <p className="text-center text-white/60">
            Loading saved workouts...
          </p>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-6 py-10 text-white sm:px-10">

      <div className="mx-auto max-w-6xl">

        {/* =========================
            HEADER
        ========================= */}
        <div className="mb-10">

          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#C8F31D]">
            MY WORKOUTS
          </p>

          <h1 className="text-4xl font-extrabold uppercase md:text-5xl">
            SAVED
          </h1>

          <p className="mt-3 text-sm text-white/50">
            Your saved workouts for later.
          </p>

        </div>

        {/* =========================
            STATS
        ========================= */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

          {/* EXERCISES */}
          <div className="rounded-xl border border-white/10 bg-[#15171D] p-6">

            <p className="text-sm text-white/40">
              Exercises
            </p>

            <p className="mt-2 text-4xl font-extrabold text-[#C8F31D]">
              {savedWorkouts.length}
            </p>

          </div>

          {/* MINUTES */}
          <div className="rounded-xl border border-white/10 bg-[#15171D] p-6">

            <p className="text-sm text-white/40">
              Minutes
            </p>

            <p className="mt-2 text-4xl font-extrabold text-white">
              {totalMinutes}
            </p>

          </div>

          {/* CALORIES */}
          <div className="rounded-xl border border-white/10 bg-[#15171D] p-6">

            <p className="text-sm text-white/40">
              Calories
            </p>

            <p className="mt-2 text-4xl font-extrabold text-white">
              {totalCalories}
            </p>

          </div>

        </div>

        {/* =========================
            TABS
        ========================= */}
        <div className="mb-8 flex w-fit rounded-xl bg-[#151922] p-1">

          <Link
            href="/plan"
            className="rounded-lg px-6 py-3 text-sm font-bold text-white/60 transition hover:text-white"
          >
            Today&apos;s Plan
          </Link>

          <Link
            href="/saved"
            className="rounded-lg bg-[#3b4f87] px-6 py-3 text-sm font-bold text-white"
          >
            Saved
          </Link>

        </div>

        {/* =========================
            NO SAVED WORKOUT
        ========================= */}
        {savedWorkouts.length === 0 ? (

          <div className="rounded-2xl border border-white/10 bg-[#15171D] px-6 py-20 text-center">

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-2xl">
              ♡
            </div>

            <h2 className="text-xl font-extrabold uppercase">
              NO SAVED WORKOUTS
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm text-white/40">
              Save workouts from the library and
              they will appear here.
            </p>

            <Link
              href="/"
              className="mt-6 inline-block rounded-lg bg-[#C8F31D] px-6 py-3 text-xs font-bold uppercase text-black transition hover:opacity-90"
            >
              Browse Workouts →
            </Link>

          </div>

        ) : (

          /* =========================
             SAVED WORKOUTS
          ========================= */
          <div className="space-y-5">

            {savedWorkouts.map((workout) => (

              <div
                key={workout.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#222630] transition hover:border-[#C8F31D]/50 sm:flex-row"
              >

                {/* IMAGE */}
                <img
                  src={workout.image}
                  alt={workout.name}
                  className="h-48 w-full object-cover sm:h-40 sm:w-52"
                />

                {/* CONTENT */}
                <div className="flex-1 p-5">

                  {/* TAGS */}
                  <div className="mb-3 flex flex-wrap gap-2">

                    {(Array.isArray(workout.muscleGroups)
                      ? workout.muscleGroups
                      : []
                    ).map((muscle) => (

                      <span
                        key={muscle}
                        className="rounded bg-[#C8F31D] px-3 py-1 text-[10px] font-bold uppercase text-black"
                      >
                        {muscle}
                      </span>

                    ))}

                  </div>

                  {/* NAME */}
                  <h2 className="text-lg font-extrabold uppercase text-white">
                    {workout.name}
                  </h2>

                  {/* EQUIPMENT */}
                  <p className="mt-1 text-sm text-white/40">
                    {workout.equipment}
                  </p>

                  {/* STATS */}
                  <div className="mt-5 flex flex-wrap gap-5 border-t border-white/10 pt-4 text-xs text-white/50">

                    <span>
                      ◷ {Number(workout.duration || 0)} min
                    </span>

                    <span>
                      🔥 {Number(workout.caloriesBurned || 0)} kcal
                    </span>

                    <span>
                      ★ {Number(workout.rating || 0)}
                    </span>

                  </div>

                  {/* VIEW DETAILS */}
                  <div className="mt-5">

                    <Link
                      href={`/saved/${workout.id}`}
                      className="inline-block rounded-lg bg-[#C8F31D] px-5 py-3 text-xs font-bold uppercase text-black transition hover:bg-[#d6ff3a]"
                    >
                      View Details
                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </main>
  );
}
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePlan } from "@/components/PlanContext";

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

export default function PlanPage() {
  const { planCount } = usePlan();

  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [planIds, setPlanIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");

  // =========================
  // GET WORKOUTS FROM API
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
  // GET PLAN IDS FROM LOCAL STORAGE
  // =========================
  useEffect(() => {
    const savedPlan = localStorage.getItem("fitlog-plan");

    if (!savedPlan) {
      setPlanIds([]);
      return;
    }

    try {
      const ids = JSON.parse(savedPlan);

      if (Array.isArray(ids)) {
        // Make sure every ID is a number
        const numericIds = ids
          .map((id) => Number(id))
          .filter((id) => !Number.isNaN(id));

        setPlanIds(numericIds);
      } else {
        setPlanIds([]);
      }
    } catch (error) {
      console.error("Plan data error:", error);
      setPlanIds([]);
    }
  }, [planCount]);

  // =========================
  // FILTER PLAN WORKOUTS
  // =========================
  const planWorkouts = useMemo(() => {
    let result = workouts.filter((workout) =>
      planIds.includes(Number(workout.id))
    );

    if (sortBy === "duration") {
      result = [...result].sort(
        (a, b) => Number(a.duration) - Number(b.duration)
      );
    }

    if (sortBy === "calories") {
      result = [...result].sort(
        (a, b) =>
          Number(b.caloriesBurned) - Number(a.caloriesBurned)
      );
    }

    if (sortBy === "rating") {
      result = [...result].sort(
        (a, b) => Number(b.rating) - Number(a.rating)
      );
    }

    return result;
  }, [workouts, planIds, sortBy]);

  // =========================
  // TOTAL MINUTES
  // =========================
  const totalMinutes = planWorkouts.reduce(
    (total, workout) =>
      total + Number(workout.duration || 0),
    0
  );

  // =========================
  // TOTAL CALORIES
  // =========================
  const totalCalories = planWorkouts.reduce(
    (total, workout) =>
      total + Number(workout.caloriesBurned || 0),
    0
  );

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <main className="min-h-screen bg-[#0b0b0b] px-6 py-12 text-white sm:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-white/60">
            Loading your plan...
          </p>
        </div>
      </main>
    );
  }

  // =========================
  // PAGE
  // =========================
  return (
    <main className="min-h-screen bg-[#0b0b0b] px-6 py-10 text-white sm:px-10">
      <div className="mx-auto max-w-6xl">

        {/* PAGE HEADER */}
        <div className="mb-10">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#C8F31D]">
            MY WORKOUTS
          </p>

          <h1 className="text-4xl font-extrabold uppercase md:text-5xl">
            MY PLAN
          </h1>

          <p className="mt-3 text-sm text-white/50">
            Build and manage your workout plan for today.
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
              {planWorkouts.length}
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
            TABS + SORT
        ========================= */}
        <div className="mb-8 flex flex-col justify-between gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center">

          <div className="flex w-fit rounded-xl bg-[#151922] p-1">

            {/* TODAY'S PLAN */}
            <button
              className="rounded-lg bg-[#3b4f87] px-6 py-3 text-sm font-bold text-white"
            >
              Today&apos;s Plan
            </button>

            {/* SAVED */}
            <Link
              href="/saved"
              className="rounded-lg px-6 py-3 text-sm font-bold text-white/60 transition hover:text-white"
            >
              Saved
            </Link>

          </div>

          {/* SORT */}
          <div className="flex items-center gap-3">

            <span className="text-xs text-white/40">
              Sort by
            </span>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border border-white/10 bg-[#15171D] px-4 py-2 text-xs text-white outline-none"
            >
              <option value="default">Default</option>
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>

          </div>
        </div>

        {/* =========================
            EMPTY PLAN
        ========================= */}
        {planWorkouts.length === 0 ? (

          <div className="rounded-2xl border border-white/10 bg-[#15171D] px-6 py-20 text-center">

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-2xl">
              +
            </div>

            <h2 className="text-xl font-extrabold uppercase">
              NOTHING HERE YET
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm text-white/40">
              Add workouts from the library to build your
              plan for today.
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
             WORKOUT LIST
          ========================= */
          <div className="space-y-5">

            {planWorkouts.map((workout) => (

              <Link
                key={workout.id}
                href={`/workout/${workout.id}`}
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

                  {/* MUSCLE GROUPS */}
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

                </div>

              </Link>

            ))}

          </div>

        )}

      </div>
    </main>
  );
}
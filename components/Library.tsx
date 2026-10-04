"use client";

import Link from "next/link";
 import { useEffect, useState } from "react";

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

export default function Library() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getWorkouts() {
      try {
        const response = await fetch(
          "https://api.abcz.workers.dev/api/fitlog"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data = await response.json();

        setWorkouts(data);
      } catch (error) {
        console.error("Workout API Error:", error);
      } finally {
        setLoading(false);
      }
    }

    getWorkouts();
  }, []);

  if (loading) {
    return (
      <section className="bg-[#0b0b0b] px-6 py-10 sm:px-10">
        <p className="text-center text-white/60">
          Loading workouts...
        </p>
      </section>
    );
  }

  return (
    <section className="bg-[#0b0b0b] px-6 py-10 sm:px-10">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {workouts.map((workout) => (
          <Link
            key={workout.id}
            href={`/workout/${workout.id}`}
            className="overflow-hidden rounded-xl border border-white/10 bg-[#111] transition hover:-translate-y-1 hover:border-[#c8f31d]/50"
          >
            
            <img
              src={workout.image}
              alt={workout.name}
              className="h-40 w-full object-cover"
            />

           
            <div className="p-4">

              
              <div className="flex flex-wrap gap-2">
                {workout.muscleGroups.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-[#c8f31d] px-2 py-0.5 text-[10px] font-bold uppercase text-black"
                  >
                    {tag}
                  </span>
                ))}
              </div>

             
              <h3 className="mt-3 text-sm font-bold uppercase text-white">
                {workout.name}
              </h3>

              
              <p className="text-xs text-white/50">
                {workout.equipment}
              </p>

              
              <div className="mt-3 flex gap-4 border-t border-white/10 pt-3 text-xs text-white/60">
                <span>◷ {workout.duration} min</span>

                <span>
                  🔥 {workout.caloriesBurned} kcal
                </span>

                <span>
                  ★    {workout.rating}
                </span>
              </div>

            </div>
          </Link>
        ))}

      </div>
      </section>
  );
}
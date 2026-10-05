
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type PlanContextType = {
  planCount: number;
  savedCount: number;

  addToPlan: (id: number) => void;
  removeFromPlan: (id: number) => void;
  isInPlan: (id: number) => boolean;

  saveWorkout: (id: number) => void;
  removeSavedWorkout: (id: number) => void;
  isSaved: (id: number) => boolean;
  toggleSave: (id: number) => void;
};

const PlanContext = createContext<PlanContextType | undefined>(
  undefined
);

export function PlanProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [plan, setPlan] = useState<number[]>([]);
  const [saved, setSaved] = useState<number[]>([]);

  useEffect(() => {
    const savedPlan = localStorage.getItem("fitlog-plan");
    const savedWorkouts = localStorage.getItem("fitlog-saved");

    if (savedPlan) {
      setPlan(JSON.parse(savedPlan));
    }

    if (savedWorkouts) {
      setSaved(JSON.parse(savedWorkouts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved]);

  const addToPlan = (id: number) => {
    setPlan((current) => {
      if (current.includes(id)) {
        return current;
      }

      return [...current, id];
    });
  };

  const removeFromPlan = (id: number) => {
    setPlan((current) =>
      current.filter((item) => item !== id)
    );
  };

  const isInPlan = (id: number) => {
    return plan.includes(id);
  };

  const saveWorkout = (id: number) => {
    setSaved((current) => {
      if (current.includes(id)) {
        return current;
      }

      return [...current, id];
    });
  };

  const removeSavedWorkout = (id: number) => {
    setSaved((current) =>
      current.filter((item) => item !== id)
    );
  };

  const isSaved = (id: number) => {
    return saved.includes(id);
  };

  const toggleSave = (id: number) => {
    setSaved((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }

      return [...current, id];
    });
  };

  return (
    <PlanContext.Provider
      value={{
        planCount: plan.length,
        savedCount: saved.length,

        addToPlan,
        removeFromPlan,
        isInPlan,

        saveWorkout,
        removeSavedWorkout,
        isSaved,
        toggleSave,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error(
      "usePlan must be used inside PlanProvider"
    );
  }

  return context;
}


export type Workout = {
  id: number;
  name: string;
  description: string;
  tags: string[];
  equipment: string;
  difficulty: string;
  sets: number;
  reps: string;
  duration: string;
  calories: number;
  rating: number;
  instructions: string[];
  image: string;
};

// Tomar public/assets er image-er asol path ekhane dao
const IMAGE = "/assets/workout.png";

export const workouts: Workout[] = [
  {
    id: 1,
    name: "Barbell Bench Press",
    description:
      "A compound press that builds chest thickness, triceps, and pressing power from a stable bench.",
    tags: ["Chest", "Arms"],
    equipment: "Barbell, Bench",
    difficulty: "Intermediate",
    sets: 4,
    reps: "6-8",
    duration: "25 min",
    calories: 180,
    rating: 4.8,
    instructions: [
      "Lie on the bench with eyes under the bar and feet planted.",
      "Unrack with locked elbows and lower the bar to mid-chest.",
      "Press up in a slight arc until elbows lock without bouncing.",
      "Keep shoulder blades pinched and a natural arch in the back.",
    ],
    image: IMAGE,
  },
  {
    id: 2,
    name: "Pull-Up",
    description:
      "A bodyweight pulling move that builds a wide back and strong biceps.",
    tags: ["Back", "Arms"],
    equipment: "Pull-up Bar",
    difficulty: "Intermediate",
    sets: 4,
    reps: "6-10",
    duration: "15 min",
    calories: 120,
    rating: 4.7,
    instructions: [
      "Hang from the bar with an overhand grip, slightly wider than shoulders.",
      "Pull your chest toward the bar by driving elbows down.",
      "Pause briefly at the top with chin above the bar.",
      "Lower slowly until arms are fully extended.",
    ],
    image: IMAGE,
  },
  {
    id: 3,
    name: "Back Squat",
    description:
      "The king of leg exercises, building quads, glutes, and core strength.",
    tags: ["Legs", "Core"],
    equipment: "Barbell, Rack",
    difficulty: "Advanced",
    sets: 5,
    reps: "5",
    duration: "30 min",
    calories: 240,
    rating: 4.9,
    instructions: [
      "Set the bar on your upper back and step out with feet shoulder-width apart.",
      "Brace your core and sit down and back until thighs are parallel.",
      "Keep knees tracking over toes and chest up.",
      "Drive through the whole foot to stand back up.",
    ],
    image: IMAGE,
  },
  {
    id: 4,
    name: "Overhead Press",
    description:
      "A standing press that builds strong shoulders and triceps.",
    tags: ["Shoulders", "Arms"],
    equipment: "Barbell",
    difficulty: "Intermediate",
    sets: 4,
    reps: "6-8",
    duration: "20 min",
    calories: 150,
    rating: 4.6,
    instructions: [
      "Hold the bar at collarbone height with hands just outside shoulders.",
      "Squeeze glutes and brace your core.",
      "Press the bar straight up, moving your head slightly back then through.",
      "Lock out overhead, then lower under control.",
    ],
    image: IMAGE,
  },
  {
    id: 5,
    name: "Dumbbell Bicep Curl",
    description:
      "A simple isolation move for bigger, stronger biceps.",
    tags: ["Arms"],
    equipment: "Dumbbells",
    difficulty: "Beginner",
    sets: 3,
    reps: "10-12",
    duration: "12 min",
    calories: 80,
    rating: 4.3,
    instructions: [
      "Stand tall holding dumbbells with palms facing forward.",
      "Curl the weights up while keeping elbows close to your sides.",
      "Squeeze at the top without swinging your body.",
      "Lower slowly to full extension.",
    ],
    image: IMAGE,
  },
  {
    id: 6,
    name: "Hollow-Body Plank",
    description:
      "A core-focused hold that builds tension through the whole midsection.",
    tags: ["Core"],
    equipment: "Bodyweight",
    difficulty: "Beginner",
    sets: 3,
    reps: "30-45 sec",
    duration: "10 min",
    calories: 60,
    rating: 4.4,
    instructions: [
      "Lie on your back with arms extended overhead.",
      "Lift shoulders and legs slightly off the floor.",
      "Press your lower back into the ground.",
      "Hold the position while breathing steadily.",
    ],
    image: IMAGE,
  },
  {
    id: 7,
    name: "Conventional Deadlift",
    description:
      "A full-body pull that builds the back, glutes, and hamstrings.",
    tags: ["Back", "Legs"],
    equipment: "Barbell",
    difficulty: "Advanced",
    sets: 4,
    reps: "4-6",
    duration: "30 min",
    calories: 260,
    rating: 4.9,
    instructions: [
      "Stand with the bar over mid-foot and grip just outside your legs.",
      "Flatten your back and pull the slack out of the bar.",
      "Drive through the floor, keeping the bar close to your legs.",
      "Lock out hips and knees, then lower with control.",
    ],
    image: IMAGE,
  },
];
export const COLORS = {
  purple: '#534AB7',
  purpleLight: '#EEEDFE',
  purpleDark: '#3C3489',
  teal: '#0F6E56',
  tealLight: '#E1F5EE',
  coral: '#993C1D',
  coralLight: '#FAECE7',
  bg: '#F8F8FC',
  card: '#FFFFFF',
  text: '#1A1A2E',
  textMuted: '#6B6B8A',
  textLight: '#A0A0B8',
  border: '#E8E8F0',
  success: '#1D9E75',
};

export const DAYS = [
  { name: 'Monday', shortName: 'MON', type: 'Upper Body', key: 'mon', color: '#534AB7', lightColor: '#EEEDFE' },
  { name: 'Tuesday', shortName: 'TUE', type: 'Lower Body', key: 'tue', color: '#0F6E56', lightColor: '#E1F5EE' },
  { name: 'Wednesday', shortName: 'WED', type: 'Abs & Core', key: 'wed', color: '#993C1D', lightColor: '#FAECE7' },
  { name: 'Thursday', shortName: 'THU', type: 'Upper Body', key: 'thu', color: '#534AB7', lightColor: '#EEEDFE' },
  { name: 'Friday', shortName: 'FRI', type: 'Lower Body', key: 'fri', color: '#0F6E56', lightColor: '#E1F5EE' },
];

export const PHASES = [
  { weeks: [1, 2], label: 'Phase 1: Foundation', shortLabel: 'Foundation', note: 'Focus on form. Use a weight that feels like a 6/10 effort. Learn every movement.' },
  { weeks: [3, 4], label: 'Phase 2: Load Up', shortLabel: 'Load Up', note: 'Add 5 lbs to upper body and 10 lbs to lower body vs Phase 1. Keep reps clean.' },
  { weeks: [5, 6], label: 'Phase 3: Volume', shortLabel: 'Volume', note: 'Exercises level up. Sets increase. Keep Phase 2 weights — more volume = more growth.' },
  { weeks: [7, 8], label: 'Phase 4: Intensity', shortLabel: 'Intensity', note: 'Push closer to failure. If top of rep range feels easy, add 5–10 lbs.' },
];

export const WORKOUTS = {
  mon: {
    phase1: [
      { name: 'Dumbbell Chest Press', sets: 3, reps: '8-10', video: 'https://www.youtube.com/results?search_query=dumbbell+chest+press+form', muscle: 'Chest' },
      { name: 'Dumbbell Row', sets: 3, reps: '8-10', video: 'https://www.youtube.com/results?search_query=dumbbell+row+form', muscle: 'Back' },
      { name: 'Dumbbell Shoulder Press', sets: 3, reps: '10-12', video: 'https://www.youtube.com/results?search_query=dumbbell+shoulder+press+form', muscle: 'Shoulders' },
      { name: 'Bicep Curl', sets: 2, reps: '12', video: 'https://www.youtube.com/results?search_query=bicep+curl+form', muscle: 'Biceps' },
      { name: 'Tricep Pushdown', sets: 2, reps: '12', video: 'https://www.youtube.com/results?search_query=tricep+pushdown+form', muscle: 'Triceps' },
    ],
    phase3: [
      { name: 'Dumbbell Chest Press', sets: 4, reps: '8-10', video: 'https://www.youtube.com/results?search_query=dumbbell+chest+press+form', muscle: 'Chest' },
      { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', video: 'https://www.youtube.com/results?search_query=incline+dumbbell+press+form', muscle: 'Chest' },
      { name: 'Dumbbell Row', sets: 4, reps: '8-10', video: 'https://www.youtube.com/results?search_query=dumbbell+row+form', muscle: 'Back' },
      { name: 'Dumbbell Shoulder Press', sets: 3, reps: '10-12', video: 'https://www.youtube.com/results?search_query=dumbbell+shoulder+press+form', muscle: 'Shoulders' },
      { name: 'Hammer Curl', sets: 3, reps: '12', video: 'https://www.youtube.com/results?search_query=hammer+curl+form', muscle: 'Biceps' },
    ],
  },
  tue: {
    phase1: [
      { name: 'Goblet Squat', sets: 3, reps: '10-12', video: 'https://www.youtube.com/results?search_query=goblet+squat+form', muscle: 'Quads' },
      { name: 'Romanian Deadlift', sets: 3, reps: '10', video: 'https://www.youtube.com/results?search_query=romanian+deadlift+dumbbell+form', muscle: 'Hamstrings' },
      { name: 'Leg Press', sets: 3, reps: '12', video: 'https://www.youtube.com/results?search_query=leg+press+machine+form', muscle: 'Quads' },
      { name: 'Leg Curl', sets: 2, reps: '12', video: 'https://www.youtube.com/results?search_query=seated+leg+curl+form', muscle: 'Hamstrings' },
      { name: 'Calf Raise', sets: 3, reps: '15', video: 'https://www.youtube.com/results?search_query=standing+calf+raise+form', muscle: 'Calves' },
    ],
    phase3: [
      { name: 'Barbell Back Squat', sets: 4, reps: '6-8', video: 'https://www.youtube.com/results?search_query=barbell+back+squat+form', muscle: 'Quads' },
      { name: 'Romanian Deadlift', sets: 4, reps: '10', video: 'https://www.youtube.com/results?search_query=romanian+deadlift+dumbbell+form', muscle: 'Hamstrings' },
      { name: 'Leg Press', sets: 3, reps: '12', video: 'https://www.youtube.com/results?search_query=leg+press+machine+form', muscle: 'Quads' },
      { name: 'Leg Curl', sets: 3, reps: '12', video: 'https://www.youtube.com/results?search_query=seated+leg+curl+form', muscle: 'Hamstrings' },
      { name: 'Bulgarian Split Squat', sets: 3, reps: '10', video: 'https://www.youtube.com/results?search_query=bulgarian+split+squat+form', muscle: 'Glutes' },
    ],
  },
  wed: {
    phase1: [
      { name: 'Plank Hold', sets: 3, reps: '30s', video: 'https://www.youtube.com/results?search_query=plank+form+beginners', muscle: 'Core' },
      { name: 'Crunch', sets: 3, reps: '15', video: 'https://www.youtube.com/results?search_query=crunch+form', muscle: 'Abs' },
      { name: 'Leg Raise', sets: 3, reps: '12', video: 'https://www.youtube.com/results?search_query=lying+leg+raise+form', muscle: 'Lower Abs' },
      { name: 'Russian Twist', sets: 2, reps: '20', video: 'https://www.youtube.com/results?search_query=russian+twist+form', muscle: 'Obliques' },
      { name: 'Dead Bug', sets: 2, reps: '10', video: 'https://www.youtube.com/results?search_query=dead+bug+exercise+form', muscle: 'Core' },
    ],
    phase3: [
      { name: 'Plank Hold', sets: 4, reps: '45s', video: 'https://www.youtube.com/results?search_query=plank+form+beginners', muscle: 'Core' },
      { name: 'Cable Crunch', sets: 3, reps: '15', video: 'https://www.youtube.com/results?search_query=cable+crunch+form', muscle: 'Abs' },
      { name: 'Hanging Leg Raise', sets: 3, reps: '12', video: 'https://www.youtube.com/results?search_query=hanging+leg+raise+form', muscle: 'Lower Abs' },
      { name: 'Ab Wheel Rollout', sets: 3, reps: '10', video: 'https://www.youtube.com/results?search_query=ab+wheel+rollout+form', muscle: 'Core' },
      { name: 'Russian Twist (weighted)', sets: 3, reps: '20', video: 'https://www.youtube.com/results?search_query=russian+twist+form', muscle: 'Obliques' },
    ],
  },
  thu: {
    phase1: [
      { name: 'DB Fly / Cable Fly', sets: 3, reps: '12', video: 'https://www.youtube.com/results?search_query=dumbbell+fly+form', muscle: 'Chest' },
      { name: 'Lat Pulldown', sets: 3, reps: '10-12', video: 'https://www.youtube.com/results?search_query=lat+pulldown+form', muscle: 'Back' },
      { name: 'Lateral Raise', sets: 3, reps: '12', video: 'https://www.youtube.com/results?search_query=lateral+raise+form', muscle: 'Shoulders' },
      { name: 'Overhead Tricep Ext.', sets: 2, reps: '12', video: 'https://www.youtube.com/results?search_query=overhead+tricep+extension+form', muscle: 'Triceps' },
      { name: 'Face Pull', sets: 2, reps: '15', video: 'https://www.youtube.com/results?search_query=face+pull+form', muscle: 'Rear Delts' },
    ],
    phase3: [
      { name: 'Incline DB Fly', sets: 3, reps: '12', video: 'https://www.youtube.com/results?search_query=incline+dumbbell+fly+form', muscle: 'Chest' },
      { name: 'Lat Pulldown', sets: 4, reps: '10-12', video: 'https://www.youtube.com/results?search_query=lat+pulldown+form', muscle: 'Back' },
      { name: 'Seated Cable Row', sets: 4, reps: '10', video: 'https://www.youtube.com/results?search_query=seated+cable+row+form', muscle: 'Back' },
      { name: 'Lateral Raise', sets: 3, reps: '15', video: 'https://www.youtube.com/results?search_query=lateral+raise+form', muscle: 'Shoulders' },
      { name: 'Skull Crusher', sets: 3, reps: '12', video: 'https://www.youtube.com/results?search_query=skull+crusher+form', muscle: 'Triceps' },
    ],
  },
  fri: {
    phase1: [
      { name: 'Dumbbell Lunge', sets: 3, reps: '10', video: 'https://www.youtube.com/results?search_query=dumbbell+lunge+form', muscle: 'Quads' },
      { name: 'Leg Extension', sets: 3, reps: '12', video: 'https://www.youtube.com/results?search_query=leg+extension+machine+form', muscle: 'Quads' },
      { name: 'Sumo Squat', sets: 3, reps: '12', video: 'https://www.youtube.com/results?search_query=sumo+squat+form', muscle: 'Glutes' },
      { name: 'Seated Leg Curl', sets: 2, reps: '12', video: 'https://www.youtube.com/results?search_query=seated+leg+curl+form', muscle: 'Hamstrings' },
      { name: 'Hip Thrust (DB)', sets: 3, reps: '12', video: 'https://www.youtube.com/results?search_query=dumbbell+hip+thrust+form', muscle: 'Glutes' },
    ],
    phase3: [
      { name: 'Barbell Hip Thrust', sets: 4, reps: '10', video: 'https://www.youtube.com/results?search_query=barbell+hip+thrust+form', muscle: 'Glutes' },
      { name: 'Hack Squat / Leg Press', sets: 4, reps: '10', video: 'https://www.youtube.com/results?search_query=hack+squat+form', muscle: 'Quads' },
      { name: 'Walking Lunge', sets: 3, reps: '12', video: 'https://www.youtube.com/results?search_query=walking+lunge+form', muscle: 'Quads' },
      { name: 'Leg Extension', sets: 3, reps: '15', video: 'https://www.youtube.com/results?search_query=leg+extension+machine+form', muscle: 'Quads' },
      { name: 'Standing Calf Raise', sets: 3, reps: '15', video: 'https://www.youtube.com/results?search_query=standing+calf+raise+form', muscle: 'Calves' },
    ],
  },
};

export function getPhase(week) {
  for (const p of PHASES) {
    if (p.weeks.includes(week)) return p;
  }
  return PHASES[PHASES.length - 1];
}

export function getWorkout(dayKey, week) {
  const w = WORKOUTS[dayKey];
  if (!w) return [];
  return week >= 5 ? (w.phase3 || w.phase1) : w.phase1;
}

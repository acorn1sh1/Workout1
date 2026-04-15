import AsyncStorage from '@react-native-async-storage/async-storage';

export function storageKey(week, dayKey, exIdx, setIdx, type) {
  return `wt_w${week}_${dayKey}_e${exIdx}_s${setIdx}_${type}`;
}

export async function saveSet(week, dayKey, exIdx, setIdx, weight, reps) {
  try {
    await AsyncStorage.setItem(storageKey(week, dayKey, exIdx, setIdx, 'weight'), String(weight));
    await AsyncStorage.setItem(storageKey(week, dayKey, exIdx, setIdx, 'reps'), String(reps));
  } catch (e) {
    console.error('Save error', e);
  }
}

export async function loadDayData(week, dayKey, numExercises, exercises) {
  const result = {};
  for (let ei = 0; ei < numExercises; ei++) {
    const ex = exercises[ei];
    result[ei] = {};
    for (let s = 0; s < ex.sets; s++) {
      try {
        const weight = await AsyncStorage.getItem(storageKey(week, dayKey, ei, s, 'weight'));
        const reps = await AsyncStorage.getItem(storageKey(week, dayKey, ei, s, 'reps'));
        result[ei][s] = { weight: weight || '', reps: reps || '' };
      } catch (e) {
        result[ei][s] = { weight: '', reps: '' };
      }
    }
  }
  return result;
}

export async function loadPrevWeekData(week, dayKey, numExercises, exercises) {
  if (week <= 1) return {};
  return loadDayData(week - 1, dayKey, numExercises, exercises);
}

export async function getProgressData(week, dayKey, exercises) {
  const curr = await loadDayData(week, dayKey, exercises.length, exercises);
  const prev = week > 1 ? await loadDayData(week - 1, dayKey, exercises.length, exercises) : {};
  return exercises.map((ex, ei) => {
    let currTotal = 0, prevTotal = 0, currCount = 0, prevCount = 0;
    for (let s = 0; s < ex.sets; s++) {
      const cw = parseFloat(curr[ei]?.[s]?.weight) || 0;
      const pw = parseFloat(prev[ei]?.[s]?.weight) || 0;
      if (cw > 0) { currTotal += cw; currCount++; }
      if (pw > 0) { prevTotal += pw; prevCount++; }
    }
    return {
      name: ex.name,
      currAvg: currCount > 0 ? currTotal / currCount : 0,
      prevAvg: prevCount > 0 ? prevTotal / prevCount : 0,
    };
  });
}

export async function getAllWeeksProgress(dayKey, exercises) {
  const result = [];
  for (let w = 1; w <= 8; w++) {
    const data = await loadDayData(w, dayKey, exercises.length, exercises);
    let totalWeight = 0, count = 0;
    exercises.forEach((ex, ei) => {
      for (let s = 0; s < ex.sets; s++) {
        const val = parseFloat(data[ei]?.[s]?.weight) || 0;
        if (val > 0) { totalWeight += val; count++; }
      }
    });
    result.push({ week: w, avgWeight: count > 0 ? totalWeight / count : 0 });
  }
  return result;
}

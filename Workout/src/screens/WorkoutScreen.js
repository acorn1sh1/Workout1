import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput,
  StyleSheet, SafeAreaView, Alert, Linking, KeyboardAvoidingView,
  Platform, ActivityIndicator,
} from 'react-native';
import { COLORS, DAYS, getPhase, getWorkout } from '../data/workouts';
import { loadDayData, loadPrevWeekData, saveSet } from '../data/storage';

export default function WorkoutScreen({ route, navigation }) {
  const { dayKey, week } = route.params;
  const day = DAYS.find(d => d.key === dayKey);
  const exercises = getWorkout(dayKey, week);
  const phase = getPhase(week);

  const [inputs, setInputs] = useState({});
  const [prevData, setPrevData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    navigation.setOptions({ title: `${day.name} · Week ${week}` });
    loadAll();
  }, []);

  async function loadAll() {
    const curr = await loadDayData(week, dayKey, exercises.length, exercises);
    const prev = await loadPrevWeekData(week, dayKey, exercises.length, exercises);
    setInputs(curr);
    setPrevData(prev);
    setLoading(false);
  }

  function updateInput(exIdx, setIdx, field, value) {
    setInputs(prev => ({
      ...prev,
      [exIdx]: {
        ...prev[exIdx],
        [setIdx]: { ...prev[exIdx]?.[setIdx], [field]: value },
      },
    }));
    setSaved(false);
  }

  async function handleSave() {
    for (let ei = 0; ei < exercises.length; ei++) {
      const ex = exercises[ei];
      for (let s = 0; s < ex.sets; s++) {
        const weight = inputs[ei]?.[s]?.weight || '';
        const reps = inputs[ei]?.[s]?.reps || '';
        await saveSet(week, dayKey, ei, s, weight, reps);
      }
    }
    setSaved(true);
    Alert.alert('Saved! 💪', 'Your workout has been logged.');
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <ActivityIndicator style={{ marginTop: 60 }} color={COLORS.purple} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

          <View style={[styles.dayHeader, { backgroundColor: day.lightColor }]}>
            <View style={[styles.dayDot, { backgroundColor: day.color }]} />
            <View>
              <Text style={[styles.dayHeaderTitle, { color: day.color }]}>{day.type}</Text>
              <Text style={[styles.dayHeaderSub, { color: day.color }]}>{phase.shortLabel} · 30 min</Text>
            </View>
          </View>

          {exercises.map((ex, ei) => (
            <View key={ei} style={styles.exerciseCard}>
              <View style={styles.exerciseHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.exerciseName}>{ex.name}</Text>
                  <Text style={styles.muscleBadge}>{ex.muscle}</Text>
                </View>
                <TouchableOpacity
                  style={styles.videoBtn}
                  onPress={() => Linking.openURL(ex.video)}
                >
                  <Text style={styles.videoBtnText}>▶ Form</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.setHeader}>
                <Text style={[styles.setHeaderText, { flex: 0.5 }]}>Set</Text>
                <Text style={[styles.setHeaderText, { flex: 1 }]}>Target</Text>
                <Text style={[styles.setHeaderText, { flex: 1.2 }]}>Weight (lbs)</Text>
                <Text style={[styles.setHeaderText, { flex: 1 }]}>Reps done</Text>
              </View>

              {Array.from({ length: ex.sets }).map((_, si) => {
                const prev = prevData[ei]?.[si];
                const hasPrev = prev?.weight || prev?.reps;
                return (
                  <View key={si}>
                    <View style={styles.setRow}>
                      <View style={[styles.setNumCircle, { backgroundColor: day.lightColor }]}>
                        <Text style={[styles.setNum, { color: day.color }]}>{si + 1}</Text>
                      </View>
                      <Text style={styles.setTarget}>{ex.reps}</Text>
                      <TextInput
                        style={styles.input}
                        keyboardType="decimal-pad"
                        placeholder="—"
                        placeholderTextColor={COLORS.textLight}
                        value={inputs[ei]?.[si]?.weight || ''}
                        onChangeText={v => updateInput(ei, si, 'weight', v)}
                        returnKeyType="next"
                      />
                      <TextInput
                        style={styles.input}
                        keyboardType="number-pad"
                        placeholder="—"
                        placeholderTextColor={COLORS.textLight}
                        value={inputs[ei]?.[si]?.reps || ''}
                        onChangeText={v => updateInput(ei, si, 'reps', v)}
                        returnKeyType="done"
                      />
                    </View>
                    {hasPrev && (
                      <Text style={styles.prevHint}>
                        Last week: {prev.weight || '—'} lbs × {prev.reps || '—'} reps
                      </Text>
                    )}
                  </View>
                );
              })}
            </View>
          ))}

          <TouchableOpacity
            style={[styles.saveBtn, saved && styles.saveBtnDone]}
            onPress={handleSave}
            activeOpacity={0.85}
          >
            <Text style={styles.saveBtnText}>{saved ? '✓ Saved!' : 'Save Workout'}</Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  container: { padding: 16, paddingBottom: 40 },

  dayHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    borderRadius: 14, padding: 16, marginBottom: 16,
  },
  dayDot: { width: 12, height: 12, borderRadius: 6 },
  dayHeaderTitle: { fontSize: 16, fontWeight: '700' },
  dayHeaderSub: { fontSize: 12, marginTop: 2, opacity: 0.8 },

  exerciseCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  exerciseHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 14 },
  exerciseName: { fontSize: 15, fontWeight: '700', color: COLORS.text, flex: 1 },
  muscleBadge: { fontSize: 11, color: COLORS.textMuted, marginTop: 3 },
  videoBtn: {
    backgroundColor: COLORS.purpleLight,
    paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 8,
  },
  videoBtnText: { fontSize: 12, color: COLORS.purple, fontWeight: '600' },

  setHeader: { flexDirection: 'row', marginBottom: 8 },
  setHeaderText: { fontSize: 11, color: COLORS.textLight, fontWeight: '600', textTransform: 'uppercase' },

  setRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  setNumCircle: {
    width: 28, height: 28, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
    flex: 0.5,
  },
  setNum: { fontSize: 13, fontWeight: '700' },
  setTarget: { flex: 1, fontSize: 13, color: COLORS.textMuted },
  input: {
    flex: 1.2,
    height: 38,
    backgroundColor: COLORS.bg,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
    marginHorizontal: 4,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  prevHint: {
    fontSize: 11,
    color: COLORS.success,
    marginBottom: 6,
    marginLeft: 36,
    fontStyle: 'italic',
  },

  saveBtn: {
    backgroundColor: COLORS.purple,
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginTop: 8,
  },
  saveBtnDone: { backgroundColor: COLORS.success },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

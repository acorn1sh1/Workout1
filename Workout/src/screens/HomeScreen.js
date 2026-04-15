import React, { useState, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, DAYS, PHASES, getPhase, getWorkout } from '../data/workouts';
import { storageKey } from '../data/storage';

export default function HomeScreen({ navigation }) {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [completedDays, setCompletedDays] = useState({});

  useFocusEffect(
    useCallback(() => {
      checkCompletedDays();
    }, [currentWeek])
  );

  async function checkCompletedDays() {
    const result = {};
    for (const day of DAYS) {
      const exercises = getWorkout(day.key, currentWeek);
      let hasAnyData = false;
      for (let ei = 0; ei < exercises.length; ei++) {
        const ex = exercises[ei];
        for (let s = 0; s < ex.sets; s++) {
          try {
            const val = await AsyncStorage.getItem(storageKey(currentWeek, day.key, ei, s, 'weight'));
            if (val && val !== '') { hasAnyData = true; break; }
          } catch (e) {}
        }
        if (hasAnyData) break;
      }
      result[day.key] = hasAnyData;
    }
    setCompletedDays(result);
  }

  const phase = getPhase(currentWeek);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <Text style={styles.appTitle}>Workout Tracker</Text>
          <Text style={styles.appSubtitle}>Progressive Overload · 30 min sessions</Text>
        </View>

        <View style={styles.weekCard}>
          <Text style={styles.weekCardLabel}>Current Week</Text>
          <View style={styles.weekControls}>
            <TouchableOpacity
              style={[styles.weekBtn, currentWeek <= 1 && styles.weekBtnDisabled]}
              onPress={() => setCurrentWeek(w => Math.max(1, w - 1))}
              disabled={currentWeek <= 1}
            >
              <Text style={styles.weekBtnText}>‹</Text>
            </TouchableOpacity>
            <View style={styles.weekNumWrap}>
              <Text style={styles.weekNum}>{currentWeek}</Text>
              <Text style={styles.weekOf}>of 8</Text>
            </View>
            <TouchableOpacity
              style={[styles.weekBtn, currentWeek >= 8 && styles.weekBtnDisabled]}
              onPress={() => setCurrentWeek(w => Math.min(8, w + 1))}
              disabled={currentWeek >= 8}
            >
              <Text style={styles.weekBtnText}>›</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.phasePill}>
            <Text style={styles.phaseText}>{phase.shortLabel}</Text>
          </View>
        </View>

        <View style={styles.phaseNote}>
          <Text style={styles.phaseNoteTitle}>{phase.label}</Text>
          <Text style={styles.phaseNoteBody}>{phase.note}</Text>
        </View>

        <Text style={styles.sectionTitle}>This Week's Workouts</Text>

        {DAYS.map((day) => {
          const done = completedDays[day.key];
          return (
            <TouchableOpacity
              key={day.key}
              style={styles.dayCard}
              onPress={() => navigation.navigate('Workout', { dayKey: day.key, week: currentWeek })}
              activeOpacity={0.85}
            >
              <View style={[styles.dayColorBar, { backgroundColor: day.color }]} />
              <View style={styles.dayInfo}>
                <View style={styles.dayRow}>
                  <Text style={styles.dayName}>{day.name}</Text>
                  {done && (
                    <View style={styles.doneBadge}>
                      <Text style={styles.doneText}>✓ Logged</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.dayType}>{day.type}</Text>
                <Text style={styles.dayExCount}>
                  {getWorkout(day.key, currentWeek).length} exercises · {getWorkout(day.key, currentWeek).reduce((acc, e) => acc + e.sets, 0)} sets
                </Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          style={styles.progressBtn}
          onPress={() => navigation.navigate('Progress', { week: currentWeek })}
          activeOpacity={0.85}
        >
          <Text style={styles.progressBtnText}>📈  View Progress Charts</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  container: { padding: 20, paddingBottom: 40 },
  header: { marginBottom: 24, marginTop: 8 },
  appTitle: { fontSize: 28, fontWeight: '700', color: COLORS.text, letterSpacing: -0.5 },
  appSubtitle: { fontSize: 14, color: COLORS.textMuted, marginTop: 4 },

  weekCard: {
    backgroundColor: COLORS.purple,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  weekCardLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 12 },
  weekControls: { flexDirection: 'row', alignItems: 'center', gap: 24 },
  weekBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  weekBtnDisabled: { opacity: 0.3 },
  weekBtnText: { color: '#fff', fontSize: 28, lineHeight: 32 },
  weekNumWrap: { alignItems: 'center' },
  weekNum: { color: '#fff', fontSize: 48, fontWeight: '700', lineHeight: 52 },
  weekOf: { color: 'rgba(255,255,255,0.6)', fontSize: 13 },
  phasePill: {
    marginTop: 16, backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20,
  },
  phaseText: { color: '#fff', fontSize: 13, fontWeight: '600' },

  phaseNote: {
    backgroundColor: COLORS.purpleLight,
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
  },
  phaseNoteTitle: { fontSize: 13, fontWeight: '700', color: COLORS.purpleDark, marginBottom: 4 },
  phaseNoteBody: { fontSize: 13, color: COLORS.purple, lineHeight: 19 },

  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text, marginBottom: 12 },

  dayCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  dayColorBar: { width: 6, alignSelf: 'stretch' },
  dayInfo: { flex: 1, padding: 16 },
  dayRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 3 },
  dayName: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  dayType: { fontSize: 13, color: COLORS.textMuted, marginBottom: 2 },
  dayExCount: { fontSize: 12, color: COLORS.textLight },
  doneBadge: {
    backgroundColor: '#E1F5EE', paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: 8,
  },
  doneText: { fontSize: 11, color: COLORS.teal, fontWeight: '600' },
  chevron: { fontSize: 22, color: COLORS.textLight, paddingRight: 16 },

  progressBtn: {
    marginTop: 12,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.purple,
  },
  progressBtnText: { fontSize: 15, fontWeight: '600', color: COLORS.purple },
});

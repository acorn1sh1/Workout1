import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, ActivityIndicator, Dimensions,
} from 'react-native';
import { COLORS, DAYS, getWorkout } from '../data/workouts';
import { getAllWeeksProgress, getProgressData } from '../data/storage';

const SCREEN_WIDTH = Dimensions.get('window').width;
const BAR_MAX_HEIGHT = 120;

export default function ProgressScreen({ route }) {
  const { week } = route.params;
  const [selectedDay, setSelectedDay] = useState(DAYS[0]);
  const [weeklyProgress, setWeeklyProgress] = useState([]);
  const [weekComparison, setWeekComparison] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, [selectedDay]);

  async function loadProgress() {
    setLoading(true);
    const exercises = getWorkout(selectedDay.key, week >= 5 ? 5 : 1);
    const weekly = await getAllWeeksProgress(selectedDay.key, exercises);
    const comparison = await getProgressData(week, selectedDay.key, exercises);
    setWeeklyProgress(weekly);
    setWeekComparison(comparison);
    setLoading(false);
  }

  const maxWeight = Math.max(...weeklyProgress.map(w => w.avgWeight), 1);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        <Text style={styles.pageTitle}>Progress</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dayScroll}>
          {DAYS.map(day => (
            <TouchableOpacity
              key={day.key}
              style={[
                styles.dayPill,
                selectedDay.key === day.key && { backgroundColor: day.color },
              ]}
              onPress={() => setSelectedDay(day)}
            >
              <Text style={[
                styles.dayPillText,
                selectedDay.key === day.key && { color: '#fff' },
              ]}>{day.shortName}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {loading ? (
          <ActivityIndicator style={{ marginTop: 60 }} color={COLORS.purple} />
        ) : (
          <>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Avg Weight Per Session (lbs)</Text>
              <Text style={styles.cardSub}>{selectedDay.name} · {selectedDay.type}</Text>
              <View style={styles.barChart}>
                {weeklyProgress.map((w, i) => {
                  const barH = w.avgWeight > 0 ? Math.max(8, (w.avgWeight / maxWeight) * BAR_MAX_HEIGHT) : 4;
                  const isCurrentWeek = w.week === week;
                  return (
                    <View key={i} style={styles.barCol}>
                      {w.avgWeight > 0 && (
                        <Text style={styles.barVal}>{Math.round(w.avgWeight)}</Text>
                      )}
                      <View style={[
                        styles.bar,
                        { height: barH, backgroundColor: isCurrentWeek ? selectedDay.color : selectedDay.color + '55' },
                      ]} />
                      <Text style={[styles.barLabel, isCurrentWeek && { color: selectedDay.color, fontWeight: '700' }]}>
                        W{w.week}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>

            <Text style={styles.sectionTitle}>This Week vs Last Week</Text>
            {weekComparison.length === 0 ? (
              <Text style={styles.emptyText}>Log some workouts to see comparisons!</Text>
            ) : (
              weekComparison.map((ex, i) => {
                const diff = ex.currAvg - ex.prevAvg;
                const hasCurr = ex.currAvg > 0;
                const hasPrev = ex.prevAvg > 0;
                const pct = hasPrev ? Math.round((ex.currAvg / ex.prevAvg) * 100) : null;
                return (
                  <View key={i} style={styles.exRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.exName}>{ex.name}</Text>
                      <View style={styles.exBars}>
                        {hasPrev && (
                          <View style={styles.exBarWrap}>
                            <Text style={styles.exBarLabel}>Last wk</Text>
                            <View style={styles.exBarTrack}>
                              <View style={[styles.exBarFill, { width: '100%', backgroundColor: COLORS.border }]} />
                            </View>
                            <Text style={styles.exBarVal}>{Math.round(ex.prevAvg)} lbs</Text>
                          </View>
                        )}
                        {hasCurr && (
                          <View style={styles.exBarWrap}>
                            <Text style={[styles.exBarLabel, { color: selectedDay.color }]}>This wk</Text>
                            <View style={styles.exBarTrack}>
                              <View style={[
                                styles.exBarFill,
                                {
                                  width: hasPrev ? `${Math.min(100, pct)}%` : '100%',
                                  backgroundColor: selectedDay.color,
                                },
                              ]} />
                            </View>
                            <Text style={[styles.exBarVal, { color: selectedDay.color }]}>{Math.round(ex.currAvg)} lbs</Text>
                          </View>
                        )}
                      </View>
                    </View>
                    {hasCurr && hasPrev && (
                      <View style={[
                        styles.diffBadge,
                        { backgroundColor: diff >= 0 ? '#E1F5EE' : '#FAECE7' },
                      ]}>
                        <Text style={[styles.diffText, { color: diff >= 0 ? COLORS.teal : COLORS.coral }]}>
                          {diff >= 0 ? '+' : ''}{Math.round(diff)} lbs
                        </Text>
                      </View>
                    )}
                  </View>
                );
              })
            )}

            <View style={{ height: 40 }} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  container: { padding: 20, paddingBottom: 40 },
  pageTitle: { fontSize: 28, fontWeight: '700', color: COLORS.text, marginBottom: 16 },

  dayScroll: { marginBottom: 20 },
  dayPill: {
    paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 20, marginRight: 8,
    backgroundColor: COLORS.card,
    borderWidth: 1, borderColor: COLORS.border,
  },
  dayPillText: { fontSize: 13, fontWeight: '600', color: COLORS.textMuted },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16, padding: 20, marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text, marginBottom: 2 },
  cardSub: { fontSize: 12, color: COLORS.textMuted, marginBottom: 20 },

  barChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: BAR_MAX_HEIGHT + 40,
  },
  barCol: { flex: 1, alignItems: 'center', justifyContent: 'flex-end' },
  bar: { width: '60%', borderRadius: 4, minHeight: 4 },
  barVal: { fontSize: 9, color: COLORS.textMuted, marginBottom: 4 },
  barLabel: { fontSize: 10, color: COLORS.textLight, marginTop: 6 },

  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text, marginBottom: 12 },
  emptyText: { fontSize: 14, color: COLORS.textMuted, textAlign: 'center', marginTop: 20 },

  exRow: {
    backgroundColor: COLORS.card, borderRadius: 14,
    padding: 16, marginBottom: 10,
    flexDirection: 'row', alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  exName: { fontSize: 14, fontWeight: '700', color: COLORS.text, marginBottom: 10 },
  exBars: { gap: 6 },
  exBarWrap: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  exBarLabel: { fontSize: 11, color: COLORS.textMuted, width: 48 },
  exBarTrack: { flex: 1, height: 8, backgroundColor: COLORS.bg, borderRadius: 4, overflow: 'hidden' },
  exBarFill: { height: '100%', borderRadius: 4 },
  exBarVal: { fontSize: 11, color: COLORS.textMuted, width: 52, textAlign: 'right' },
  diffBadge: {
    paddingHorizontal: 10, paddingVertical: 6,
    borderRadius: 10, marginLeft: 10,
  },
  diffText: { fontSize: 12, fontWeight: '700' },
});

import { Preferences } from '@capacitor/preferences'

const DB_KEY_LOG_PREFIX = 'daily_log_'
const DB_KEY_HABIT_PREFIX = 'habit_'

export async function saveDailyLog(log: {
  id: string
  weight?: number
  fatigue_level?: number
  lessons_learned?: string
  water_intake: number
}) {
  await Preferences.set({ key: DB_KEY_LOG_PREFIX + log.id, value: JSON.stringify(log) })
}

export async function loadDailyLog(date: string) {
  const { value } = await Preferences.get({ key: DB_KEY_LOG_PREFIX + date })
  return value ? JSON.parse(value) : null
}

export async function saveHabits(habits: {
  id: string
  visualization_done: boolean
  pre_workout_done: boolean
  post_workout_done: boolean
  reading_done: boolean
}) {
  await Preferences.set({ key: DB_KEY_HABIT_PREFIX + habits.id, value: JSON.stringify(habits) })
}

export async function loadHabits(date: string) {
  const { value } = await Preferences.get({ key: DB_KEY_HABIT_PREFIX + date })
  return value ? JSON.parse(value) : null
}

export async function loadWeightHistory(): Promise<{ date: string; weight: number }[]> {
  const { keys } = await Preferences.keys()
  const logKeys = keys.filter((k) => k.startsWith(DB_KEY_LOG_PREFIX))
  const results: { date: string; weight: number }[] = []
  for (const k of logKeys) {
    const { value } = await Preferences.get({ key: k })
    if (value) {
      const parsed = JSON.parse(value)
      if (parsed.weight) {
        results.push({ date: parsed.id, weight: parsed.weight })
      }
    }
  }
  return results.sort((a, b) => a.date.localeCompare(b.date))
}

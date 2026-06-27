import { create } from 'zustand'
import { NavTab, DailyLog, HabitsTracking } from '../types'

const today = () => new Date().toISOString().split('T')[0]

interface AppStore {
  activeTab: NavTab
  setActiveTab: (tab: NavTab) => void

  todayDate: string
  todayLog: DailyLog
  habits: HabitsTracking
  weightHistory: { date: string; weight: number }[]

  setTodayLog: (log: Partial<DailyLog>) => void
  setHabit: (key: keyof Omit<HabitsTracking, 'id'>, value: boolean) => void
  setWeightHistory: (data: { date: string; weight: number }[]) => void
  incrementWater: () => void

  // SOS modal
  sosOpen: boolean
  setSosOpen: (v: boolean) => void
}

export const useAppStore = create<AppStore>((set, get) => ({
  activeTab: 'painel',
  setActiveTab: (tab) => set({ activeTab: tab }),

  todayDate: today(),
  todayLog: {
    id: today(),
    water_intake: 0,
  },
  habits: {
    id: today(),
    visualization_done: false,
    pre_workout_done: false,
    post_workout_done: false,
    reading_done: false,
  },
  weightHistory: [],

  setTodayLog: (log) =>
    set((s) => ({ todayLog: { ...s.todayLog, ...log } })),

  setHabit: (key, value) =>
    set((s) => ({ habits: { ...s.habits, [key]: value } })),

  setWeightHistory: (data) => set({ weightHistory: data }),

  incrementWater: () =>
    set((s) => ({
      todayLog: { ...s.todayLog, water_intake: s.todayLog.water_intake + 1 },
    })),

  sosOpen: false,
  setSosOpen: (v) => set({ sosOpen: v }),
}))

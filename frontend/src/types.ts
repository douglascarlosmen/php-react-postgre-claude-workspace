export interface DailyLog {
  id: string // YYYY-MM-DD
  weight?: number
  fatigue_level?: number
  lessons_learned?: string
  water_intake: number
}

export interface HabitsTracking {
  id: string // YYYY-MM-DD
  visualization_done: boolean
  pre_workout_done: boolean
  post_workout_done: boolean
  reading_done: boolean
}

export type WeekDay = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'

export type NavTab = 'painel' | 'diario' | 'nutricao' | 'treino' | 'mental'

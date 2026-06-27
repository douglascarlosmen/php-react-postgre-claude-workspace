import { WeekDay } from '../types'

export const START_DATE = new Date('2026-06-27')
export const COMBAT_DATE = new Date('2026-12-05')
export const TOTAL_DAYS = 161

export function getDaysRemaining(): number {
  const now = new Date()
  const diff = COMBAT_DATE.getTime() - now.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export function getCurrentDay(): number {
  const now = new Date()
  const diff = now.getTime() - START_DATE.getTime()
  return Math.max(1, Math.min(TOTAL_DAYS, Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1))
}

export function getWeekDay(): WeekDay {
  const days: WeekDay[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  return days[new Date().getDay()]
}

export function formatDatePTBR(date: Date): string {
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function todayString(): string {
  return new Date().toISOString().split('T')[0]
}

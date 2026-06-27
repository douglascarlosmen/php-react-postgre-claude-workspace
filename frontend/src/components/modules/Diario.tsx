import { useState } from 'react'
import { useAppStore } from '../../store/useAppStore'
import { saveHabits, saveDailyLog } from '../../lib/db'
import { todayString } from '../../lib/dateUtils'

const HABITS = [
  { key: 'visualization_done' as const, label: 'Visualização Neuromotora (10 min)', icon: '🧠' },
  { key: 'pre_workout_done' as const, label: 'Rotina Pré-Treino (âncora, fita, música)', icon: '🎯' },
  { key: 'post_workout_done' as const, label: 'Pós-Treino (Carboidratos + 5g Creatina)', icon: '💊' },
  { key: 'reading_done' as const, label: 'Leitura Noturna (15–20 páginas)', icon: '📚' },
]

export default function Diario() {
  const { habits, setHabit, todayLog, setTodayLog, incrementWater } = useAppStore()
  const [saved, setSaved] = useState(false)
  const [weightInput, setWeightInput] = useState(todayLog.weight?.toString() ?? '')
  const [fatigueInput, setFatigueInput] = useState(todayLog.fatigue_level?.toString() ?? '')
  const [lessonsInput, setLessonsInput] = useState(todayLog.lessons_learned ?? '')

  const toggleHabit = async (key: typeof HABITS[0]['key']) => {
    const newVal = !habits[key]
    setHabit(key, newVal)
    const updated = { ...habits, [key]: newVal }
    await saveHabits(updated)
  }

  const handleSave = async () => {
    const log = {
      id: todayString(),
      weight: weightInput ? parseFloat(weightInput) : undefined,
      fatigue_level: fatigueInput ? parseInt(fatigueInput) : undefined,
      lessons_learned: lessonsInput || undefined,
      water_intake: todayLog.water_intake,
    }
    setTodayLog(log)
    await saveDailyLog(log)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const completedCount = HABITS.filter((h) => habits[h.key]).length

  return (
    <div className="h-full flex gap-3 p-4 overflow-hidden">
      {/* Left: Checklist */}
      <div className="flex-1 flex flex-col gap-3 overflow-hidden">
        <div className="bg-brand-card rounded-2xl p-4 border border-brand-border">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-white font-bold text-base">Checklist do Dia</h2>
            <span className={`text-sm font-bold px-2 py-0.5 rounded-full ${completedCount === 4 ? 'bg-green-800 text-green-300' : 'bg-brand-border text-slate-300'}`}>
              {completedCount}/4
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {HABITS.map((h) => (
              <button
                key={h.key}
                onClick={() => toggleHabit(h.key)}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                  habits[h.key]
                    ? 'bg-green-900/40 border-green-700 text-green-300'
                    : 'bg-brand-dark border-brand-border text-slate-300 hover:border-slate-500'
                }`}
              >
                <span className="text-xl">{h.icon}</span>
                <span className="flex-1 text-sm font-medium">{h.label}</span>
                <span className={`text-lg ${habits[h.key] ? 'text-green-400' : 'text-slate-600'}`}>
                  {habits[h.key] ? '✓' : '○'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Water tracker */}
        <div className="bg-brand-card rounded-2xl p-4 border border-brand-border">
          <h2 className="text-white font-bold text-base mb-3">💧 Hidratação</h2>
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-8 rounded-sm ${i < todayLog.water_intake ? 'bg-blue-500' : 'bg-brand-border'}`}
                />
              ))}
            </div>
            <div className="flex flex-col items-center">
              <span className="text-white font-bold text-xl">{todayLog.water_intake}</span>
              <span className="text-slate-500 text-xs">/ 10 copos</span>
            </div>
            <button
              onClick={incrementWater}
              className="ml-auto bg-blue-700 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-xl transition-all"
            >
              + Copo
            </button>
          </div>
          <p className="text-slate-500 text-xs mt-2">Meta: 4 a 5 litros (~10 copos de 450ml)</p>
        </div>
      </div>

      {/* Right: Fechamento do Dia */}
      <div className="w-72 bg-brand-card rounded-2xl p-4 border border-brand-border flex flex-col gap-3">
        <h2 className="text-white font-bold text-base">🌙 Fechamento do Dia</h2>

        <div>
          <label className="text-slate-400 text-xs uppercase tracking-wider">Peso (kg)</label>
          <input
            type="number"
            step="0.1"
            value={weightInput}
            onChange={(e) => setWeightInput(e.target.value)}
            placeholder="ex: 84.5"
            className="w-full mt-1 bg-brand-dark border border-brand-border text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-red"
          />
        </div>

        <div>
          <label className="text-slate-400 text-xs uppercase tracking-wider">Nível de Cansaço (1–10)</label>
          <input
            type="number"
            min="1"
            max="10"
            value={fatigueInput}
            onChange={(e) => setFatigueInput(e.target.value)}
            placeholder="1 = descansado, 10 = destruído"
            className="w-full mt-1 bg-brand-dark border border-brand-border text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-red"
          />
        </div>

        <div className="flex-1">
          <label className="text-slate-400 text-xs uppercase tracking-wider">O que aprendi hoje?</label>
          <textarea
            value={lessonsInput}
            onChange={(e) => setLessonsInput(e.target.value)}
            placeholder="Reflexão do dia..."
            rows={5}
            className="w-full mt-1 bg-brand-dark border border-brand-border text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-red resize-none"
          />
        </div>

        <button
          onClick={handleSave}
          className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
            saved
              ? 'bg-green-700 text-green-100'
              : 'bg-brand-red hover:bg-red-700 text-white'
          }`}
        >
          {saved ? '✓ Salvo!' : 'Salvar Fechamento'}
        </button>
      </div>
    </div>
  )
}

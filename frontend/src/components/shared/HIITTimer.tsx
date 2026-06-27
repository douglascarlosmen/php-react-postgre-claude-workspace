import { useState, useEffect, useRef } from 'react'

const WARMUP_SECS = 10 * 60
const EFFORT_SECS = 25
const REST_SECS = 90
const TOTAL_CYCLES = 8

type Phase = 'idle' | 'warmup' | 'effort' | 'rest' | 'done'

export default function HIITTimer() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [seconds, setSeconds] = useState(WARMUP_SECS)
  const [cycle, setCycle] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clear = () => { if (intervalRef.current) clearInterval(intervalRef.current) }

  useEffect(() => {
    if (phase === 'idle' || phase === 'done') { clear(); return }

    intervalRef.current = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          if (phase === 'warmup') { setPhase('effort'); return EFFORT_SECS }
          if (phase === 'effort') { setPhase('rest'); return REST_SECS }
          if (phase === 'rest') {
            const nextCycle = cycle + 1
            if (nextCycle >= TOTAL_CYCLES) { setPhase('done'); return 0 }
            setCycle(nextCycle)
            setPhase('effort')
            return EFFORT_SECS
          }
        }
        return s - 1
      })
    }, 1000)

    return clear
  }, [phase, cycle])

  const start = () => { setPhase('warmup'); setSeconds(WARMUP_SECS); setCycle(0) }
  const stop = () => { setPhase('idle'); setSeconds(WARMUP_SECS); setCycle(0); clear() }

  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60

  const phaseConfig: Record<string, { label: string; color: string; bg: string }> = {
    warmup: { label: 'Aquecimento (Corrida Leve)', color: 'text-green-400', bg: 'border-green-700' },
    effort: { label: '🔥 ESFORÇO MÁXIMO!', color: 'text-brand-red', bg: 'border-brand-red' },
    rest: { label: '💨 Caminhada / Recuperação', color: 'text-blue-400', bg: 'border-blue-700' },
  }
  const cfg = phaseConfig[phase] ?? { label: '', color: 'text-white', bg: 'border-brand-border' }

  if (phase === 'done') {
    return (
      <div className="flex flex-col items-center gap-4 p-6 bg-brand-card rounded-2xl border border-green-700 text-center">
        <span className="text-5xl">✅</span>
        <p className="text-white font-black text-2xl">HIIT Completo!</p>
        <p className="text-slate-400">8 tiros concluídos. Excelente trabalho.</p>
        <button onClick={stop} className="bg-brand-red text-white px-6 py-2 rounded-xl font-bold">Reiniciar</button>
      </div>
    )
  }

  return (
    <div className={`flex flex-col gap-4 p-4 bg-brand-card rounded-2xl border ${cfg.bg}`}>
      {/* Cycle progress */}
      {phase !== 'idle' && phase !== 'warmup' && (
        <div className="flex gap-1">
          {Array.from({ length: TOTAL_CYCLES }).map((_, i) => (
            <div key={i} className={`flex-1 h-2 rounded-full ${i < cycle ? 'bg-green-600' : i === cycle ? 'bg-brand-red' : 'bg-brand-border'}`} />
          ))}
        </div>
      )}

      {phase !== 'idle' && (
        <div className="text-center">
          <p className={`font-black text-2xl ${cfg.color}`}>{cfg.label}</p>
          {phase !== 'warmup' && <p className="text-slate-400 text-sm">Tiro {cycle + 1} / {TOTAL_CYCLES}</p>}
        </div>
      )}

      <div className="text-center">
        <span className={`timer-display font-black text-7xl ${cfg.color}`}>
          {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
        </span>
      </div>

      <div className="flex justify-center">
        {phase === 'idle' ? (
          <button onClick={start} className="bg-brand-red hover:bg-red-700 text-white font-black px-8 py-3 rounded-xl text-lg">
            ▶ INICIAR HIIT
          </button>
        ) : (
          <button onClick={stop} className="bg-brand-border hover:bg-slate-600 text-slate-300 font-bold px-6 py-2 rounded-xl">
            ✕ Encerrar
          </button>
        )}
      </div>
    </div>
  )
}

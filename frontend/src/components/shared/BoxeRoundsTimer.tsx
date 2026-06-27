import { useState, useEffect, useRef } from 'react'

const ROUNDS = [
  { num: 1, label: 'Calibração', color: 'text-blue-400' },
  { num: 2, label: 'Base Invertida', color: 'text-purple-400' },
  { num: 3, label: 'Head Movement', color: 'text-cyan-400' },
  { num: 4, label: 'Ritmo de Combate', color: 'text-orange-400' },
  { num: 5, label: 'Ritmo de Combate', color: 'text-orange-400' },
  { num: 6, label: 'Ritmo de Combate', color: 'text-orange-400' },
  { num: 7, label: 'Inteligência e Fintas', color: 'text-yellow-400' },
  { num: 8, label: 'Velocidade Tabata', color: 'text-red-400' },
  { num: 9, label: 'Nocaute', color: 'text-red-600' },
  { num: 10, label: 'Inside Fighting', color: 'text-pink-400' },
]

const ROUND_SECS = 3 * 60
const REST_SECS = 60

type Phase = 'idle' | 'round' | 'rest' | 'done'

export default function BoxeRoundsTimer() {
  const [currentRound, setCurrentRound] = useState(0)
  const [phase, setPhase] = useState<Phase>('idle')
  const [seconds, setSeconds] = useState(ROUND_SECS)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clear = () => { if (intervalRef.current) clearInterval(intervalRef.current) }

  useEffect(() => {
    if (phase === 'idle' || phase === 'done') { clear(); return }

    intervalRef.current = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          if (phase === 'round') {
            if (currentRound >= 9) {
              setPhase('done')
              return 0
            }
            setPhase('rest')
            return REST_SECS
          } else {
            setCurrentRound((r) => r + 1)
            setPhase('round')
            return ROUND_SECS
          }
        }
        return s - 1
      })
    }, 1000)

    return clear
  }, [phase, currentRound])

  const start = () => { setCurrentRound(0); setPhase('round'); setSeconds(ROUND_SECS) }
  const stop = () => { setPhase('idle'); setSeconds(ROUND_SECS); setCurrentRound(0); clear() }

  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  const round = ROUNDS[currentRound] ?? ROUNDS[9]

  if (phase === 'done') {
    return (
      <div className="flex flex-col items-center gap-4 p-6 bg-brand-card rounded-2xl border border-green-700 text-center">
        <span className="text-5xl">🏆</span>
        <p className="text-white font-black text-2xl">10 Rounds Completos!</p>
        <button onClick={stop} className="bg-brand-red text-white px-6 py-2 rounded-xl font-bold">Reiniciar</button>
      </div>
    )
  }

  return (
    <div className={`flex flex-col gap-4 p-4 bg-brand-card rounded-2xl border ${phase === 'round' ? 'border-brand-red' : phase === 'rest' ? 'border-blue-700' : 'border-brand-border'}`}>
      {/* Round grid */}
      <div className="grid grid-cols-5 gap-1">
        {ROUNDS.map((r) => (
          <div
            key={r.num}
            className={`h-2 rounded-full transition-all ${
              r.num - 1 < currentRound ? 'bg-green-600' :
              r.num - 1 === currentRound && phase === 'round' ? 'bg-brand-red' : 'bg-brand-border'
            }`}
          />
        ))}
      </div>

      {/* Current round info */}
      {phase !== 'idle' && (
        <div className="text-center">
          <p className={`font-black text-4xl ${round.color}`}>R{round.num}: {round.label}</p>
          <p className={`text-sm mt-1 ${phase === 'rest' ? 'text-blue-400' : 'text-slate-400'}`}>
            {phase === 'rest' ? '⏱ Descanso' : '🥊 Lute!'}
          </p>
        </div>
      )}

      {/* Timer */}
      <div className="text-center">
        <span className={`timer-display font-black text-7xl ${phase === 'rest' ? 'text-blue-400' : 'text-white'}`}>
          {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
        </span>
      </div>

      {/* Controls */}
      <div className="flex gap-2 justify-center">
        {phase === 'idle' ? (
          <button onClick={start} className="bg-brand-red hover:bg-red-700 text-white font-black px-8 py-3 rounded-xl text-lg transition-all">
            ▶ INICIAR PROTOCOLO
          </button>
        ) : (
          <button onClick={stop} className="bg-brand-border hover:bg-slate-600 text-slate-300 font-bold px-6 py-2 rounded-xl transition-all">
            ✕ Encerrar
          </button>
        )}
      </div>
    </div>
  )
}

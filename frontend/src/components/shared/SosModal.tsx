import { useState, useEffect } from 'react'
import { useAppStore } from '../../store/useAppStore'

const INHALE_SECS = 4
const EXHALE_SECS = 6
const TOTAL_CYCLES = 10
const CYCLE_SECS = INHALE_SECS + EXHALE_SECS

export default function SosModal() {
  const { setSosOpen } = useAppStore()
  const [cycle, setCycle] = useState(0)
  const [phase, setPhase] = useState<'inhale' | 'exhale'>('inhale')
  const [active, setActive] = useState(false)
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (!active) return
    const interval = setInterval(() => {
      setElapsed((e) => {
        const next = e + 1
        const cyclePos = next % CYCLE_SECS
        setPhase(cyclePos < INHALE_SECS ? 'inhale' : 'exhale')
        if (next % CYCLE_SECS === 0) {
          setCycle((c) => {
            if (c + 1 >= TOTAL_CYCLES) { setActive(false) }
            return c + 1
          })
        }
        return next
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [active])

  const start = () => { setActive(true); setCycle(0); setElapsed(0); setPhase('inhale') }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setSosOpen(false)}>
      <div className="bg-brand-card border border-brand-border rounded-3xl p-8 w-[500px] text-center" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-white font-black text-2xl mb-1">Respiração de Crise</h2>
        <p className="text-slate-400 text-sm mb-6">4 segundos inspirar • 6 segundos expirar • 10 ciclos</p>

        {/* Breathing circle */}
        <div className="flex justify-center mb-6">
          <div
            className={`w-40 h-40 rounded-full flex flex-col items-center justify-center transition-all duration-1000 ${
              active
                ? phase === 'inhale'
                  ? 'scale-125 bg-blue-900/60 border-4 border-blue-500'
                  : 'scale-90 bg-slate-800/60 border-4 border-slate-500'
                : 'scale-100 bg-brand-dark border-4 border-brand-border'
            }`}
          >
            {active ? (
              <>
                <span className="text-white font-black text-lg">{phase === 'inhale' ? 'INSPIRE' : 'EXPIRE'}</span>
                <span className="text-slate-300 text-sm">{cycle + 1}/{TOTAL_CYCLES}</span>
              </>
            ) : cycle >= TOTAL_CYCLES ? (
              <span className="text-green-400 font-black text-base">Completo ✓</span>
            ) : (
              <span className="text-slate-400 text-sm">Pronto</span>
            )}
          </div>
        </div>

        {/* Progress */}
        {active && (
          <div className="flex gap-1 mb-6 justify-center">
            {Array.from({ length: TOTAL_CYCLES }).map((_, i) => (
              <div key={i} className={`w-6 h-1.5 rounded-full ${i < cycle ? 'bg-green-500' : i === cycle ? 'bg-blue-400' : 'bg-brand-border'}`} />
            ))}
          </div>
        )}

        <div className="flex gap-3 justify-center">
          {!active && (
            <button onClick={start} className="bg-blue-700 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-xl transition-all">
              {cycle >= TOTAL_CYCLES ? '↺ Repetir' : '▶ Iniciar'}
            </button>
          )}
          <button onClick={() => setSosOpen(false)} className="bg-brand-border hover:bg-slate-600 text-slate-300 font-bold px-6 py-3 rounded-xl transition-all">
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}

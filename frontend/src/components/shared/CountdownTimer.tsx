import { useState, useEffect, useRef } from 'react'

interface Props {
  initialSeconds: number
  label?: string
  onComplete?: () => void
  autoStart?: boolean
}

export default function CountdownTimer({ initialSeconds, label, onComplete, autoStart = false }: Props) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [running, setRunning] = useState(autoStart)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) {
            setRunning(false)
            onComplete?.()
            return 0
          }
          return s - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running])

  const reset = () => { setSeconds(initialSeconds); setRunning(false) }
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60

  return (
    <div className={`flex flex-col items-center gap-3 p-4 bg-brand-card rounded-2xl border ${running ? 'border-brand-red pulse-active' : 'border-brand-border'}`}>
      {label && <p className="text-slate-400 text-xs uppercase tracking-wider">{label}</p>}
      <span className="timer-display text-white font-black text-5xl">
        {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
      </span>
      <div className="flex gap-2">
        <button
          onClick={() => setRunning(!running)}
          className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${
            running ? 'bg-yellow-700 hover:bg-yellow-600 text-white' : 'bg-brand-red hover:bg-red-700 text-white'
          }`}
        >
          {running ? '⏸ Pausar' : '▶ Iniciar'}
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 rounded-xl font-bold text-sm bg-brand-border hover:bg-slate-600 text-slate-300 transition-all"
        >
          ↺
        </button>
      </div>
    </div>
  )
}

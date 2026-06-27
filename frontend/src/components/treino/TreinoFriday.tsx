import { useState } from 'react'
import CountdownTimer from '../shared/CountdownTimer'

const AGILIDADE = [
  'Tiros curtos de 10m (aceleração)',
  'Burpees (3 séries de 10)',
  'Footwork ladder',
  'Carioca',
  'High knees (20m)',
]

export default function TreinoFriday() {
  const [agil, setAgil] = useState<Set<number>>(new Set())
  const toggle = (i: number) => setAgil((s) => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n })

  return (
    <div className="h-full panel-scroll p-4">
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-4 mb-4 border border-blue-700">
        <p className="text-blue-300 text-xs uppercase tracking-widest">Sexta-feira</p>
        <h2 className="text-white font-black text-xl">Corrida Leve (LISS) + Agilidade + Recuperação</h2>
        <p className="text-blue-300/70 text-sm mt-1">Preservar energia para o Sparring de Sábado</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-brand-card border border-brand-border rounded-2xl p-4">
          <h3 className="text-white font-bold mb-3">🏃 LISS — Horto Florestal</h3>
          <p className="text-slate-400 text-sm mb-3">45 a 60 min em ritmo leve. Frequência cardíaca: zona 2 (60-70% máx).</p>
          <CountdownTimer initialSeconds={50 * 60} label="Timer Corrida (50 min)" />
        </div>

        <div className="bg-brand-card border border-brand-border rounded-2xl p-4">
          <h3 className="text-white font-bold mb-1">⚡ Agilidade — Parque Zilda Natel</h3>
          <p className="text-slate-400 text-xs mb-3">Após a corrida. Intensidade moderada — não se destrua antes de sábado.</p>
          <div className="flex flex-col gap-2">
            {AGILIDADE.map((item, i) => (
              <button key={i} onClick={() => toggle(i)} className={`text-left p-2.5 rounded-xl border transition-all text-sm ${agil.has(i) ? 'bg-green-900/40 border-green-700 text-green-300' : 'bg-brand-dark border-brand-border text-slate-300 hover:border-slate-500'}`}>
                <span className="mr-2">{agil.has(i) ? '✓' : '○'}</span>{item}
              </button>
            ))}
          </div>
          <div className="mt-3 bg-brand-gold/10 border border-brand-gold/30 rounded-xl p-3">
            <p className="text-brand-gold text-xs">🔄 Alongamento obrigatório pós-treino — foco em quadríceps, isquiotibiais e ombros.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

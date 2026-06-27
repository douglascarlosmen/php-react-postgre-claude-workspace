import { useState } from 'react'

const EXERCICIOS_B = [
  { nome: 'Levantamento Terra', series: '4x 5', obs: 'Explosão pura. Foco no drive dos quadris.' },
  { nome: 'Arremesso de Slam Ball', series: '3x 10-12', obs: 'Máxima força. Grito no esforço.' },
  { nome: 'Kettlebell Swings', series: '3x 12-15', obs: 'Hip hinge. Glúteos no topo.' },
  { nome: 'Flexão Pliométrica', series: '3x 6-8', obs: 'Palmas saem do chão. Potência máxima.' },
  { nome: 'Russian Twists', series: '3x 20', obs: 'Com peso. Rotação total. Core de aço.' },
]

export default function TreinoThursday() {
  const [done, setDone] = useState<Set<number>>(new Set())
  const toggle = (i: number) => setDone((s) => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n })

  return (
    <div className="h-full panel-scroll p-4">
      <div className="bg-gradient-to-r from-purple-900 to-purple-800 rounded-2xl p-4 mb-4 border border-purple-700">
        <p className="text-purple-300 text-xs uppercase tracking-widest">Quinta-feira</p>
        <h2 className="text-white font-black text-xl">Musculação — Treino B (Explosão) + Footwork</h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-brand-card border border-brand-border rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-bold">⚡ Treino B — Explosão</h3>
            <span className="text-sm text-slate-400">{done.size}/{EXERCICIOS_B.length}</span>
          </div>
          <div className="flex flex-col gap-2">
            {EXERCICIOS_B.map((ex, i) => (
              <button key={i} onClick={() => toggle(i)} className={`text-left p-3 rounded-xl border transition-all ${done.has(i) ? 'bg-green-900/40 border-green-700' : 'bg-brand-dark border-brand-border hover:border-slate-500'}`}>
                <div className="flex items-start gap-2">
                  <span className={`mt-0.5 ${done.has(i) ? 'text-green-400' : 'text-slate-600'}`}>{done.has(i) ? '✓' : '○'}</span>
                  <div>
                    <p className={`font-semibold text-sm ${done.has(i) ? 'text-green-300 line-through' : 'text-white'}`}>{ex.nome}</p>
                    <p className="text-brand-gold text-xs font-bold">{ex.series}</p>
                    <p className="text-slate-500 text-xs">{ex.obs}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="bg-brand-card border border-brand-border rounded-2xl p-4">
            <h3 className="text-white font-bold mb-2">👟 Boxe — Movimentação / Footwork</h3>
            <ul className="text-slate-300 text-sm flex flex-col gap-2">
              <li>• Trabalho de pés com agilidade ladder</li>
              <li>• Triangles / box step combinados com jab</li>
              <li>• Ênfase em pivot e saídas de ângulo</li>
              <li>• 3 rounds de shadowboxing com footwork</li>
            </ul>
          </div>
          <div className="bg-brand-card border border-brand-border rounded-2xl p-4">
            <h3 className="text-white font-bold mb-2">🪢 Pular Corda</h3>
            <p className="text-slate-300 text-sm">4 a 5 rounds • Foco em velocidade e ritmo</p>
          </div>
        </div>
      </div>
    </div>
  )
}

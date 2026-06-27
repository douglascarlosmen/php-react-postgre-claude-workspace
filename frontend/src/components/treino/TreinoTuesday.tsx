import { useState } from 'react'

const EXERCICIOS_A = [
  { nome: 'Agachamento com Barra', series: '4x 6-8', obs: 'Foco em profundidade e controle excêntrico' },
  { nome: 'Supino Reto', series: '4x 6-8', obs: 'Escápulas retraídas, arco natural' },
  { nome: 'Barra Fixa', series: '4x 8-10', obs: 'Amplitude completa, sem balanço' },
  { nome: 'Lunge com Halteres', series: '3x 10', obs: 'Cada perna — joelho não ultrapassa o pé' },
  { nome: 'Prancha Lateral', series: '3x 40 seg', obs: 'Quadril elevado, corpo reto' },
]

export default function TreinoTuesday() {
  const [done, setDone] = useState<Set<number>>(new Set())
  const toggle = (i: number) => setDone((s) => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n })

  return (
    <div className="h-full panel-scroll p-4">
      <div className="bg-gradient-to-r from-purple-900 to-purple-800 rounded-2xl p-4 mb-4 border border-purple-700">
        <p className="text-purple-300 text-xs uppercase tracking-widest">Terça-feira</p>
        <h2 className="text-white font-black text-xl">Musculação — Treino A (Força) + Fita de Esquiva</h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-brand-card border border-brand-border rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-bold">🏋️ Treino A — Base</h3>
            <span className="text-sm text-slate-400">{done.size}/{EXERCICIOS_A.length}</span>
          </div>
          <div className="flex flex-col gap-2">
            {EXERCICIOS_A.map((ex, i) => (
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
            <h3 className="text-white font-bold mb-2">🎯 Fita de Esquiva (Slip Line)</h3>
            <p className="text-slate-400 text-sm mb-3">Esquivas laterais sob a fita. Manter postura de boxe durante todo o exercício.</p>
            <ul className="text-slate-300 text-sm flex flex-col gap-1">
              <li>• 4 rounds de 2 minutos</li>
              <li>• Foco: ritmo + postura + respiração</li>
              <li>• Variações: simples / com jab pós-esquiva</li>
            </ul>
          </div>
          <div className="bg-brand-card border border-brand-border rounded-2xl p-4">
            <h3 className="text-white font-bold mb-2">🪢 Pular Corda</h3>
            <p className="text-slate-300 text-sm">4 a 5 rounds • 2 min pular / 1 min descanso</p>
            <p className="text-slate-400 text-xs mt-1">Foco em ritmo e coordenação. Progressão para double-unders.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

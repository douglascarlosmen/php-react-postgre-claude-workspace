import { useState } from 'react'

const PLANEJAMENTO = [
  'Revisar logs da semana (peso, cansaço, lições)',
  'Definir foco técnico para a semana',
  'Verificar alimentação e compras necessárias',
  'Confirmar horários dos treinos',
  'Releitura dos pontos da semana anterior',
]

export default function TreinoSunday() {
  const [plan, setPlan] = useState<Set<number>>(new Set())
  const toggle = (i: number) => setPlan((s) => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n })

  return (
    <div className="h-full panel-scroll p-4">
      <div className="bg-gradient-to-r from-green-900 to-green-800 rounded-2xl p-4 mb-4 border border-green-700">
        <p className="text-green-300 text-xs uppercase tracking-widest">Domingo</p>
        <h2 className="text-white font-black text-xl">Descanso Ativo + Planejamento da Semana</h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-brand-card border border-brand-border rounded-2xl p-4">
          <h3 className="text-white font-bold mb-3">🚶 Descanso Ativo</h3>
          <div className="bg-green-900/30 border border-green-800 rounded-xl p-3 mb-3">
            <p className="text-green-300 font-semibold text-sm">Caminhada Leve</p>
            <p className="text-green-300/70 text-xs">20-30 minutos. Sem intensidade. Recuperação ativa.</p>
          </div>
          <ul className="text-slate-300 text-sm flex flex-col gap-2">
            <li>• Mobilidade articular (10 min)</li>
            <li>• Foam roller nas pernas e costas</li>
            <li>• Respiração consciente (5 min)</li>
            <li>• Exposição ao sol pela manhã</li>
          </ul>
        </div>

        <div className="bg-brand-card border border-brand-border rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-bold">📋 Planejamento Semanal</h3>
            <span className="text-sm text-slate-400">{plan.size}/{PLANEJAMENTO.length}</span>
          </div>
          <div className="flex flex-col gap-2">
            {PLANEJAMENTO.map((item, i) => (
              <button key={i} onClick={() => toggle(i)} className={`text-left p-2.5 rounded-xl border transition-all text-sm ${plan.has(i) ? 'bg-green-900/40 border-green-700 text-green-300' : 'bg-brand-dark border-brand-border text-slate-300 hover:border-slate-500'}`}>
                <span className="mr-2">{plan.has(i) ? '✓' : '○'}</span>{item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

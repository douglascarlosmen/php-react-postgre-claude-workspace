import CountdownTimer from '../shared/CountdownTimer'

export default function TreinoMonday() {
  return (
    <div className="h-full panel-scroll p-4">
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-4 mb-4 border border-blue-700">
        <p className="text-blue-300 text-xs uppercase tracking-widest">Segunda-feira</p>
        <h2 className="text-white font-black text-xl">Corrida Leve (LISS) + Boxe + Mental</h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-brand-card border border-brand-border rounded-2xl p-4">
          <h3 className="text-white font-bold mb-3">🏃 Corrida LISS</h3>
          <p className="text-slate-300 text-sm mb-1">📍 Horto Florestal</p>
          <p className="text-slate-300 text-sm mb-3">⏱ 45 a 60 minutos</p>
          <p className="text-slate-400 text-xs">Ritmo leve — conversa possível. Queima de gordura sem estresse muscular.</p>
          <div className="mt-3">
            <CountdownTimer initialSeconds={50 * 60} label="Timer Corrida (50 min)" />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="bg-brand-card border border-brand-border rounded-2xl p-4">
            <h3 className="text-white font-bold mb-2">🥊 Boxe — Técnica e Saco</h3>
            <ul className="text-slate-300 text-sm flex flex-col gap-1">
              <li>• Shadowboxing (2 rounds de aquecimento)</li>
              <li>• Combinações no Saco (3 rounds)</li>
              <li>• Trabalho de Técnica específica</li>
            </ul>
          </div>
          <div className="bg-brand-card border border-brand-border rounded-2xl p-4">
            <h3 className="text-white font-bold mb-2">🧠 Treino Mental</h3>
            <ul className="text-slate-300 text-sm flex flex-col gap-1">
              <li>• Visualização Neuromotora (10 min)</li>
              <li>• Análise de erros da semana passada</li>
              <li>• Definição de foco da semana</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

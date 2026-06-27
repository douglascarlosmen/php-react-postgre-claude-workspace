import HIITTimer from '../shared/HIITTimer'
import BoxeRoundsTimer from '../shared/BoxeRoundsTimer'

export default function TreinoWednesday() {
  return (
    <div className="h-full panel-scroll p-4">
      <div className="bg-gradient-to-r from-orange-900 to-orange-800 rounded-2xl p-4 mb-4 border border-orange-700">
        <p className="text-orange-300 text-xs uppercase tracking-widest">Quarta-feira</p>
        <h2 className="text-white font-black text-xl">Corrida HIIT/Tiros + Boxe 10 Rounds Intenso</h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-brand-card border border-brand-border rounded-2xl p-4">
          <h3 className="text-white font-bold mb-2">🏃 HIIT — Represa Marcelo Pedroni</h3>
          <p className="text-slate-400 text-xs mb-3">10 min aquecimento → 8 ciclos: 25 seg máximo / 90 seg caminhada</p>
          <HIITTimer />
        </div>

        <div className="bg-brand-card border border-brand-border rounded-2xl p-4">
          <h3 className="text-white font-bold mb-2">🥊 Protocolo 10 Rounds no Saco</h3>
          <p className="text-slate-400 text-xs mb-3">3 min combate / 1 min descanso • Cada round tem objetivo específico</p>
          <BoxeRoundsTimer />
        </div>
      </div>
    </div>
  )
}

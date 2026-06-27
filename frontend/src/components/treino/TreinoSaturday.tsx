import { useState } from 'react'

export default function TreinoSaturday() {
  const [selfTapping, setSelfTapping] = useState(false)

  return (
    <div className="h-full panel-scroll p-4">
      <div className="bg-gradient-to-r from-red-950 to-red-900 rounded-2xl p-4 mb-4 border border-red-700">
        <p className="text-red-300 text-xs uppercase tracking-widest">Sábado — Dia de Guerra</p>
        <h2 className="text-white font-black text-2xl">O DOMÍNIO DO MESTRE</h2>
        <p className="text-red-300/80 text-sm mt-1">Treino na Academia + Sparring</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-brand-card border border-red-900/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 min-h-[200px]">
          <span className="text-5xl">🥋</span>
          <p className="text-white font-black text-xl">Modo Combate Ativado</p>
          <p className="text-slate-300 text-base leading-relaxed">
            Faça exatamente o que ele mandar no aquecimento, na técnica e no sparring.
          </p>
          <p className="text-slate-400 text-sm">Sem timer. Sem protocolo automático.<br/>O Mestre comanda. Você executa.</p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="bg-brand-card border border-brand-border rounded-2xl p-4">
            <h3 className="text-white font-bold mb-3">✅ Checklist Pré-Saída</h3>
            <button
              onClick={() => setSelfTapping(!selfTapping)}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all ${selfTapping ? 'bg-green-900/40 border-green-700' : 'bg-brand-dark border-brand-border hover:border-slate-500'}`}
            >
              <span className={`text-2xl ${selfTapping ? 'text-green-400' : 'text-slate-600'}`}>{selfTapping ? '✓' : '○'}</span>
              <div className="text-left">
                <p className={`font-bold ${selfTapping ? 'text-green-300' : 'text-white'}`}>Self-Tapping realizado</p>
                <p className="text-slate-400 text-xs">Golpes leves no rosto/testa com as luvas, olhos abertos, sem piscar</p>
              </div>
            </button>
          </div>

          <div className="bg-brand-card border border-brand-border rounded-2xl p-4">
            <h3 className="text-white font-bold mb-2">⚠️ Mentalidade Guerreira</h3>
            <ul className="text-slate-300 text-sm flex flex-col gap-2">
              <li>• Cada golpe que você recebe é informação</li>
              <li>• Recue, feche a guarda, respire, continue</li>
              <li>• O cansaço é a voz do fraco tentando parar o forte</li>
              <li>• Você não para. Você processa e segue.</li>
            </ul>
          </div>

          <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-xl p-3">
            <p className="text-brand-gold text-sm font-bold">🎯 Foco de hoje:</p>
            <p className="text-brand-gold/80 text-sm">Head movement + distância de combate + reagir sem pensar</p>
          </div>
        </div>
      </div>
    </div>
  )
}

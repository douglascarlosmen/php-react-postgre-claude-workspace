import { useState } from 'react'
import { useAppStore } from '../../store/useAppStore'

const BOOKS = [
  { title: 'Nada Pode Me Ferir', subtitle: 'Can\'t Hurt Me — David Goggins', color: 'from-red-900 to-red-800', border: 'border-red-700' },
  { title: 'O Caminho da Luta', subtitle: 'The Way of the Fight — Georges St-Pierre', color: 'from-blue-900 to-blue-800', border: 'border-blue-700' },
  { title: 'A Verdade Nua e Crua', subtitle: 'Undisputed Truth — Mike Tyson', color: 'from-purple-900 to-purple-800', border: 'border-purple-700' },
  { title: 'Mindfighter', subtitle: 'Neurociência e Psicologia para as Lutas', color: 'from-orange-900 to-orange-800', border: 'border-orange-700' },
  { title: 'Meditações', subtitle: 'Marco Aurélio', color: 'from-slate-700 to-slate-600', border: 'border-slate-500' },
]

export default function Mental() {
  const { setSosOpen } = useAppStore()
  const [currentBook, setCurrentBook] = useState(0)
  const [showVisualizacao, setShowVisualizacao] = useState(false)
  const [showSelfTapping, setShowSelfTapping] = useState(false)

  return (
    <div className="h-full panel-scroll p-4">
      <div className="grid grid-cols-3 gap-3 h-full">
        {/* Left: Books */}
        <div className="col-span-1 flex flex-col gap-3">
          <div className="bg-brand-card border border-brand-border rounded-2xl p-4">
            <h2 className="text-white font-bold text-base mb-3">📚 Biblioteca Obrigatória</h2>
            <p className="text-slate-500 text-xs mb-3">Leitura em ordem sequencial obrigatória</p>
            <div className="flex flex-col gap-2">
              {BOOKS.map((book, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentBook(i)}
                  className={`text-left p-2.5 rounded-xl border transition-all ${
                    i < currentBook
                      ? 'bg-green-900/30 border-green-800 opacity-70'
                      : i === currentBook
                      ? `bg-gradient-to-r ${book.color} ${book.border}`
                      : 'bg-brand-dark border-brand-border opacity-50'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className={`text-sm font-black ${i < currentBook ? 'text-green-400' : i === currentBook ? 'text-white' : 'text-slate-600'}`}>
                      {i < currentBook ? '✓' : i === currentBook ? '▶' : `${i + 1}`}
                    </span>
                    <div>
                      <p className={`font-semibold text-xs leading-tight ${i <= currentBook ? 'text-white' : 'text-slate-500'}`}>{book.title}</p>
                      <p className="text-slate-400 text-xs leading-tight">{book.subtitle}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => setCurrentBook(Math.max(0, currentBook - 1))}
                className="flex-1 bg-brand-border hover:bg-slate-600 text-slate-300 text-xs py-2 rounded-lg"
              >← Anterior</button>
              <button
                onClick={() => setCurrentBook(Math.min(4, currentBook + 1))}
                className="flex-1 bg-brand-red hover:bg-red-700 text-white text-xs py-2 rounded-lg"
              >Próximo →</button>
            </div>
          </div>
        </div>

        {/* Center: Visualização */}
        <div className="col-span-1 flex flex-col gap-3">
          <div className="bg-brand-card border border-brand-border rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-white font-bold text-base">🎯 Visualização (10 min/dia)</h2>
              <button
                onClick={() => setShowVisualizacao(!showVisualizacao)}
                className="text-slate-400 text-xs hover:text-white"
              >{showVisualizacao ? '▲ Fechar' : '▼ Ver guia'}</button>
            </div>

            {showVisualizacao && (
              <div className="text-slate-300 text-sm flex flex-col gap-2 mb-3">
                <p className="text-brand-gold font-semibold text-xs uppercase tracking-wider">Protocolo de Visualização 1ª Pessoa</p>
                <ol className="flex flex-col gap-1.5 pl-3">
                  <li><span className="text-brand-gold">1.</span> Feche os olhos. Respire fundo 3x.</li>
                  <li><span className="text-brand-gold">2.</span> Visualize: você está no combate. Cheiro, som, peso das luvas.</li>
                  <li><span className="text-brand-gold">3.</span> Scenario de estresse: você está cansado, recebeu um golpe duro.</li>
                  <li><span className="text-brand-gold">4.</span> Reação estoica: <span className="text-white font-semibold">recuar, fechar a guarda, respirar e continuar</span>.</li>
                  <li><span className="text-brand-gold">5.</span> Veja você dominando o 2º e 3º round.</li>
                  <li><span className="text-brand-gold">6.</span> Finalize: você no seu melhor. Confiante. Afiado.</li>
                </ol>
              </div>
            )}

            <div className="bg-brand-dark border border-brand-border rounded-xl p-3 text-center">
              <p className="text-slate-400 text-xs mb-1">Cenários para visualizar</p>
              <div className="flex flex-col gap-1 text-xs text-slate-300">
                <span>• Cansaço extremo no round 3</span>
                <span>• Receber um cruzado inesperado</span>
                <span>• Estar em desvantagem no placar</span>
                <span>• Manter o ritmo quando o oponente acelera</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setSosOpen(true)}
            className="bg-gradient-to-r from-blue-900 to-blue-800 border border-blue-700 text-white font-bold py-4 rounded-2xl hover:from-blue-800 hover:to-blue-700 transition-all text-center"
          >
            🆘 Respiração de Crise 4-6<br />
            <span className="font-normal text-sm text-blue-300">Ansiedade pré-sparring</span>
          </button>
        </div>

        {/* Right: Self-Tapping */}
        <div className="col-span-1 flex flex-col gap-3">
          <div className="bg-brand-card border border-brand-border rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-white font-bold text-base">👊 Self-Tapping</h2>
              <button
                onClick={() => setShowSelfTapping(!showSelfTapping)}
                className="text-slate-400 text-xs hover:text-white"
              >{showSelfTapping ? '▲ Fechar' : '▼ Ver técnica'}</button>
            </div>

            <div className="bg-brand-dark border border-brand-border rounded-xl p-3 mb-3">
              <p className="text-white font-semibold text-sm">Dessensibilização ao Contato</p>
              <p className="text-slate-400 text-xs mt-1">
                Golpes leves no próprio rosto e testa com as luvas. Olhos abertos. Sem piscar. Treina o sistema nervoso a não reagir com pânico ao contato facial.
              </p>
            </div>

            {showSelfTapping && (
              <div className="text-slate-300 text-sm flex flex-col gap-2 mb-3">
                <p className="text-brand-gold font-semibold text-xs uppercase tracking-wider">Protocolo</p>
                <ol className="flex flex-col gap-1.5 pl-3 text-xs">
                  <li><span className="text-brand-gold">1.</span> Vista as luvas (ou use as mãos abertas)</li>
                  <li><span className="text-brand-gold">2.</span> Postura de guarda</li>
                  <li><span className="text-brand-gold">3.</span> Golpes leves na testa e rosto lateral</li>
                  <li><span className="text-brand-gold">4.</span> Mantenha os olhos ABERTOS. NÃO PISQUE.</li>
                  <li><span className="text-brand-gold">5.</span> Respire normalmente durante</li>
                  <li><span className="text-brand-gold">6.</span> 2-3 minutos. Diário, especialmente antes do Sábado.</li>
                </ol>
              </div>
            )}

            <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-xl p-3">
              <p className="text-brand-gold text-xs font-bold">Objetivo:</p>
              <p className="text-brand-gold/80 text-xs">Quando levar um golpe no sparring, o sistema nervoso já conhece a sensação. Sem pânico. Sem recuo instintivo. Apenas processamento.</p>
            </div>
          </div>

          <div className="bg-brand-card border border-brand-border rounded-2xl p-4">
            <h3 className="text-white font-bold text-sm mb-2">🧘 Princípios Estoicos do Dia</h3>
            <div className="flex flex-col gap-2 text-xs text-slate-400">
              <p className="italic">"Não reze para que as coisas sejam fáceis. Reze para ser mais forte."</p>
              <p className="italic">"A dor de hoje é a força de amanhã."</p>
              <p className="italic">"Recuar, fechar a guarda, respirar e continuar."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

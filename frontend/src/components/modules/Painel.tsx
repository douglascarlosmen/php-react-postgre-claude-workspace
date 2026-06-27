import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts'
import { useAppStore } from '../../store/useAppStore'
import { getDaysRemaining, getCurrentDay, getWeekDay, formatDatePTBR, COMBAT_DATE } from '../../lib/dateUtils'

const DAILY_SUMMARY: Record<string, string> = {
  monday: 'Corrida Leve (LISS) + Boxe (Técnica e Saco) + Treino Mental',
  tuesday: 'Musculação (Treino A - Força) + Exercícios Defensivos (Fita de Esquiva)',
  wednesday: 'Corrida (HIIT/Tiros) + Boxe (10 Rounds Saco Intenso)',
  thursday: 'Musculação (Treino B - Explosão) + Boxe (Movimentação/Footwork)',
  friday: 'Corrida Leve (LISS) + Agilidade/Alongamento (Recuperação para o Sparring)',
  saturday: 'Dia de Guerra — Treino na Academia (Regras do Mestre) + Sparring',
  sunday: 'Descanso Ativo (Caminhada leve) + Planejamento da Semana',
}

const DAY_COLORS: Record<string, string> = {
  monday: 'from-blue-900 to-blue-800',
  tuesday: 'from-purple-900 to-purple-800',
  wednesday: 'from-orange-900 to-orange-800',
  thursday: 'from-purple-900 to-purple-800',
  friday: 'from-blue-900 to-blue-800',
  saturday: 'from-red-900 to-red-800',
  sunday: 'from-green-900 to-green-800',
}

export default function Painel() {
  const { weightHistory, setSosOpen } = useAppStore()
  const daysRemaining = getDaysRemaining()
  const currentDay = getCurrentDay()
  const weekDay = getWeekDay()
  const todayFormatted = formatDatePTBR(new Date())

  const chartData = weightHistory.length > 0
    ? weightHistory
    : [{ date: '2026-06-27', weight: 86 }, { date: '2026-12-05', weight: 78 }]

  return (
    <div className="h-full panel-scroll p-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-slate-400 text-sm capitalize">{todayFormatted}</p>
          <h1 className="text-white font-black text-2xl">
            Dia <span className="text-brand-gold">{currentDay}</span>{' '}
            <span className="text-slate-500 text-lg font-normal">/ 161</span>
          </h1>
        </div>
        <div className="text-right">
          <p className="text-slate-400 text-xs uppercase tracking-wider">Combate em</p>
          <p className="text-brand-red font-black text-3xl">{daysRemaining}</p>
          <p className="text-slate-400 text-xs">dias — 5 Dez 2026</p>
        </div>
      </div>

      {/* Daily summary card */}
      <div className={`bg-gradient-to-r ${DAY_COLORS[weekDay] || 'from-slate-800 to-slate-700'} rounded-2xl p-4 mb-4 border border-white/10`}>
        <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Protocolo de Hoje</p>
        <p className="text-white font-bold text-lg leading-snug">{DAILY_SUMMARY[weekDay]}</p>
      </div>

      {/* Chart */}
      <div className="bg-brand-card rounded-2xl p-4 mb-4 border border-brand-border">
        <div className="flex items-center justify-between mb-3">
          <p className="text-slate-300 font-semibold text-sm">Evolução do Peso</p>
          <div className="flex gap-3 text-xs text-slate-500">
            <span>Meta: <span className="text-brand-gold">78 kg</span></span>
            <span>Início: <span className="text-slate-300">86 kg</span></span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="date" tick={{ fill: '#64748B', fontSize: 10 }} tickFormatter={(v) => v.slice(5)} />
            <YAxis domain={[76, 88]} tick={{ fill: '#64748B', fontSize: 10 }} />
            <Tooltip
              contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 8 }}
              labelStyle={{ color: '#94A3B8' }}
              itemStyle={{ color: '#F1F5F9' }}
              formatter={(v: number) => [`${v} kg`, 'Peso']}
            />
            <ReferenceLine y={78} stroke="#D97706" strokeDasharray="4 4" label={{ value: '78kg', fill: '#D97706', fontSize: 10 }} />
            <ReferenceLine y={86} stroke="#475569" strokeDasharray="4 4" />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#DC2626"
              strokeWidth={2}
              dot={{ fill: '#DC2626', r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* SOS Button */}
      <button
        onClick={() => setSosOpen(true)}
        className="w-full bg-brand-card border border-brand-red/50 text-brand-red font-bold py-3 rounded-xl hover:bg-brand-red hover:text-white transition-all"
      >
        🆘 Respiração de Crise 4-6
      </button>
    </div>
  )
}

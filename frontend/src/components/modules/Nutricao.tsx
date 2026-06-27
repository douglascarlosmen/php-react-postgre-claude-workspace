import { getWeekDay } from '../../lib/dateUtils'

interface Meal {
  label: string
  items: string[]
}

interface Scenario {
  name: string
  color: string
  banner?: string
  meals: Meal[]
}

const scenarios: Record<string, Scenario> = {
  A: {
    name: 'Cenário A — Foco na Recuperação',
    color: 'from-green-900 to-green-800',
    meals: [
      {
        label: '🌅 Café da Manhã',
        items: [
          '2 ovos inteiros + 3 claras',
          '1 pão francês (50g)',
          '15g requeijão',
          '1 banana (100g)',
          '30g proteína de soja',
        ],
      },
      {
        label: '🍽️ Almoço & Jantar',
        items: [
          '100g arroz branco',
          '80g feijão',
          '100g carne magra',
          '100g legumes',
        ],
      },
      {
        label: '🍌 Lanche',
        items: [
          '80g frango grelhado',
          '1 pão francês',
          '15g requeijão',
          '1 banana + 1 maçã',
        ],
      },
    ],
  },
  B: {
    name: 'Cenário B — Foco no Equilíbrio',
    color: 'from-blue-900 to-blue-800',
    banner: 'Atenção: A sexta-feira usa o Cenário B para não estourar as calorias, mas garante nutrientes suficientes para poupar os músculos para o sábado.',
    meals: [
      {
        label: '🌅 Café da Manhã',
        items: [
          '2 ovos inteiros + 3 claras',
          '1 pão francês (50g)',
          '20g requeijão',
          '1 banana (100g)',
          '35g proteína de soja',
        ],
      },
      {
        label: '🍽️ Almoço & Jantar',
        items: [
          '140g arroz branco',
          '100g feijão',
          '110g carne magra',
          '120g legumes',
        ],
      },
      {
        label: '🍌 Lanche',
        items: [
          '100g frango grelhado',
          '1 pão francês',
          '20g requeijão',
          '1 banana + 1 maçã',
        ],
      },
    ],
  },
  C: {
    name: 'Cenário C — Foco na Energia e Explosão',
    color: 'from-red-900 to-red-800',
    banner: 'Sábado é o dia em que o Mestre vai te testar. Você precisa desse combustível.',
    meals: [
      {
        label: '🌅 Café da Manhã',
        items: [
          '2 ovos inteiros + 4 claras',
          '1,5 pão francês (75g)',
          '25g requeijão',
          '1 banana grande (150g)',
          '40g proteína de soja',
        ],
      },
      {
        label: '🍽️ Almoço & Jantar',
        items: [
          '180g arroz branco',
          '120g feijão',
          '120g carne magra',
          '150g legumes',
        ],
      },
      {
        label: '🍌 Lanche Pré-Treino',
        items: [
          '120g frango grelhado',
          '1,5 pão francês',
          '25g requeijão',
          '1 banana grande + 1 maçã grande',
        ],
      },
    ],
  },
}

const dayScenario: Record<string, 'A' | 'B' | 'C'> = {
  sunday: 'A',
  monday: 'B',
  tuesday: 'B',
  wednesday: 'C',
  thursday: 'B',
  friday: 'B',
  saturday: 'C',
}

export default function Nutricao() {
  const weekDay = getWeekDay()
  const scenarioKey = dayScenario[weekDay]
  const scenario = scenarios[scenarioKey]

  return (
    <div className="h-full panel-scroll p-4">
      <div className={`bg-gradient-to-r ${scenario.color} rounded-2xl p-4 mb-4 border border-white/10`}>
        <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Protocolo Nutricional</p>
        <h2 className="text-white font-black text-xl">{scenario.name}</h2>
        <p className="text-white/50 text-xs mt-1">Cenário {scenarioKey} • {['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'][new Date().getDay()]}</p>
      </div>

      {scenario.banner && (
        <div className="bg-brand-gold/10 border border-brand-gold/30 text-brand-gold rounded-xl p-3 mb-4 text-sm">
          ⚠️ {scenario.banner}
        </div>
      )}

      <div className="grid grid-cols-3 gap-3">
        {scenario.meals.map((meal) => (
          <div key={meal.label} className="bg-brand-card border border-brand-border rounded-2xl p-4">
            <h3 className="text-white font-bold text-sm mb-3">{meal.label}</h3>
            <ul className="flex flex-col gap-2">
              {meal.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-slate-300 text-sm">
                  <span className="text-brand-gold mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-4 bg-brand-card border border-brand-border rounded-xl p-3 flex items-center gap-3">
        <span className="text-2xl">💊</span>
        <div>
          <p className="text-white font-semibold text-sm">Creatina Diária</p>
          <p className="text-slate-400 text-xs">3 a 5g — preferencialmente no pós-treino com carboidrato</p>
        </div>
      </div>
    </div>
  )
}

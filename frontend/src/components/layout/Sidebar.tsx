import { useAppStore } from '../../store/useAppStore'
import { NavTab } from '../../types'

const TABS: { id: NavTab; label: string; icon: string }[] = [
  { id: 'painel', label: 'Painel', icon: '📊' },
  { id: 'diario', label: 'Diário', icon: '✅' },
  { id: 'nutricao', label: 'Nutrição', icon: '🥗' },
  { id: 'treino', label: 'Treino', icon: '🥊' },
  { id: 'mental', label: 'Mental', icon: '🧠' },
]

export default function Sidebar() {
  const { activeTab, setActiveTab } = useAppStore()

  return (
    <aside className="w-20 h-full bg-brand-card border-r border-brand-border flex flex-col items-center py-4 gap-2 shrink-0">
      <div className="text-center mb-4">
        <span className="text-brand-red font-black text-lg leading-none">78</span>
        <span className="text-brand-gold font-black text-lg leading-none">KG</span>
      </div>
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
            activeTab === tab.id
              ? 'bg-brand-red text-white'
              : 'text-slate-400 hover:bg-brand-border hover:text-white'
          }`}
        >
          <span className="text-xl">{tab.icon}</span>
          <span className="text-xs font-medium">{tab.label}</span>
        </button>
      ))}
    </aside>
  )
}

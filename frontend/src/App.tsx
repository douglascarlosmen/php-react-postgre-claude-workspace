import { useEffect } from 'react'
import { useAppStore } from './store/useAppStore'
import { loadDailyLog, loadHabits, loadWeightHistory } from './lib/db'
import { todayString } from './lib/dateUtils'
import Sidebar from './components/layout/Sidebar'
import Painel from './components/modules/Painel'
import Diario from './components/modules/Diario'
import Nutricao from './components/modules/Nutricao'
import Treino from './components/modules/Treino'
import Mental from './components/modules/Mental'
import SosModal from './components/shared/SosModal'

export default function App() {
  const { activeTab, setTodayLog, setHabit, setWeightHistory, sosOpen } = useAppStore()

  useEffect(() => {
    const date = todayString()
    loadDailyLog(date).then((log) => { if (log) setTodayLog(log) })
    loadHabits(date).then((h) => {
      if (h) {
        setHabit('visualization_done', h.visualization_done)
        setHabit('pre_workout_done', h.pre_workout_done)
        setHabit('post_workout_done', h.post_workout_done)
        setHabit('reading_done', h.reading_done)
      }
    })
    loadWeightHistory().then(setWeightHistory)
  }, [])

  const modules: Record<string, JSX.Element> = {
    painel: <Painel />,
    diario: <Diario />,
    nutricao: <Nutricao />,
    treino: <Treino />,
    mental: <Mental />,
  }

  return (
    <div className="flex w-screen h-screen bg-brand-dark overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        {modules[activeTab]}
      </main>
      {sosOpen && <SosModal />}
    </div>
  )
}

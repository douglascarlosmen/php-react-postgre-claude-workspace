import { getWeekDay } from '../../lib/dateUtils'
import TreinoMonday from '../treino/TreinoMonday'
import TreinoTuesday from '../treino/TreinoTuesday'
import TreinoWednesday from '../treino/TreinoWednesday'
import TreinoThursday from '../treino/TreinoThursday'
import TreinoFriday from '../treino/TreinoFriday'
import TreinoSaturday from '../treino/TreinoSaturday'
import TreinoSunday from '../treino/TreinoSunday'

const MODULES: Record<string, JSX.Element> = {
  monday: <TreinoMonday />,
  tuesday: <TreinoTuesday />,
  wednesday: <TreinoWednesday />,
  thursday: <TreinoThursday />,
  friday: <TreinoFriday />,
  saturday: <TreinoSaturday />,
  sunday: <TreinoSunday />,
}

export default function Treino() {
  const weekDay = getWeekDay()
  return <div className="h-full overflow-hidden">{MODULES[weekDay]}</div>
}

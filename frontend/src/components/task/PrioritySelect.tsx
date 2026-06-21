import type { Priority } from '../../types'

interface Props {
  value: Priority | null
  onChange: (p: Priority | null) => void
}

export default function PrioritySelect({ value, onChange }: Props) {
  return (
    <select
      value={value ?? ''}
      onChange={(e) => onChange((e.target.value as Priority) || null)}
      className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-card text-text-primary"
    >
      <option value="">Sem prioridade</option>
      <option value="low">Baixa</option>
      <option value="medium">Média</option>
      <option value="high">Alta</option>
    </select>
  )
}

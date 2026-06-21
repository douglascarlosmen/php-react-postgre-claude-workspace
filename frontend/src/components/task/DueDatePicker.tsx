interface Props {
  value: string | null
  onChange: (date: string | null) => void
}

export default function DueDatePicker({ value, onChange }: Props) {
  return (
    <input
      type="date"
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value || null)}
      className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-card text-text-primary"
    />
  )
}

import { useEffect, useState } from 'react'
import type { User } from '../../types'
import { listUsers } from '../../api/users'

interface Props {
  value: number | null
  onChange: (id: number | null) => void
}

export default function AssigneeSelect({ value, onChange }: Props) {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    listUsers().then((r) => setUsers(r.data))
  }, [])

  return (
    <select
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
      className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-card text-text-primary"
    >
      <option value="">Sem responsável</option>
      {users.map((u) => (
        <option key={u.id} value={u.id}>{u.username}</option>
      ))}
    </select>
  )
}

import { useState } from 'react'
import { useBoardStore } from '../../store/boardStore'
import toast from 'react-hot-toast'

interface Props {
  boardId: number
}

export default function AddColumnForm({ boardId }: Props) {
  const [show, setShow] = useState(false)
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const { addColumn } = useBoardStore()

  async function handleSubmit() {
    if (!name.trim()) return
    setLoading(true)
    try {
      await addColumn(boardId, name.trim())
      toast.success('Coluna criada')
      setName('')
      setShow(false)
    } finally {
      setLoading(false)
    }
  }

  if (!show) {
    return (
      <button
        onClick={() => setShow(true)}
        className="w-72 shrink-0 flex items-center gap-2 px-4 py-3 border-2 border-dashed border-border rounded-xl text-text-secondary hover:border-primary/40 hover:text-primary hover:bg-primary-light transition-all text-sm font-medium"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Nova coluna
      </button>
    )
  }

  return (
    <div className="w-72 shrink-0 bg-surface rounded-xl border border-border p-3">
      <input
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSubmit()
          if (e.key === 'Escape') setShow(false)
        }}
        placeholder="Nome da coluna"
        className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary mb-2"
      />
      <div className="flex gap-1.5">
        <button
          onClick={handleSubmit}
          disabled={loading || !name.trim()}
          className="px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50"
        >
          Criar coluna
        </button>
        <button
          onClick={() => setShow(false)}
          className="px-2 py-1.5 text-xs text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-card transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}

import { useState, useRef, useEffect } from 'react'
import { useBoardStore } from '../../store/boardStore'
import toast from 'react-hot-toast'

interface Props {
  columnId: number
  onClose: () => void
}

export default function AddTaskInline({ columnId, onClose }: Props) {
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const { addTask } = useBoardStore()
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    ref.current?.focus()
  }, [])

  async function handleSubmit() {
    if (!title.trim()) { onClose(); return }
    setLoading(true)
    try {
      await addTask(columnId, title.trim())
      toast.success('Tarefa criada')
      onClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-card rounded-lg border border-primary/40 shadow-card p-2.5">
      <textarea
        ref={ref}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit() }
          if (e.key === 'Escape') onClose()
        }}
        placeholder="Título da tarefa..."
        rows={2}
        className="w-full text-sm text-text-primary placeholder-text-secondary resize-none border-none outline-none bg-transparent"
      />
      <div className="flex gap-1.5 mt-2">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50"
        >
          Adicionar
        </button>
        <button
          onClick={onClose}
          className="px-2 py-1 text-xs text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-surface"
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}

import { useState, KeyboardEvent } from 'react'
import { useTaskStore } from '../../store/taskStore'
import SubtaskProgressBar from './SubtaskProgressBar'
import toast from 'react-hot-toast'

export default function SubtaskChecklist() {
  const { activeTask, addSubtask, toggleSubtask, removeSubtask } = useTaskStore()
  const [newTitle, setNewTitle] = useState('')
  const [loading, setLoading] = useState(false)

  if (!activeTask) return null

  const { subtasks } = activeTask
  const completed = subtasks.filter((s) => s.is_completed).length
  const total = subtasks.length

  async function handleAdd() {
    if (!newTitle.trim()) return
    setLoading(true)
    try {
      await addSubtask(newTitle.trim())
      setNewTitle('')
      toast.success('Subtarefa criada')
    } finally {
      setLoading(false)
    }
  }

  async function handleToggle(id: number, checked: boolean) {
    await toggleSubtask(id, checked)
  }

  async function handleRemove(id: number) {
    await removeSubtask(id)
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleAdd()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
          Checklist {total > 0 && `(${completed}/${total})`}
        </h3>
      </div>

      {total > 0 && <SubtaskProgressBar completed={completed} total={total} />}

      <div className="space-y-1.5 mt-3">
        {subtasks.map((sub) => (
          <div key={sub.id} className="flex items-center gap-2.5 group">
            <input
              type="checkbox"
              checked={sub.is_completed}
              onChange={(e) => handleToggle(sub.id, e.target.checked)}
              className="w-4 h-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
            />
            <span className={`flex-1 text-sm ${sub.is_completed ? 'line-through text-text-secondary' : 'text-text-primary'}`}>
              {sub.title}
            </span>
            <button
              onClick={() => handleRemove(sub.id)}
              className="opacity-0 group-hover:opacity-100 p-0.5 text-text-secondary hover:text-red-500 transition-all rounded"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-3">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Nova subtarefa..."
          className="flex-1 px-3 py-1.5 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary placeholder-text-secondary"
        />
        <button
          onClick={handleAdd}
          disabled={loading || !newTitle.trim()}
          className="px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50"
        >
          Adicionar
        </button>
      </div>
    </div>
  )
}

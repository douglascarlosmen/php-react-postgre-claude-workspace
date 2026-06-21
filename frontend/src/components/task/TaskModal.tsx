import { useEffect } from 'react'
import { useTaskStore } from '../../store/taskStore'
import { useBoardStore } from '../../store/boardStore'
import TaskDescription from './TaskDescription'
import SubtaskChecklist from './SubtaskChecklist'
import AssigneeSelect from './AssigneeSelect'
import DueDatePicker from './DueDatePicker'
import PrioritySelect from './PrioritySelect'
import toast from 'react-hot-toast'
import type { Priority } from '../../types'

interface Props {
  taskId: number
  onClose: () => void
}

export default function TaskModal({ taskId, onClose }: Props) {
  const { activeTask, loading, loadTask, updateActive, removeSubtask } = useTaskStore()
  const { columns, removeTask, updateTaskInList } = useBoardStore()

  useEffect(() => {
    loadTask(taskId)
  }, [taskId])

  async function handleColumnChange(columnId: number) {
    if (!activeTask) return
    await updateActive({ column_id: columnId } as any)
    updateTaskInList({ ...activeTask, column_id: columnId })
    toast.success('Status atualizado')
  }

  async function handlePriorityChange(priority: Priority | null) {
    await updateActive({ priority: priority as any })
    if (activeTask) updateTaskInList({ ...activeTask, priority })
    toast.success('Prioridade atualizada')
  }

  async function handleAssigneeChange(assigneeId: number | null) {
    await updateActive({ assignee_id: assigneeId } as any)
    toast.success('Responsável atualizado')
  }

  async function handleDueDateChange(date: string | null) {
    await updateActive({ due_date: date } as any)
    if (activeTask) updateTaskInList({ ...activeTask, due_date: date })
    toast.success('Data atualizada')
  }

  async function handleTitleBlur(title: string) {
    if (!activeTask || title === activeTask.title) return
    await updateActive({ title })
    if (activeTask) updateTaskInList({ ...activeTask, title })
  }

  async function handleDeleteTask() {
    if (!activeTask) return
    if (!confirm('Excluir esta tarefa?')) return
    removeTask(activeTask.column_id, activeTask.id)
    toast.success('Tarefa excluída')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />

      <div className="relative bg-card rounded-2xl shadow-modal w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-slide-up">
        {loading || !activeTask ? (
          <div className="p-8 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-5 bg-gray-100 rounded-lg animate-pulse" style={{ width: `${70 - i * 15}%` }} />
            ))}
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between p-6 pb-4 border-b border-border">
              <div className="flex-1 mr-4">
                <input
                  defaultValue={activeTask.title}
                  onBlur={(e) => handleTitleBlur(e.target.value)}
                  className="text-lg font-bold text-text-primary w-full border-none outline-none bg-transparent focus:ring-0 placeholder-text-secondary"
                  placeholder="Título da tarefa"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDeleteTask}
                  className="p-2 text-text-secondary hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Excluir tarefa"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                <button
                  onClick={onClose}
                  className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="overflow-y-auto scrollbar-thin flex-1">
              <div className="p-6 grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                  <div>
                    <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Descrição</h3>
                    <TaskDescription
                      content={activeTask.description ?? ''}
                      onChange={(html) => updateActive({ description: html } as any)}
                    />
                  </div>

                  <SubtaskChecklist />
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider block mb-2">Status</label>
                    <select
                      value={activeTask.column_id}
                      onChange={(e) => handleColumnChange(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-card text-text-primary"
                    >
                      {columns.map((col) => (
                        <option key={col.id} value={col.id}>{col.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider block mb-2">Prioridade</label>
                    <PrioritySelect value={activeTask.priority} onChange={handlePriorityChange} />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider block mb-2">Responsável</label>
                    <AssigneeSelect value={activeTask.assignee_id} onChange={handleAssigneeChange} />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider block mb-2">Data limite</label>
                    <DueDatePicker value={activeTask.due_date} onChange={handleDueDateChange} />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

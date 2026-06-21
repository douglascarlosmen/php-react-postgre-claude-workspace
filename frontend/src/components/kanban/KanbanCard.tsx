import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Task } from '../../types'
import { formatDate, isOverdue, priorityColors, priorityLabels } from '../../lib/utils'

interface Props {
  task: Task
  onCardClick: (taskId: number) => void
  isDragging?: boolean
}

export default function KanbanCard({ task, onCardClick, isDragging = false }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging: isSortableDragging } = useSortable({
    id: task.id,
    data: { type: 'task', task },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0 : 1,
  }

  if (isDragging) {
    return (
      <div className="bg-card rounded-lg border border-primary/30 shadow-modal p-3 cursor-grabbing rotate-2">
        <p className="text-sm font-medium text-text-primary truncate">{task.title}</p>
      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onCardClick(task.id)}
      className="bg-card rounded-lg border border-border shadow-card p-3 cursor-pointer hover:border-primary/30 hover:shadow-md transition-all group"
    >
      <p className="text-sm font-medium text-text-primary mb-2 leading-snug">{task.title}</p>

      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5">
          {task.priority && (
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${priorityColors[task.priority]}`}>
              {priorityLabels[task.priority]}
            </span>
          )}
          {task.due_date && (
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${isOverdue(task.due_date) ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-text-secondary'}`}>
              {formatDate(task.due_date)}
            </span>
          )}
        </div>
        {task.assignee_name && (
          <div className="w-6 h-6 bg-primary-light rounded-full flex items-center justify-center shrink-0" title={task.assignee_name}>
            <span className="text-xs font-bold text-primary">{task.assignee_name[0].toUpperCase()}</span>
          </div>
        )}
      </div>
    </div>
  )
}

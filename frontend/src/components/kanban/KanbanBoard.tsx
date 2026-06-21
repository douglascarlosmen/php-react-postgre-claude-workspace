import { useState, useRef } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  rectIntersection,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core'
import { SortableContext, horizontalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { useParams } from 'react-router-dom'
import { useBoardStore } from '../../store/boardStore'
import { reorderColumns } from '../../api/columns'
import KanbanColumn from './KanbanColumn'
import KanbanCard from './KanbanCard'
import AddColumnForm from './AddColumnForm'
import type { Task, Project } from '../../types'

interface Props {
  boardName: string
  project: Project | null
  projectId: number | null
  onCardClick: (taskId: number) => void
  onBack: () => void
}

export default function KanbanBoard({ boardName, project, onCardClick, onBack }: Props) {
  const { boardId } = useParams<{ boardId: string }>()
  const { columns, setColumns, moveTask } = useBoardStore()
  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const dragTypeRef = useRef<'task' | 'column' | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  )

  function onDragStart(e: DragStartEvent) {
    const data = e.active.data.current
    if (data?.type === 'task') {
      dragTypeRef.current = 'task'
      setActiveTask(data.task)
    } else {
      dragTypeRef.current = 'column'
    }
  }

  function onDragEnd(e: DragEndEvent) {
    const type = dragTypeRef.current
    dragTypeRef.current = null
    setActiveTask(null)

    const { active, over } = e
    if (!over || active.id === over.id) return

    if (type === 'column') {
      const activeData = active.data.current
      const overData = over.data.current
      if (overData?.type !== 'column') return
      const activeColId = activeData?.column.id as number
      const overColId = overData.column.id as number
      const oldIndex = columns.findIndex((c) => c.id === activeColId)
      const newIndex = columns.findIndex((c) => c.id === overColId)
      if (oldIndex === -1 || newIndex === -1) return
      const reordered = arrayMove(columns, oldIndex, newIndex)
      setColumns(reordered)
      if (boardId) reorderColumns(Number(boardId), reordered.map((c) => c.id))
      return
    }

    if (type === 'task') {
      const activeData = active.data.current
      const overData = over.data.current
      const taskId = activeData?.task.id as number
      const fromColumnId = activeData?.task.column_id as number

      let toColumnId: number
      let newOrder: number

      if (overData?.type === 'column') {
        toColumnId = overData.column.id as number
        const targetCol = columns.find((c) => c.id === toColumnId)
        const maxOrder = targetCol?.tasks.reduce((m, t) => Math.max(m, t.position_order), 0) ?? 0
        newOrder = maxOrder + 1000
      } else if (overData?.type === 'task') {
        toColumnId = overData.task.column_id as number
        newOrder = overData.task.position_order as number
      } else {
        return
      }

      moveTask(taskId, fromColumnId, toColumnId, newOrder)
    }
  }

  const columnIds = columns.map((c) => `col-${c.id}`)

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-3 border-b border-border bg-card shrink-0">
        {/* Breadcrumb navigation */}
        <div className="flex items-center gap-2 text-sm mb-1">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-text-secondary hover:text-primary transition-colors font-medium"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {project ? project.name : 'Projetos'}
          </button>
          <svg className="w-3.5 h-3.5 text-border" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-text-primary font-semibold truncate">{boardName}</span>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto p-6">
        <DndContext
          sensors={sensors}
          collisionDetection={rectIntersection}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        >
          <SortableContext items={columnIds} strategy={horizontalListSortingStrategy}>
            <div className="flex gap-4 h-full items-start">
              {columns.map((col) => (
                <KanbanColumn key={col.id} column={col} onCardClick={onCardClick} />
              ))}
              <AddColumnForm boardId={Number(boardId)} />
            </div>
          </SortableContext>

          <DragOverlay dropAnimation={{ duration: 150, easing: 'ease' }}>
            {activeTask && (
              <KanbanCard task={activeTask} onCardClick={() => {}} isDragging />
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  )
}

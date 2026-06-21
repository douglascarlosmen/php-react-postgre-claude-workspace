import { useState } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from '@dnd-kit/core'
import { SortableContext, horizontalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { useParams } from 'react-router-dom'
import { useBoardStore } from '../../store/boardStore'
import { reorderColumns } from '../../api/columns'
import KanbanColumn from './KanbanColumn'
import KanbanCard from './KanbanCard'
import AddColumnForm from './AddColumnForm'
import type { Task } from '../../types'

interface Props {
  boardName: string
  onCardClick: (taskId: number) => void
}

export default function KanbanBoard({ boardName, onCardClick }: Props) {
  const { boardId } = useParams<{ boardId: string }>()
  const { columns, setColumns, moveTask } = useBoardStore()
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  function onDragStart(e: DragStartEvent) {
    const data = e.active.data.current
    if (data?.type === 'task') setActiveTask(data.task)
  }

  function onDragEnd(e: DragEndEvent) {
    setActiveTask(null)
    const { active, over } = e
    if (!over || active.id === over.id) return

    const activeData = active.data.current
    if (activeData?.type !== 'task') {
      const oldIndex = columns.findIndex((c) => c.id === active.id)
      const newIndex = columns.findIndex((c) => c.id === over.id)
      if (oldIndex === -1 || newIndex === -1) return
      const reordered = arrayMove(columns, oldIndex, newIndex)
      setColumns(reordered)
      if (boardId) reorderColumns(Number(boardId), reordered.map((c) => c.id))
      return
    }

    const taskId = activeData.task.id as number
    const fromColumnId = activeData.task.column_id as number
    const overData = over.data.current

    let toColumnId: number
    let newOrder: number

    if (overData?.type === 'column') {
      toColumnId = over.id as number
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

  function onDragOver(e: DragOverEvent) {
    const { active, over } = e
    if (!over) return
    const activeData = active.data.current
    const overData = over.data.current
    if (activeData?.type !== 'task') return

    const fromColId = activeData.task.column_id as number
    const toColId = overData?.type === 'task' ? overData.task.column_id : over.id

    if (fromColId !== toColId) {
      const taskId = activeData.task.id as number
      const task = columns.find((c) => c.id === fromColId)?.tasks.find((t) => t.id === taskId)
      if (!task) return

      useBoardStore.setState((s) => ({
        columns: s.columns.map((c) => {
          if (c.id === fromColId) return { ...c, tasks: c.tasks.filter((t) => t.id !== taskId) }
          if (c.id === toColId) return { ...c, tasks: [...c.tasks, { ...task, column_id: Number(toColId) }] }
          return c
        }),
      }))
    }
  }

  const columnIds = columns.map((c) => c.id)

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 border-b border-border bg-card shrink-0">
        <h2 className="font-bold text-text-primary text-lg">{boardName}</h2>
      </div>
      <div className="flex-1 overflow-x-auto p-6">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
        >
          <SortableContext items={columnIds} strategy={horizontalListSortingStrategy}>
            <div className="flex gap-4 h-full items-start">
              {columns.map((col) => (
                <KanbanColumn key={col.id} column={col} onCardClick={onCardClick} />
              ))}
              <AddColumnForm boardId={Number(boardId)} />
            </div>
          </SortableContext>

          <DragOverlay>
            {activeTask && (
              <KanbanCard task={activeTask} onCardClick={() => {}} isDragging />
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  )
}
